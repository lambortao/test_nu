export const checkPhone = phone => /^1[3-9]\d{9}$/.test(phone)

export const checkEmail = email => /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/.test(email)
