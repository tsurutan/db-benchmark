# Benchamrk

## Insert

INSERT INTO users (name, email)
SELECT concat(random() * 10, 'name'), concat(random() * 10, 'email') FROM generate_series(1,10000000);

## テーブル
ddl
```sql
create table users
(
    id    serial
        primary key,
    name  text,
    email text
);

create table profiles
(
    id      int unsigned auto_increment
        primary key,
    user_id int unsigned null,
    age     int          null,
    constraint profiles_user_id_foreign
        foreign key (user_id) references users (id)
);

create table polygons
(
    id   int unsigned auto_increment
        primary key,
    geom geometry not null
);
```

## クエリパフォーマンス検査
10000000データを挿入後

### find
```sql
select id, name, email from users where id = 32134;
```

postgres:40ms
mysql:33ms

差はそこまでない

### order(indexあり)
```sql
select id from users order by id asc;
```

postgres:31ms
mysql:40ms

差はそこまでない

### order(indexなし)
```sql
select name from users order by name asc;
```

postgres:27s
mysql:32s
若干mysqlのほうが遅い


### count
```sql
select count(id) from users;
```

postgres: 4s
mysql: 775ms

mysqlが圧倒的に早い

### sum
```sql
select sum(id) from users;
```

postgres: 3s
mysql: 1s606ms

若干mysqlのほうが早い

## JOIN
```sql
select email, age from users left join profiles on users.id = profiles.user_id;
```

postgres: 11s
mysql: 639ms

mysqlが圧倒的に早い

## Insert
```sql
INSERT INTO public.profiles (id, user_id, age) VALUES (10000001, 8962106, 0);
INSERT INTO public.profiles (id, user_id, age) VALUES (10000002, 8962107, 1);
INSERT INTO public.profiles (id, user_id, age) VALUES (10000003, 8962108, 2);
INSERT INTO public.profiles (id, user_id, age) VALUES (10000004, 8962109, 3);
...
```

```sql
INSERT INTO test_database.profiles (id, user_id, age) VALUES (1, 8970810, 0);
INSERT INTO test_database.profiles (id, user_id, age) VALUES (2, 8970811, 1);
INSERT INTO test_database.profiles (id, user_id, age) VALUES (3, 8970812, 2);
INSERT INTO test_database.profiles (id, user_id, age) VALUES (4, 8970813, 3);
...
```

10000件のデータ挿入

postgres: 10.081
mysql: 12.768

postgresのほうが早い

## Geometryを使ったクエリ
```
SELECT id
FROM polygons
WHERE ST_Intersection(geom, ST_GeomFromText('POLYGON((0 0,10 0,10 10,0 10,0 0),(5 5,7 5,7 7,5 7,5 5))')) is not null LIMIT 1;
```

postgres: 820ms
mysql: 517

若干 mysqlのほうが早い
