const Photo = require("../models/Photo");
const User = require("../models/User");
const mongoose = require("mongoose");

//Insert a photo with a user related with it
const insertPhoto = async (req, res) => {
  const { title } = req.body;
  const image = req.file.filename;

  const reqUser = req.user;

  const user = await User.findById(reqUser._id);

  //Create Photo
  const newPhoto = await Photo.create({
    image,
    title,
    userId: user._id,
    userName: user.name,
  });

  //if photo was sucessfully created, return data

  if (!newPhoto) {
    res.status(422).json({
      errors: ["Ouve um problema, por favor, tente novamente mais tarde"],
    });
    return;
  }

  res.status(201).json(newPhoto);
};

//Delete photo from DB
const deletePhoto = async (req, res) => {
  const { id } = req.params;

  const reqUser = req.user;

  const photo = await Photo.findById(mongoose.Types.ObjectId(id));

  if (!photo) {
    res.status(404).json({ errors: ["Photo não encontrada"] });
    return;
  }

  //check if photo belongs to user

  if (!photo.userId.equals(reqUser._id)) {
    res.status(422).json({ errors: ["você não é o dono desse post!"] });
  }

  await Photo.findByIdAndDelete(photo._id);

  res
    .status(200)
    .json({ id: photo._id, message: "Foto excluída com sucesso!" });
  return;
};

//Get all photos
const getAllPhotos = async (req, res) => {
  const photos = await Photo.find({})
    .sort([["createdAt", -1]])
    .exec();

  return res.status(200).json(photos);
};

//Get user photos
const getUserPhotos = async (req, res) => {
  const { id } = req.params;

  const photos = await Photo.find({ userId: id })
    .sort([["createdAt", -1]])
    .exec();

  return res.status(200).json(photos);
};

//Get photo by id
const getPhotoById = async (req, res) => {
  const { id } = req.params;

  const photo = await Photo.findById(mongoose.Types.ObjectId(id));

  if (!photo) {
    return res.status(404).json({ errors: ["Photo não encontrada"] });
  }

  res.status(200).json(photo);
};

//Update Photo
const updatePhoto = async (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  reqUser = req.user;

  const photo = await Photo.findById(id);

  if (!photo) {
    res.status(404).json({ errors: ["Foto não encontrada!"] });
    return;
  }

  //check if photo belongs to user
  if (!photo.userId.equals(reqUser._id)) {
    res.status(422).json({ errors: ["Essa foto não é sua!"] });
  }

  if (title) {
    photo.title = title;
  }
  await photo.save();

  res.status(200).json({ photo, message: "Foto atualizada com sucesso!" });
};

//Like functionality
const likePhoto = async (req, res) => {
  const { id } = req.params;

  const reqUser = req.user;

  const photo = await Photo.findById(id);

  if (!photo) {
    res.status(404).json({ errors: ["Foto não encontrada!"] });
    return;
  }

  //Check if user already liked the photo
  if (photo.likes.includes(reqUser._id)) {
    res.status(422).json({ errors: ["Você já curtiu a foto"] });
    return;
  }

  //put user id in likes array
  photo.likes.push(reqUser._id);

  await photo.save();

  res.status(200).json({
    photoId: id,
    userId: reqUser._id,
    message: "Você curtiu esta foto!",
  });
};

//Comment functionality
const commentPhoto = async (req, res) => {
  const { id } = req.params;
  const { comment } = req.body;

  const reqUser = req.user;

  const user = await User.findById(reqUser._id);

  const photo = await Photo.findById(id);

  //Check if photo exists
  if (!photo) {
    res.status(404).json({ errors: ["Foto não encontrada!"] });
    return;
  }

  //check if comment is null
  if (!comment) {
    res
      .status(422)
      .json({ errors: ["Por favor, comente algo antes de enviar."] });
    return;
  }

  //put comment in comments Array
  const userComment = {
    comment,
    userName: user.name,
    userImage: user.profileImage,
    userId: user._id,
  };

  photo.comments.push(userComment);

  await photo.save();

  res
    .status(200)
    .json({ comment: userComment, message: "Comentário postado com sucesso!" });
};

//Search photos by title
const searchPhotos = async (req, res) => {
  const { q } = req.query;

  const photos = await Photo.find({ title: new RegExp(q, "i") }).exec();

  return res.status(200).json(photos);
};

module.exports = {
  insertPhoto,
  deletePhoto,
  getAllPhotos,
  getUserPhotos,
  getPhotoById,
  updatePhoto,
  likePhoto,
  commentPhoto,
  searchPhotos,
};
