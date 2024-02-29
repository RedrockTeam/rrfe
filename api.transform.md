---
title: llm_corpus_QA
language_tabs:
  - shell: Shell
  - http: HTTP
  - javascript: JavaScript
  - ruby: Ruby
  - python: Python
  - php: PHP
  - java: Java
  - go: Go
toc_footers: []
includes: []
search: true
code_clipboard: true
highlight_theme: darkula
headingLevel: 2
generator: "@tarslib/widdershins v4.0.22"


---

# llm_corpus_QA

Base URLs:

* <a href="http://dev-cn.your-api-server.com">开发环境: http://dev-cn.your-api-server.com</a>

# Authentication

- HTTP Authentication, scheme: bearer

# 用户相关
## page: user
## POST 登录
### URL：

/user/login

### 请求方式：

POST

###
### 请求参数

```json
{
  "username": "admin",
  "password": "123456"
}
```

### 请求参数

| 名称       | 位置 | 类型   | 必选 | 说明 |
| ---------- | ---- | ------ | ---- | ---- |
| body       | body | object | 否   | none |
| » username | body | string | 是   | none |
| » password | body | string | 是   | none |

### 返回参数：

> 成功

```json
{
  "data": {
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJleHAiOjE3MDc5Nzc4MjR9.bJLvOhRl2KI68c8ENDS8M6r4v-pKGSStYBTRVLDWJ_w",
    "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJleHAiOjE3MDg1ODE3MjR9.Cr9iINQ8Sb0VwlfLSAEo0_I-XYnA800pjFJFPDv8V8c",
    "user_id": "1"
  },
  "info": "success",
  "status": 0
}
```

```json
{
  "data": {},
  "info": "wrong password",
  "status": 40004
}
```

```json
{
  "data": {},
  "info": "user not found",
  "status": 40001
}
```

```json
{
  "data": {},
  "info": "param error",
  "status": 20001
}
```

### 返回结果

| 状态码 | 状态码含义                                              | 说明 | 数据模型 |
| ------ | ------------------------------------------------------- | ---- | -------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | 成功 | Inline   |

### 返回数据结构

状态码 **200**

| 名称     | 类型    | 必选 | 约束 | 中文名 | 说明 |
| -------- | ------- | ---- | ---- | ------ | ---- |
| » data   | object  | true | none |        | none |
| » info   | string  | true | none |        | none |
| » status | integer | true | none |        | none |

## POST 注册
### URL：

/user/register

### 请求方式：

POST

###
###  请求参数

```json
{
  "username": "root",
  "password": "123456"
}
```

### 请求参数

| 名称       | 位置 | 类型   | 必选 | 说明 |
| ---------- | ---- | ------ | ---- | ---- |
| body       | body | object | 否   | none |
| » username | body | string | 是   | none |
| » password | body | string | 是   | none |

### 返回参数：

> 成功

```json
{
  "data": {},
  "info": "success",
  "status": 0
}
```

```json
{
  "data": {},
  "info": "user repeated",
  "status": 40003
}
```

### 返回结果

| 状态码 | 状态码含义                                              | 说明 | 数据模型 |
| ------ | ------------------------------------------------------- | ---- | -------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | 成功 | Inline   |

### 返回数据结构

状态码 **200**

| 名称     | 类型    | 必选 | 约束 | 中文名 | 说明 |
| -------- | ------- | ---- | ---- | ------ | ---- |
| » data   | object  | true | none |        | none |
| » info   | string  | true | none |        | none |
| » status | integer | true | none |        | none |

## POST 刷新
### URL：

/user/refresh

### 请求方式：

POST

###
###  请求参数

```json
{
  "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJleHAiOjE3MDgwMDM4MTV9.iTCI0Hh1EOHqJCEn40CYHVqI5PNkJCIbqGoXb1hVuAs"
}
```

### 请求参数

| 名称            | 位置 | 类型   | 必选 | 说明 |
| --------------- | ---- | ------ | ---- | ---- |
| body            | body | object | 否   | none |
| » refresh_token | body | string | 是   | none |

### 返回参数：

> 成功

```json
{
  "data": {
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJleHAiOjE3MDc5Nzc4Mzh9.LLJnPnXRZf0eAcOBTBx6lumupNOCwYZyspafcqPwlHs",
    "user_id": 1
  },
  "info": "success",
  "status": 0
}
```

### 返回结果

