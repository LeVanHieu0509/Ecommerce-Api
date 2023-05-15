exports.login = catchAsync(async (req, res, next) => {
  const { username, password } = req.body;
  const { rows } = await db.query(`select * from fn_get_user('${username}');`);
  if (rows.length === 0) {
    throw new Error("Tài khoản không tồn tại");
  }

  if (rows[0]["password"] !== password) {
    throw new Error("Mật khẩu không hợp lệ");
  }
  delete rows[0]["password"];
  const token = await jwt.generateToken({ user_id: rows[0]["user_id"], username: rows[0]["username"] });

  successResponse(req, res, {
    ...rows[0],
    token,
  });
});

exports.register = catchAsync(async (req, res, next) => {
  const { username, password, fullName, phoneNumber, address, identificationNumber, birthday } = req.body;
  await db.query(
    `call create_user('${username}', '${password}', '${fullName}', '${phoneNumber}', '${address}', '${identificationNumber}', '${birthday}');`
  );
  successResponse(req, res, { message: "Tạo tài khoản thành công" }, 201);
});
