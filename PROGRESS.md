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

### 5. Categories module

- [x] category.service.js — CRUD, slug auto-generation
- [x] category.controller.js — so'rov va javob
- [x] category.routes.js — public va admin routes
- [x] category.validation.js — createCategorySchema, updateCategorySchema

### 6. Orders module

- [x] order.service.js — create, cancel, status update, stock management
- [x] order.controller.js — so'rov va javob
- [x] order.routes.js — customer va admin routes
- [x] order.validation.js — createOrderSchema, updateStatusSchema

### 7. Users module

- [x] user.service.js — getMe, updateMe, changePassword, getAllUsers, deleteUser
- [x] user.controller.js — so'rov va javob
- [x] user.routes.js — customer va admin routes
- [x] user.validation.js — updateMeSchema, changePasswordSchema

### 8. Fixes

- [x] Model pathlar to'g'irlandi
- [x] auth.js middleware to'g'irlandi
- [x] MONGO_URI to'g'irlandi

---

## ⏭ KEYINGI QADAMLAR

### 9. Swagger dokumentatsiya

- [ ] Barcha endpointlar uchun dokumentatsiya

### 10. Deploy

- [ ] Railway (server)
- [ ] MongoDB Atlas (database) ✅ ulandi

#################################################################################################################################################################################

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

- [x] auth.service.js — register, login, refresh, logout, registerAdmin
- [x] auth.controller.js — cookie based refresh token
- [x] auth.routes.js — public va private routes
- [x] auth.validation.js — Joi schema validation
- [x] middlewares/auth.js — JWT authenticate middleware
- [x] middlewares/validate.js — request validation middleware
- [x] middlewares/isAdmin.js — admin role check

### 4. Products module

- [x] product.service.js — CRUD, filter, search, pagination, review
- [x] product.controller.js — so'rov va javob
- [x] product.routes.js — public, customer, admin routes
- [x] product.validation.js — createProductSchema, reviewSchema

### 5. Categories module

- [x] category.service.js — CRUD, slug auto-generation
- [x] category.controller.js — so'rov va javob
- [x] category.routes.js — public va admin routes
- [x] category.validation.js — createCategorySchema, updateCategorySchema

### 6. Orders module

- [x] order.service.js — create, cancel, status update, stock management
- [x] order.controller.js — so'rov va javob
- [x] order.routes.js — customer va admin routes
- [x] order.validation.js — createOrderSchema, updateStatusSchema

### 7. Users module

- [x] user.service.js — getMe, updateMe, changePassword, getAllUsers, deleteUser
- [x] user.controller.js — so'rov va javob
- [x] user.routes.js — customer va admin routes
- [x] user.validation.js — updateMeSchema, changePasswordSchema

### 8. Swagger dokumentatsiya

- [x] config/swagger.js — swagger sozlamalari
- [x] Auth, Products, Categories, Orders, Users endpointlari documented
- [x] https://fashion-store-api-production-04e3.up.railway.app/api/docs

### 9. Deploy

- [x] Railway — server deploy
- [x] MongoDB Atlas — database
- [x] Production URL: https://fashion-store-api-production-04e3.up.railway.app

---

## 🏆 LOYIHA YAKUNLANDI!
