exports.getOrders = catchAsync(async (req, res, next) => {
  const { type, symbol, limit } = req.query;
  const { rows } = await db.query(
    `select coin_amount, price_per_unit from fn_get_partial_order_book('${symbol}', '${type}', ${limit});`
  );

  successResponse(req, res, {
    orders: rows,
  });
});

exports.getLatestOrders = catchAsync(async (req, res, next) => {
  const { symbol } = req.query;
  const { rows } = await db.query(`select * from fn_get_latest_order_matching('${symbol}');`);

  successResponse(req, res, {
    ...rows[0],
  });
});

exports.createOrder = catchAsync(async (req, res, next) => {
  const { price, amount, symbol, type } = req.body;
  const { user } = res.locals;
  await db.query(`call create_order('${user.user_id}', '${symbol}', '${type}', ${price}, ${amount});`);

  successResponse(
    req,
    res,
    {
      message: "Tạo lệnh thành công",
    },
    201
  );
});

exports.getEnabledOrders = catchAsync(async (req, res, next) => {
  const { symbol } = req.query;
  const { user } = res.locals;
  const { rows } = await db.query(`select * from fn_filter_order_by_user('${user.user_id}', '${symbol}', 'enabled');`);

  successResponse(req, res, {
    orders: rows,
  });
});

exports.getHistoryOrders = catchAsync(async (req, res, next) => {
  const { symbol } = req.query;
  const { user } = res.locals;
  const { rows } = await db.query(`select * from fn_filter_order_by_user('${user.user_id}', '${symbol}', 'all');`);

  successResponse(req, res, {
    orders: rows,
  });
});

exports.getHistoryMatchingOrders = catchAsync(async (req, res, next) => {
  const { symbol } = req.query;
  const { rows } = await db.query(`select * from fn_filter_matching_orders('${symbol}');`);

  successResponse(req, res, {
    orders: rows,
  });
});

exports.cancelOrder = catchAsync(async (req, res, next) => {
  const { orderId } = req.body;
  await db.query(`call proc_cancel_order('${orderId}');`);

  successResponse(req, res, {
    message: "Hủy lệnh thành công",
  });
});
