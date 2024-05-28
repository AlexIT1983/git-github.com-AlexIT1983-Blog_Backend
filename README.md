Области хранения данных:

-   база данных на json-server
-   BFF
-   redux-store

Сущности приложения:

-   пользователь: БД(список пользователей), BFF(сессия текущего пользователя), стор(обображение в браузере)

-   роль пользователя: БД(список ролей), BFF (сессия пользователя с ролью), стор(использование на клиенте)
-   статья: БД (список статей), стор (отображение в браузере)
-   коментарий: БД (список комментариев), стор (отображение в браузере)

Таблицы БД:

-   пользователи - users: id / login / password / registred_at / role_id
-   роли - roles: id / name
-   статьи - posts: id / title / image_url / content / published_at
-   комментарии - commets: id / autor_id / post_id / content / published_at

Схема состояния на BFF:

-   сессия текущего пользователя: login / password / role

Схема для redux store (на клиенте):

-   user: id / login / roleId / session
-   posts: массив post: id / title / imageUrl / publishedAt / commentsCount
-   post: id / title / imageUrl / content / publishedAt / comments: массив comment: id / author / content / publishedAt
-   users: массив user: id / login / registredAt / role
