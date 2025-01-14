import { AccountModel } from "../models/account.model.js";
import { UserModel } from "../models/users.model.js";
import { CardModel } from "../models/cards.model.js";

export const formatUserService = async (data) => {
  // console.log(data);
  const {
    phoneNumber,
    fullName,
    _id,
    _v,
    account,
    createdAt,
    avatar,
    address,
    cards,
    ...others
  } = data;

  return {
    id: _id,
    profile: {
      phone: account?.phoneNumber
        ? {
            countryCode: account?.phoneNumber.countryCode || "",
            numberCode: account?.phoneNumber.numberCode || "",
          }
        : null,
      fullName: account?.fullName ? account?.fullName : null,
      email: account?.email ? account.email : null,
      avatar: avatar ? avatar : null,
    },
    cards: Array.isArray(cards)
      ? cards.map((items) => ({
          cardName: items.cardName || null,
          cardNumber: items.cardNumber || null,
          expiryDate: items.expiryDate || null,
          cvv: items.cvv || null,
        }))
      : [],
    address: address ? address : null,
    isAdmin: account?.isAdmin ? account?.isAdmin : false,
    isBlocked: account?.isBlocked ? account?.isBlocked : null,
    createdDate: createdAt ? createdAt : null,
  };
};

export const findUserByService = async (data) => {
  try {
    let user = await UserModel.findOne(data).populate(["account", "cards"]);

    if (!user) return errorMessage(400, "User account not Found")(res);
    if (user) return formatUserService(user);
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const deleteUserService = async (userID) => {
  try {
    let user = await UserModel.findByIdAndDelete(userID);
    return user;
  } catch (error) {
    return false;
  }
};

export const blockUserService = async (userID) => {
  try {
    let user = await UserModel.findById(userID);
    let userUpdated = await AccountModel.findByIdAndUpdate(
      user.account,
      {
        $set: { isBlocked: !user.isBlocked },
      },
      { new: true }
    );
    return userUpdated;
  } catch (error) {
    return false;
  }
};

export const getAllUsersService = async (req, res) => {
  try {
    let users = await UserModel.find({})
      .populate([
        {
          path: "account",
          populate: { path: "account", model: "Accounts" },
        },
      ])
      .populate([
        {
          path: "cards",
          populate: { path: "cards", model: "Cards" },
        },
      ]);

    return users;
  } catch (error) {
    return false;
  }
};

export const getUserByService = async (query) => {
  try {
    let user = await UserModel.findOne(query).populate(["account", "cards"]);
    return user;
  } catch (error) {
    return false;
  }
};

export const getUserService = async (data) => {
  try {
    let user = await AccountModel.findOne(data).populate(["profile"]);
    return user;
  } catch (error) {
    return false;
  }
};

export const addLocationToProfileService = async (data, accountID) => {
  const payload = { address: data, account: accountID };
  try {
    let profile = new UserModel(payload);
    await profile.save();
    let updatedAccount = await AccountModel.findByIdAndUpdate(
      accountID,
      {
        $set: { profile: profile._id },
      },
      { new: true }
    ).populate([{ path: "profile", model: "Users" }]);

    return updatedAccount;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const editProfileService = async (userID, data, req) => {
  try {
    await AccountModel.findByIdAndUpdate(
      req.userData,
      { $set: { address: data.address } },
      { new: true }
    );

    let userAccount = await UserModel.findByIdAndUpdate(
      userID,
      { $set: { fullName: data.fullName } },
      { new: true }
    ).populate(["account", "cards"]);

    return formatUserService(userAccount);
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const addCardToProfileService = async (data, userID) => {
  try {
    let card = new CardModel();
    card.cvv = data.cvv;
    card.cardNumber = data.cardNumber;
    card.cardName = data.cardName;
    card.expiryDate = data.expiryDate;
    card.user = userID;
    await card.save();
    let updatedUser = await UserModel.findByIdAndUpdate(
      userID,
      {
        $push: { cards: card._id },
      },
      { new: true }
    );

    let formatedUpdatedUser = await formatUserService(updatedUser);
    return formatedUpdatedUser;
  } catch (error) {
    console.log(error);
    return false;
  }
};