| 状态码 | 状态码含义                                              | 说明 | 数据模型 |
| ------ | ------------------------------------------------------- | ---- | -------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | 成功 | Inline   |

### 返回数据结构

状态码 **200**

| 名称            | 类型    | 必选 | 约束 | 中文名 | 说明 |
| --------------- | ------- | ---- | ---- | ------ | ---- |
| » data          | object  | true | none |        | none |
| »» access_token | string  | true | none |        | none |
| »» user_id      | integer | true | none |        | none |
| » info          | string  | true | none |        | none |
| » status        | integer | true | none |        | none |

# 会话相关
## page: session
## GET 获取用户会话列表
### URL：

/session

### 请求方式：

GET

###
token带有用户id信息，所以不用填写user_id，可以用token解析出id获取所有会话。

###  请求参数

```json
{}
```

### 请求参数

| 名称 | 位置 | 类型   | 必选 | 说明 |
| ---- | ---- | ------ | ---- | ---- |
| body | body | object | 否   | none |

### 返回参数：

> 成功

```json
{
  "data": [
    {
      "created_at": "2024-02-17T05:23:31.074865Z",
      "deleted_at": null,
      "id": 0,
      "metadata": {
        "category": "type"
      },
      "session_id": "12d5d8271a31471b96bd488ac99f407e",
      "updated_at": "2024-02-17T05:23:31.074865Z",
      "user_id": "RmiXuokxru3iUe4JsbZVAQ",
      "uuid": "1bff3ef4-2948-4e1a-8e24-62284dda163e"
    },
    {
      "created_at": "2024-02-17T05:28:02.694913Z",
      "deleted_at": null,
      "id": 0,
      "metadata": {
        "category": "type"
      },
      "session_id": "4cf9ef8369de45d3984b692da887bab5",
      "updated_at": "2024-02-17T05:28:02.694913Z",
      "user_id": "RmiXuokxru3iUe4JsbZVAQ",
      "uuid": "3c5548ff-2a79-4c5e-ab14-6262f9aac62d"
    }
  ],
  "info": "success",
  "status": 0
}
```

```json
{
  "data": {},
  "info": "unauthorized error",
  "status": 20002
}
```

```json
{
  "data": {},
  "info": "token invalid",
  "status": 20002
}
```

```json
{
  "data": {},
  "info": "unauthorized error",
  "status": 20002
}
```

### 返回结果

| 状态码 | 状态码含义                                              | 说明 | 数据模型 |
| ------ | ------------------------------------------------------- | ---- | -------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | 成功 | Inline   |

### 返回数据结构

状态码 **200**

| 名称          | 类型     | 必选 | 约束 | 中文名 | 说明 |
| ------------- | -------- | ---- | ---- | ------ | ---- |
| » data        | [object] | true | none |        | none |
| »» created_at | string   | true | none |        | none |
| »» deleted_at | null     | true | none |        | none |
| »» id         | integer  | true | none |        | none |
| »» metadata   | object   | true | none |        | none |
| »»» category  | string   | true | none |        | none |
| »» session_id | string   | true | none |        | none |
| »» updated_at | string   | true | none |        | none |
| »» user_id    | string   | true | none |        | none |
| »» uuid       | string   | true | none |        | none |
| » info        | string   | true | none |        | none |
| » status      | integer  | true | none |        | none |

## POST 添加会话
### URL：

/session

### 请求方式：

POST

###
类别：

1. common——默认
2. attraction——景点
3. food——美食
4. human——人文历史
5. transport——交通
6. tour——乡村旅游
7. hot——网红/热门

###  请求参数

```json
{
  "category": "type"
}
```

### 请求参数

| 名称       | 位置 | 类型   | 必选 | 说明 |
| ---------- | ---- | ------ | ---- | ---- |
| body       | body | object | 否   | none |
| » category | body | string | 是   | none |

### 返回参数：

> 成功

```json
{
  "data": {},
  "info": "success",
  "status": 0
}
```

### 返回结果

| 状态码 | 状态码含义                                              | 说明 | 数据模型 |
| ------ | ------------------------------------------------------- | ---- | -------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | 成功 | Inline   |

### 返回数据结构

状态码 **200**

| 名称     | 类型    | 必选 | 约束 | 中文名 | 说明 |
| -------- | ------- | ---- | ---- | ------ | ---- |
| » data   | object  | true | none |        | none |
| » info   | string  | true | none |        | none |
| » status | integer | true | none |        | none |

