const jsonString =
  "{\r\n" +
  ' "error_code": 0,\r\n' +
  ' "data": {\r\n' +
  ' "uid": "1",\r\n' +
  ' "username": "12154545",\r\n' +
  ' "name": "吴系挂",\r\n' +
  ' "groupid": 2 ,\r\n' +
  ' "reg_time": "1436864169",\r\n' +
  ' "last_login_time": "0",\r\n' +
  " }\r\n" +
  " }";

const jsonObject = JSON.parse(jsonString.replace(/,\s*([\]}])/g, "$1"));
console.log(jsonObject);
