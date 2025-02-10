import { AccountModel } from "../models/account.model.js";
import { UserModel } from "../models/users.model.js";
import { CardModel } from "../models/cards.model.js";
import { errorMessage } from "../utils/utils.js";

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
    orders,
    ...others
  } = data;

  // console.log(cards);

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
      id: account?._id ? account?._id : null,
    },
    cards: Array.isArray(cards)
      ? cards.map((items) => ({
          cardName: items?.cardName || null,
          cardNumber: items?.cardNumber || null,
          expiryDate: items?.expiryDate || null,
          cvv: items?.cvv || null,
          default: items.defaultCard || false,
        }))
      : [],
    orders: Array.isArray(orders)
      ? orders.map((items) => ({
          sender: items?.sender
            ? {
                phone: items?.sender?.phone,
                name: items?.sender?.name,
                address: items?.sender?.address,
                home: items?.sender?.home,
              }
            : {},
          reciever: items?.reciever
            ? {
                name: items?.reciever?.name,
                phone: items?.reciever.phone,
                address: items?.reciever.address,
                zipCode: items?.reciever?.zipCode,
                country: items?.reciever.country,
                pickCenter: items.reciever.pickCenter,
                paymentMethod: items.reciever.paymentMethod,
              }
            : {},
          package: items._package
            ? {
                trackingID: items._package.trackingID,
                orderType: items._package.orderType,
                name: items?._package?.name,
                weight: items?._package?.weight,
                box: items?._package.box,
                packageType: items._package.packageType,
                condition: items._package.condition,
              }
            : {},
          quote: {},
          paymentStatus: items.paymentStatus || null,
          deliveryStatus: items.deliveryStatus || null,
        }))
      : [],
    address: address ? address : null,
    isAdmin: account?.isAdmin ? account?.isAdmin : false,
    isBlocked: account?.isBlocked ? account?.isBlocked : null,
    createdDate: createdAt ? createdAt : null,
  };
};

export const findUserByService = async (data, res) => {
  try {
    let user = await UserModel.findOne(data).populate([
      "account",
      "cards",
      "orders",
    ]);

    if (!user) return errorMessage(400, "User account not Found")(res);
    if (user) return formatUserService(user);
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const findAdminByService = async (data, res) => {
  try {
    let user = await AccountModel.findOne(data);
    if (!user) return errorMessage(400, "User account not Found")(res);
    if (user) return user;
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
  // console.log(req.user);
  try {
    await AccountModel.findByIdAndUpdate(
      req.user,
      { $set: { fullName: data.fullName } },
      { new: true }
    );

    let userAccount = await UserModel.findByIdAndUpdate(
      userID,
      { $set: { address: data.address, avatar: data.avatar } },
      { new: true }
    ).populate(["account", "cards"]);

    return formatUserService(userAccount);
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const addCardToProfileService = async (data, userID) => {
  // console.log(data);
  try {
    let card = new CardModel(data);
    card.user = userID;
    await card.save();
    let updatedUser = await UserModel.findByIdAndUpdate(
      userID,
      {
        $push: { cards: card._id },
      },
      { new: true }
    ).populate(["account", "cards"]);

    let formatedUpdatedUser = await formatUserService(updatedUser);
    return formatedUpdatedUser;
  } catch (error) {
    console.log(error);
    return false;
  }
};