## DELETE 删除会话
### URL：

/session

### 请求方式：

DELETE

###
###  请求参数

```json
{
  "session_id": "bd30aa33-1d67-4815-b25b-5a7b88ddf0d4"
}
```

### 请求参数

| 名称         | 位置 | 类型   | 必选 | 说明 |
| ------------ | ---- | ------ | ---- | ---- |
| body         | body | object | 否   | none |
| » session_id | body | string | 是   | none |

### 返回参数：

> 成功

```json
{
  "data": {},
  "info": "success",
  "status": 0
}
```

### 返回结果

| 状态码 | 状态码含义                                              | 说明 | 数据模型 |
| ------ | ------------------------------------------------------- | ---- | -------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | 成功 | Inline   |

### 返回数据结构

状态码 **200**

| 名称     | 类型    | 必选 | 约束 | 中文名 | 说明 |
| -------- | ------- | ---- | ---- | ------ | ---- |
| » data   | object  | true | none |        | none |
| » info   | string  | true | none |        | none |
| » status | integer | true | none |        | none |

# 聊天

## GET 获取聊天历史记录
### URL：

/history

### 请求方式：

GET

###
###  请求参数 

```json
{
  "session_id": "5d691c6d-fbd6-4237-a9e9-dab260d8410b"
}
```



| 名称         | 位置 | 类型   | 必选 | 说明 |
| ------------ | ---- | ------ | ---- | ---- |
| body         | body | object | 否   | none |
| » session_id | body | string | 是   | none |

### 返回参数：

> 成功

