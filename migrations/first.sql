create table "Recipe"
(
    title              character varying[] not null,
    preparation_method text,
    preparation_time   double precision,
    portions           double precision,
    id                 serial
        constraint recipe_pk
            primary key
);

alter table "Recipe"
    owner to rebequinha;

create table "Ingredient"
(
    name      character varying[] not null,
    quantity  double precision    not null,
    id        serial
        constraint ingredient_pk
            primary key,
    recipe_id integer
        constraint recipe_ingredient
            references "Recipe"
);

alter table "Ingredient"
    owner to rebequinha;

create table "User"
(
    name     character varying[],
    username character varying[],
    email    character varying[],
    password character varying[],
    id       serial
        constraint user_pk
            primary key
);

alter table "User"
    owner to rebequinha;

create table comments
(
    content   text not null,
    timestamp timestamp,
    rating    integer,
    id        serial
        constraint comments_pk
            primary key,
    recipe_id integer
        constraint recipe_id
            references "Recipe"
            on delete set null,
    user_id   integer
        constraint user_comment
            references "User"
);

alter table comments
    owner to rebequinha;

