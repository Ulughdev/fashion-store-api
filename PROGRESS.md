# PROGRESS.md

## ✅ QILINGANLAR

### 1. Loyiha asosi

- [x] npm init, packagelar o'rnatildi
- [x] server.js — serverni ishga tushiradi
- [x] app.js — express middleware lar sozlandi (helmet, cors, morgan, cookie-parser)
- [x] config/database.js — mongodb ulanish
- [x] middlewares/errorHandler.js — xatolarni ushlaydi
- [x] utils/AppError.js — custom xato classi
- [x] .env — muhit o'zgaruvchilari

---

## ⏭ KEYINGI QADAMLAR

### 2. Models (navbatdagi)

- [ ] user.model.js
- [ ] category.model.js
- [ ] product.model.js
- [ ] order.model.js

### 3. Auth

- [ ] register
- [ ] login
- [ ] refresh token
- [ ] logout

### 4. Products CRUD

- [ ] create, read, update, delete
- [ ] filter (gender, size, color, narx)
- [ ] search

### 5. Orders & Cart

- [ ] cart (savatcha)
- [ ] order yaratish
- [ ] order status

### 6. Deploy

- [ ] Railway (server)
- [ ] MongoDB Atlas (database)

## ✅ QILINGANLAR

### 1. Loyiha asosi

- [x] npm init, packagelar o'rnatildi
- [x] server.js — serverni ishga tushiradi
- [x] app.js — express middleware lar sozlandi (helmet, cors, morgan, cookie-parser)
- [x] config/database.js — mongodb ulanish
- [x] middlewares/errorHandler.js — xatolarni ushlaydi
- [x] utils/AppError.js — custom xato classi
- [x] .env — muhit o'zgaruvchilari

### 2. Models

- [x] user.model.js — bcrypt, comparePassword, role enum
- [x] category.model.js — slug auto-generation, parent category
- [x] product.model.js — sizes, colors, ratings, search index
- [x] order.model.js — shippingAddress, narx hisoblash, refund

---

## ⏭ KEYINGI QADAMLAR

### 3. Auth module (navbatdagi)

- [ ] register
- [ ] login
- [ ] refresh token
- [ ] logout

### 4. Products CRUD

- [ ] create, read, update, delete
- [ ] filter (gender, size, color, narx)
- [ ] search

### 5. Categories CRUD

- [ ] create, read, update, delete

### 6. Orders & Cart

- [ ] cart (savatcha)
- [ ] order yaratish
- [ ] order status

### 7. Deploy

- [ ] Railway (server)
- [ ] MongoDB Atlas (database)

## ✅ QILINGANLAR

### 1. Loyiha asosi

- [x] npm init, packagelar o'rnatildi
- [x] server.js — serverni ishga tushiradi
- [x] app.js — express middleware lar sozlandi (helmet, cors, morgan, cookie-parser)
- [x] config/database.js — mongodb ulanish
- [x] middlewares/errorHandler.js — xatolarni ushlaydi
- [x] utils/AppError.js — custom xato classi
- [x] .env — muhit o'zgaruvchilari

### 2. Models

- [x] user.model.js — bcrypt, comparePassword, role enum
- [x] category.model.js — slug auto-generation, parent category
- [x] product.model.js — sizes, colors, ratings, search index
- [x] order.model.js — shippingAddress, narx hisoblash, refund

### 3. Auth module

- [x] auth.service.js — register, login, refresh, logout logic
- [x] auth.controller.js — cookie based refresh token
- [x] auth.routes.js — public va private routes
- [x] auth.validation.js — Joi schema validation
- [x] middlewares/auth.js — JWT authenticate middleware (role qo'shildi)
- [x] middlewares/validate.js — request validation middleware

### 4. Products module

- [x] product.service.js — CRUD, filter, search, pagination, review
- [x] product.controller.js — so'rov va javob
- [x] product.routes.js — public, customer, admin routes
- [x] product.validation.js — createProductSchema, reviewSchema
- [x] middlewares/isAdmin.js — admin tekshirish

---

## ⏭ KEYINGI QADAMLAR

### 5. Categories module (navbatdagi)

- [ ] create, read, update, delete

### 6. Orders & Cart

- [ ] cart (savatcha)
- [ ] order yaratish
- [ ] order status

### 7. Deploy

- [ ] Railway (server)
- [ ] MongoDB Atlas (database)