```json
{
  "data": [
    {
      "content": "The relevance of Parable of the Sower to contemporary society lies in its exploration of themes such as climate change, social inequality, and the dangers of religious fundamentalism. It also offers a thought-provoking commentary on the human condition and the potential for change and resilience in the face of adversity.",
      "created_at": "2024-02-07T15:00:13.784192Z",
      "metadata": {
        "system": {
          "entities": [
            {
              "Label": "ORG",
              "Matches": [
                {
                  "End": 37,
                  "Start": 17,
                  "Text": "Parable of the Sower"
                }
              ],
              "Name": "Parable of the Sower"
            }
          ],
          "intent": "The subject is discussing the relevance of the Parable of the Sower to contemporary society."
        }
      },
      "role": "ai",
      "token_count": 0,
      "uuid": "10fac969-9b1d-4f56-b697-5d7ce1f74fdf"
    },
    {
      "content": "Write a short synopsis of Butler's book, Parable of the Sower. What is it about?",
      "created_at": "2024-02-07T16:47:57.602976Z",
      "metadata": {
        "system": {
          "entities": [
            {
              "Label": "ORG",
              "Matches": [
                {
                  "End": 32,
                  "Start": 26,
                  "Text": "Butler"
                }
              ],
              "Name": "Butler"
            },
            {
              "Label": "WORK_OF_ART",
              "Matches": [
                {
                  "End": 61,
                  "Start": 41,
                  "Text": "Parable of the Sower"
                }
              ],
              "Name": "Parable of the Sower"
            }
          ],
          "intent": "The subject is asking for a brief summary or overview of the book \"Parable of the Sower\" by Butler."
        }
      },
      "role": "human",
      "token_count": 0,
      "uuid": "6cff8e9a-d9ff-4509-a03e-2ccf15ac3054"
    },
    {
      "content": "Write a short synopsis of Butler's book, Parable of the Sower. What is it about?",
      "created_at": "2024-02-07T17:13:24.782811Z",
      "metadata": {
        "system": {
          "entities": [
            {
              "Label": "ORG",
              "Matches": [
                {
                  "End": 32,
                  "Start": 26,
                  "Text": "Butler"
                }
              ],
              "Name": "Butler"
            },
            {
              "Label": "WORK_OF_ART",
              "Matches": [
                {
                  "End": 61,
                  "Start": 41,
                  "Text": "Parable of the Sower"
                }
              ],
              "Name": "Parable of the Sower"
            }
          ],
          "intent": "The subject is requesting a brief summary or description of the book \"Parable of the Sower\" by Butler."
        }
      },
      "role": "human",
      "token_count": 0,
      "uuid": "283e65d4-0787-42fa-8423-430fc2c73cb1"
    },
    {
      "content": "Write a short synopsis of Butler's book, Parable of the Sower. What is it about?",
      "created_at": "2024-02-07T17:13:51.131596Z",
      "metadata": {
        "system": {
          "entities": [
            {
              "Label": "ORG",
              "Matches": [
                {
                  "End": 32,
                  "Start": 26,
                  "Text": "Butler"
                }
              ],
              "Name": "Butler"
            },
            {
              "Label": "WORK_OF_ART",
              "Matches": [
                {
                  "End": 61,
                  "Start": 41,
                  "Text": "Parable of the Sower"
                }
              ],
              "Name": "Parable of the Sower"
            }
          ],
          "intent": "The subject is requesting a brief summary or overview of Butler's book, Parable of the Sower."
        }
      },
      "role": "human",
      "token_count": 0,
      "uuid": "bab6b457-8846-40d3-9523-fc2b888b369f"
    },
    {
      "content": "主成分分析是什么？",
      "created_at": "2024-02-14T15:21:15.580144Z",
      "metadata": {
        "system": {
          "entities": [
            {
              "Label": "ORG",
              "Matches": [
                {
                  "End": 9,
                  "Start": 8,
                  "Text": "？"
                }
              ],
              "Name": "？"
            }
          ]
        }
      },
      "role": "human",
      "token_count": 0,
      "uuid": "c8df91c3-8e9e-4e37-a1a9-734cfa6a1fb3"
    },
    {
      "content": "主成分分析（Principal Component Analysis，PCA）是一种统计方法，主要用于数据降维。通过正交变换，将一组可能存在相关性的变量转换为一组线性不相关的变量，这些线性不相关的变量被称为主成分。\n\n在实际课题中，为了全面分析问题，常常会提出很多与此有关的变量。因为每个变量都在不同程度上反映这个课题的某些信息，这会导致数据集的维度很高，分析难度加大。主成分分析旨在找到这组变量中的少数几个重要成分，这些成分能够尽可能多地保留原始数据中的信息。\n\n主成分分析首先由K.皮尔森（Karl Pearson）对非随机变量引入，尔后H.霍特林将此方法推广到随机向量的情形。信息的大小通常用离差平方和或方差来衡量。\n\n主成分分析可以视为一种降维技术，它通过减少变量的数量简化数据集，同时尽可能保留原始数据中的变异。这种方法在许多领域都有应用，如人口统计学、地理学、数学建模等。\n\n以上内容仅供参考，如需更多信息，建议查阅统计学相关书籍或咨询统计学专家。",
      "created_at": "2024-02-14T15:21:15.600248Z",
      "metadata": {
        "system": {
          "entities": []
        }
      },
      "role": "ai",
      "token_count": 0,
      "uuid": "ed5d6169-0c10-452c-aa68-e5fe8fe26a95"
    },
    {
      "content": "复述一下上一个的问题",
      "created_at": "2024-02-14T15:24:40.074957Z",
      "metadata": {
        "system": {
          "entities": []
        }
      },
      "role": "human",
      "token_count": 11,
      "uuid": "1c325e1f-b59e-4ef2-af70-4ee354e7bfd3"
    },
    {
      "content": "您上一个问题是：网站的基础架构指的是什么？",
      "created_at": "2024-02-14T15:24:40.095786Z",
      "metadata": {
        "system": {
          "entities": []
        }
      },
      "role": "ai",
      "token_count": 25,
      "uuid": "450883b6-87b8-4540-8a91-1fbe3821f433"
    },
    {
      "content": "问题是什么呢",
      "created_at": "2024-02-14T15:26:22.120107Z",
      "metadata": {
        "system": {
          "entities": []
        }
      },
      "role": "human",
      "token_count": 0,
      "uuid": "d7352f6e-ba4a-4509-8fdc-2ee489ea811f"
    },
    {
      "content": "抱歉，您并未提出具体问题，请提供更多信息，以便我更好的为您解答。",
      "created_at": "2024-02-14T15:26:22.139642Z",
      "metadata": {
        "system": {
          "entities": []
        }
      },
      "role": "ai",
      "token_count": 0,
      "uuid": "14815edf-97ac-4aaa-bec6-55f450b2a4a1"
    },
    {
      "content": "那怎么办",
      "created_at": "2024-02-14T16:59:21.313163Z",
      "metadata": {
        "system": {
          "entities": []
        }
      },
      "role": "human",
      "token_count": 10,
      "uuid": "7c453a10-182b-488d-a489-b730be4485e7"
    },
    {
      "content": "很抱歉，您的问题中并未提及具体的问题背景或内容，因此我无法给出确切的答案。请您提供更多的问题细节，以便我更好地理解和回答您的问题。",
      "created_at": "2024-02-14T16:59:21.329191Z",
      "metadata": {
        "system": {
          "entities": [
            {
              "Label": "ORG",
              "Matches": [
                {
                  "End": 64,
                  "Start": 0,
                  "Text": "很抱歉，您的问题中并未提及具体的问题背景或内容，因此我无法给出确切的答案。请您提供更多的问题细节，以便我更好地理解和回答您的问题"
                }
              ],
              "Name": "很抱歉，您的问题中并未提及具体的问题背景或内容，因此我无法给出确切的答案。请您提供更多的问题细节，以便我更好地理解和回答您的问题"
            }
          ]
        }
      },
      "role": "ai",
      "token_count": 71,
      "uuid": "c9ef5398-7594-4a4e-b477-2c97c399de6f"
    }
  ],
  "info": "success",
  "status": 0
}
```

