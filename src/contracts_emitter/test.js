const c = isObject({
  message: isString,
  error_response: isString,
  euid: isString,
  username: isString,
  last_receiver_id: isNull,
  dvr_management: isString,
  enterprise: isNull,
  receivers: isArray(isString),
  hopper_gos: isArray(isString).optional,
  zip_code: isString,
  zeus: isNull,
  status_code: isString,
  draEligible: isBoolean,
  network_count_returned_from_dish_service: isNumber,
  // (valueName, value) =>
  userInfo: isObject({
    bbRssFeedId: isString,
    emailAddress: isString,
    newConnectEligible: isBoolean,
    partnerList: isArray(isString),
    prePaid: isBoolean,
    receivers: isArray((valueName, value) =>
      isObject({
        collapsibleEPG: isBoolean,
        hdCapable: isBoolean,
        model: isString,
        receiverId: isString,
        smartcard: isString,
      })(valueName, value),
    ),
    timezoneOffset: isString,
    userName: isString,
  }),
  auth_stations: isArray(isString),
  physical_zip: isString,
  can_purchase: isBoolean,
  has_purchased: isBoolean,
  new_connect_pending: isBoolean,
  new_connect_eligible: isBoolean,
  profiles_enabled: isBoolean,
  error: isString,
})('');
