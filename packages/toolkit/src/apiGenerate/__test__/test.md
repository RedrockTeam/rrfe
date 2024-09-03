# 接口文档

## page: login

## 用户注册

简要描述：

        用户注册接口

### URL

/user/register

### 请求方式：

    POST

### 请求参数

```json
{
  "username": "12154545",
  "name": "吴系挂",
  "password": "1436864169"
}
```

### 请求参数说明

### 返回参数

          ``` json
            {
              "error_code": 0,
              "data": {
                "uid": "1",
                "username": "12154545",
                "name": "吴系挂",
                "groupid": 2 ,
                "reg_time": "1436864169",
                "last_login_time": "0",
              }
            }
          ```

## 用户退出

简要描述：

用户注册接口

### URL

/api/user/register

### 请求方式：

POST

### 请求参数

```json
{
  "username": "12154545",
  "name": "吴系挂",
  "password": "1436864169"
}
```

### 请求参数说明

### 返回参数

```json
{
  "error_code": 0,
  "data": {
    "uid": "1",
    "username": "12154545",
    "name": "吴系挂",
    "groupid": 2,
    "reg_time": "1436864169",
    "last_login_time": "0"
  }
}
```

## page:acount

## 用户注册

简要描述：

用户注册接口

### URL：

/api/user/register

### 请求方式：

POST

### 请求参数：

          ``` json
            {
              "username": "12154545",
              "name": "吴系挂",
              "password":"1436864169"
            }
          ```

### 请求参数说明

### 返回参数

```json
{
  "error_code": 0,
  "data": {
    "uid": "1",
    "username": "12154545",
    "name": "吴系挂",
    "groupid": 2,
    "reg_time": "1436864169",
    "last_login_time": "0"
  }
}
```

### 返回参数说