```json
{
  "data": {},
  "info": "param error",
  "status": 20001
}
```

```json
{
  "data": {},
  "info": "token invalid",
  "status": 20002
}
```

### 返回结果

| 状态码 | 状态码含义                                              | 说明 | 数据模型 |
| ------ | ------------------------------------------------------- | ---- | -------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | 成功 | Inline   |

### 返回数据结构

## POST 聊天
### URL：

/chat

### 请求方式：

POST

###
###  请求参数

```json
{
  "session_id": "b02",
  "category": "type",
  "content": "它的反函数是什么"
}
```

### 请求参数

| 名称         | 位置 | 类型   | 必选 | 说明 |
| ------------ | ---- | ------ | ---- | ---- |
| body         | body | object | 否   | none |
| » session_id | body | string | 是   | none |
| » category   | body | string | 是   | none |
| » content    | body | string | 是   | none |

### 返回参数：

> 成功

```json
{
  "data": {
    "answer": "主成分分析（Principal Component Analysis，PCA）是一种统计方法，主要用于数据降维。通过正交变换，将一组可能存在相关性的变量转换为一组线性不相关的变量，这些线性不相关的变量被称为主成分。\n\n在实际课题中，为了全面分析问题，常常会提出很多与此有关的变量。因为每个变量都在不同程度上反映这个课题的某些信息，这会导致数据集的维度很高，分析难度加大。主成分分析旨在找到这组变量中的少数几个重要成分，这些成分能够尽可能多地保留原始数据中的信息。\n\n主成分分析首先由K.皮尔森（Karl Pearson）对非随机变量引入，尔后H.霍特林将此方法推广到随机向量的情形。信息的大小通常用离差平方和或方差来衡量。\n\n主成分分析可以视为一种降维技术，它通过减少变量的数量简化数据集，同时尽可能保留原始数据中的变异。这种方法在许多领域都有应用，如人口统计学、地理学、数学建模等。\n\n以上内容仅供参考，如需更多信息，建议查阅统计学相关书籍或咨询统计学专家。"
  },
  "info": "success",
  "status": 0
}
```

```json
{
  "data": {
    "answer": "余弦函数是$y = \\cos x$，其定义域是$x \\in \\mathbf{R}$，值域是$y \\in [-1, 1]$。\n首先，我们知道余弦函数的反函数就是正弦函数，即$y = \\sin x$。\n但考虑到余弦函数的值域是$y \\in [-1, 1]$，所以反函数应当是$y = \\arcsin x$。\n其中，$\\arcsin x$表示$x$的正弦值的角，其范围在$[- \\frac{\\pi}{2}, \\frac{\\pi}{2}]$。\n因此，余弦函数的反函数是$y = \\arcsin x$。"
  },
  "info": "success",
  "status": 0
}
```

```json
{
  "data": {},
  "info": "param error",
  "status": 20001
}
```

### 返回结果

| 状态码 | 状态码含义                                              | 说明 | 数据模型 |
| ------ | ------------------------------------------------------- | ---- | -------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | 成功 | Inline   |

### 返回数据结构

状态码 **200**

| 名称      | 类型    | 必选 | 约束 | 中文名 | 说明 |
| --------- | ------- | ---- | ---- | ------ | ---- |
| » data    | object  | true | none |        | none |
| »» answer | string  | true | none |        | none |
| » info    | string  | true | none |        | none |
| » status  | integer | true | none |        | none |

# 数据模型

