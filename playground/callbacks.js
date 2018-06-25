var getUser = (id, callback) => {
  var user = {
    id,
    name: 'Bambi'
  };

  setTimeout(() => {
    callback(user);
  }, 3000);
};

getUser(13, (userObject) => {
  console.log(userObject);
});
