create database Stock;

create table Users (
	user_id varchar(10) primary key,
	username varchar(50) not null,
	password varchar(50) not null,
	full_name varchar(50) not null,
	phone_number varchar(10) not null,
	address varchar(50) not null,
	identification_number char(14) not null,
	birthday timestamp(6) not null,
	amount decimal not null,
	state varchar(10) not null,
	created_at timestamp(6) not null default now(),
	updated_at timestamp(6) not null default now()
);


create table Stocks(
	stock_id varchar(10) primary key,
	symbol varchar(10) unique,
	name varchar(50) not null,
	state varchar(10) not null,
	created_at timestamp(6) not null default now(),
	updated_at timestamp(6) not null default now()
);

CREATE INDEX index_stocks_on_symbol ON Stocks USING btree (symbol);

create table Assets (
	asset_id varchar(10) primary key,
	user_id varchar(10) references Users(user_id),
	stock_id varchar(10) references Stocks(stock_id),
	free_asset decimal not null,
	locked_asset decimal not null,
	created_at timestamp(6) not null default now(),
	updated_at timestamp(6) not null default now()
);


create table Sessions (
	session_id varchar(10) primary key,
	stock_id varchar(10) references Stocks(stock_id),
	ceil_price decimal not null,
	floor_price decimal not null,
	ref_price decimal not null,
	created_at timestamp(6) not null default now(),
	updated_at timestamp(6) not null default now()
);

insert into Sessions values ('session_1', 'stock_1', 21.25, 18.55, 19.9);
insert into Sessions values ('session_2', 'stock_1', 24.25, 21.55, 23.9);

create table Orders (
	order_id varchar(10) primary key,
	user_id varchar(10) references Users(user_id),
	session_id varchar(10) references Sessions(session_id),
	price_per_unit decimal not null,
	coin_amount decimal not null,
	original_coin_amount decimal not null,
	matched_at timestamp(6) null,
	type varchar(8) not null,
	state varchar(10) not null,
	symbol char(10),
	created_at timestamp(6) not null default now()
);

create table Reports (
	total_volume decimal not null,
	highest_price decimal not null,
	lowest_price decimal not null,
	total_ask_volume decimal not null,
	total_bid_volume decimal not null,
	session_id varchar(10) primary key references Sessions(session_id) ,
	created_at timestamp(6) not null default now(),
	updated_at timestamp(6) not null default now()
);

create table Interval1mTickers (
	interval_id varchar(15) primary key,
	symbol varchar(10) not null,
	volume decimal not null,
	open_price decimal not null,
	close_price decimal not null,
	highest_price decimal not null,
	lowest_price decimal not null,
	number_of_traders int not null,
	open_time timestamp(6) not null,
	close_time timestamp(6) not null
);


CREATE INDEX index_internal1mtickers_on_symbol ON Interval1mTickers USING btree (symbol);

create table internal_users
(
    internal_user_id varchar(15)                not null
        primary key,
    username         varchar(50)                not null,
    password         varchar(50)                not null,
    full_name        varchar(50)                not null,
    created_at       timestamp(6) default now() not null,
    updated_at       timestamp(6) default now() not null
);

--username unique

create or replace function username_unique()
returns trigger
language plpgsql
as
    $$
    begin
        if exists(select * from users where username = new.username) then
            raise exception 'Username unique';
        end if;
        return new;
    end;
    $$;

create trigger trg_username_unique
    before insert
    on users
    for each row
    execute procedure username_unique();

create or replace function password_has_six_length()
returns trigger
language plpgsql
as
    $$
    begin
        if length(new.password) < 6 then
            raise exception 'Password must be greater than 6 characters';
        end if;
        return new;
    end;
    $$;

create trigger trg_password_has_six_length
    before insert
    on users
    for each row
    execute procedure password_has_six_length();

create or replace function full_name_can_not_empty()
returns trigger
language plpgsql
as
    $$
    begin
        if new.full_name is null or new.full_name = '' then
            raise exception 'Full name can not empty';
        end if;
        return new;
    end;
    $$;

create trigger trg_full_name_can_not_empty
    before insert
    on users
    for each row
    execute procedure full_name_can_not_empty();


create or replace function phone_is_a_number()
returns trigger
language plpgsql
as
    $$
    begin
        if (select new.phone_number ~ '^[0-9]*$') then
            return new;
        end if;
        raise exception 'Phone number is a number';
    end;
    $$;

create trigger trg_phone_is_a_number
    before insert
    on users
    for each row
    execute procedure phone_is_a_number();

create or replace function identification_number_is_a_number()
returns trigger
language plpgsql
as
    $$
    begin
        if (select new.identification_number ~ '^[0-9]*$') then
            return new;
        end if;
        raise exception 'Identification number is a number';
    end;
    $$;

create trigger trg_identification_number_is_a_number
    before insert
    on users
    for each row
    execute procedure identification_number_is_a_number();
drop trigger trg_identification_number_is_a_number on users;

create or replace function birthday_can_not_empty()
returns trigger
language plpgsql
as
    $$
    begin
       if new.birthday is null or new.birthday = '' then
            raise exception 'Birthday can not empty';
        end if;
        return new;
    end;
    $$;

create trigger trg_birthday_can_not_empty
    before insert
    on users
    for each row
    execute procedure birthday_can_not_empty();
-- create new user

drop trigger trg_birthday_can_not_empty on users;

create or replace procedure create_user(user_name varchar(50), password varchar(50), full_name varchar(50), phone_number varchar(10), address varchar(50), identification_number char(14), birthday timestamp(6))
language plpgsql
as $$
DECLARE
	id integer := 1;
BEGIN
	while exists(select * from users where user_id = CONCAT('user_', id)) loop
		id := id + 1;
	end loop;
	insert into users values (CONCAT('user_', id), user_name, password, full_name, phone_number, address, identification_number, birthday, 0, 'enabled');
END;
$$;

create or replace function fn_sync_user_stock()
returns trigger
language plpgsql
as
$$
declare cur_asset_not_create cursor for select * from stocks as s where s.stock_id not in (select stock_id from assets where user_id = new.user_id);
    current_stock record;
    id integer := 1;
    begin
        open cur_asset_not_create;
        loop
            fetch cur_asset_not_create into current_stock;
            exit when not found;
            id := 1;
            while exists(select * from assets where asset_id  = concat('asset_', id)) loop
		        id := id + 1;
            end loop;

	        insert into assets values(concat('asset_', id), new.user_id, current_stock.stock_id, 0, 0);
        end loop;
        close cur_asset_not_create;
        return new;
    end;
$$;

create trigger trg_sync_user_stock
    after insert
    on users
    for each row
    execute procedure fn_sync_user_stock();

-- disable user

create or replace procedure disable_user(s varchar(10))
language plpgsql
as $$
begin
	if not exists (select * from users where user_id = s) then
		raise exception 'User does not exist';
	end if;

	update users set state = 'disabled' where user_id = s;
end;
$$;


-- deposit fund
create or replace procedure deposit_fund(u_id varchar(10), fund decimal, stock varchar(10))
language plpgsql
as $$
#variable_conflict use_column
begin
	if not exists (select * from assets where user_id = u_id and stock_id = stock) then
		raise exception 'User does not exist';
	end if;
	update assets set free_asset = free_asset + fund where user_id = u_id and stock_id = stock;
end;
$$;

-- withdraw fund

create or replace procedure withdraw_fund(u_id varchar(10), fund decimal, stock varchar(10))
language plpgsql
as $$
#variable_conflict use_column
begin
	if not exists (select * from assets where user_id = u_id and stock_id = stock) then
		raise exception 'User does not exist';
	end if;

	if exists(select * from assets where user_id = u_id and stock_id = stock and free_asset < fund) then
        raise exception  'Số tiền không đủ đề rút !';
    end if;

	update assets set free_asset = free_asset - fund where user_id = u_id and stock_id = stock;
end;
$$;
-- call withdraw_fund('user_1', 23000, 'stock_1');

-- stock

create or replace function symbol_is_unique()
returns trigger
language plpgsql
as
    $$
    begin
        if exists (select * from stocks where symbol = new.symbol) then
		    raise exception 'Stock already exists';
	    end if;
        return new;
    end;
    $$;

create trigger trg_symbol_is_unique
    before insert
    on stocks
    for each row
    execute procedure symbol_is_unique();

create or replace function name_is_unique()
returns trigger
language plpgsql
as
    $$
    begin
        if exists (select * from stocks where name = new.name) then
            raise exception 'Tên đã tồn tại';
        end if;
        return new;
    end;
    $$;

create trigger trg_name_is_unique
    before insert
    on stocks
    for each row
    execute procedure name_is_unique();

create or replace function state_is_only_enabled_or_disabled()
returns trigger
language plpgsql
as
    $$
    begin
        if new.state != 'enabled' and new.state != 'disabled' then
            raise exception 'State is only enabled or disabled';
        end if;
        return new;
    end;
    $$;

create trigger trg_state_is_only_enabled_or_disabled
    before insert
    on stocks
    for each row
    execute procedure state_is_only_enabled_or_disabled();

create or replace procedure proc_create_stock(s varchar(10), n varchar(50), price decimal)
language plpgsql
as $$
declare
	id integer := 1;
begin
	while exists(select * from stocks where stock_id = concat('stock_', id)) loop
		id := id + 1;
	end loop;

	insert into stocks values (concat('stock_', id), s, n, 'enabled');
	call proc_create_session(concat('stock_', id), price / 1.10, price * 1.10, price);
end;
$$;

call proc_create_stock('VND', 'VND', 1);
-- call proc_create_stock('ACB', 'Ngân hàng ACB', 20);
-- call proc_create_stock('TCB', 'Ngân hàng TCB', 30);
-- call proc_create_stock('VCB', 'Ngân hàng VCB', 30);
-- call proc_create_stock('TPB', 'Ngân hàng TPB', 30);

create or replace procedure proc_disable_stock(s varchar(10))
language plpgsql
as $$
begin
	if not exists (select * from stocks where stock_id = s) then
		raise exception 'Stock does not exist';
	end if;

	update stocks set state = 'disabled' where stock_id = s;
end;
$$;

-- call proc_disable_stock('stock_1');

create or replace procedure proc_enable_stock(s varchar(10))
language plpgsql
as $$
begin
	if not exists (select * from stocks where stock_id = s) then
		raise exception 'Stock does not exist';
	end if;

	update stocks set state = 'enabled' where stock_id = s;
end;
$$;

-- call proc_enable_stock('stock_1');

create or replace function fn_sync_stock_user()
returns trigger
language plpgsql
as
$$
    declare cur_users cursor for select * from users;
        id integer := 1;
        current_u record;
    begin
        open cur_users;
        loop
            fetch cur_users into current_u;
            exit when not found;
            id := 1;
            while exists(select * from assets where asset_id  = concat('asset_', id)) loop
		        id := id + 1;
            end loop;

	        insert into assets values(concat('asset_', id), current_u.user_id, new.stock_id, 0, 0);
        end loop;
        close cur_users;
        return new;
    end
$$;
--
create trigger trg_sync_stock_user
    after insert
    on stocks
    for each row
    execute procedure fn_sync_stock_user();

-- session

create or replace procedure proc_create_session(stock varchar(10), c_price decimal, f_price decimal, r_price decimal)
language plpgsql
as $$
declare
	id integer := 1;
begin
    if not exists(select * from stocks where stock_id = stock) then
        raise exception 'Stock invalid';
    end if;
    while exists(select * from sessions where session_id = concat('session_', id)) loop
        id := id + 1;
    end loop;
    insert into sessions values(concat('session_', id), stock, c_price, f_price, r_price);
    insert into reports values(0, 0, 99999999, 0, 0, concat('session_', id));
end;
$$;


-- call proc_create_session('stock_1', 1, 1, 1);
-- call proc_create_session('stock_2', 20.95, 24.05, 22.50);
-- call proc_create_session('stock_3', 18.8, 20.05, 19.50);
-- call proc_create_session('stock_4', 15.3, 17.05, 26.10);

-- ORDER

create or replace function type_is_only_ask_or_bid()
returns trigger
language plpgsql
as
    $$
    begin
        if new.type != 'ask' and new.type != 'bid' then
            raise exception 'Type is just only ask or bid';
        end if;
        return new;
    end;
    $$;

create trigger trg_type_is_only_ask_or_bid
    before insert
    on orders
    for each row
    execute procedure type_is_only_ask_or_bid();

create or replace function state_is_pending_or_successful_or_canceled()
returns trigger
language plpgsql
as
    $$
    begin
        if new.state != 'enabled' and new.state != 'successful' and new.state != 'canceled’' then
            raise exception 'State is just only pending or successful or canceled';
        end if;
        return new;
    end;
    $$;

create trigger trg_state_is_pending_or_successful_or_canceled
    before insert
    on orders
    for each row
    execute procedure state_is_pending_or_successful_or_canceled();


create or replace procedure create_order(u_id varchar(10), s char(10), type varchar(8), price decimal, c_amount decimal)
language plpgsql
as $$
    declare
        id integer := 1;
        stock_session varchar(10);
        free_asset_var decimal;
        stock varchar(10);
    BEGIN
        if not exists(select * from users where user_id = u_id) then
            raise exception 'User not exits';
        end if;

        if type = 'ask' then
            select stock_id into stock from Stocks where symbol = s;
        else
            select stock_id into stock from Stocks where symbol = 'VND';
        end if;

        select free_asset into free_asset_var from assets where stock_id = stock and user_id = u_id;

        if (type = 'bid') AND (c_amount > free_asset_var) then
            raise exception 'Not bid enough funds';
        end if;
        if (type = 'ask')  AND (c_amount > free_asset_var) then
            raise exception 'Not ask enough funds';
        end if;

        if type = 'ask' then
            update assets set free_asset = free_asset - c_amount where stock_id = stock and user_id = u_id;
            update assets set locked_asset = locked_asset + c_amount where stock_id = stock and user_id = u_id;
        else
            update assets set free_asset = free_asset - price * c_amount where stock_id = stock and user_id = u_id;
            update assets set locked_asset = locked_asset + price * c_amount where stock_id = stock and user_id = u_id;
        end if;

        while exists(select * from orders where order_id = concat('order_', id)) loop
            id := id + 1;
        end loop;
        if type = 'ask' then
            select session_id into stock_session from Sessions where stock_id = stock order by created_at desc limit 1;
        else
           select session_id into stock_session from Sessions, Stocks where symbol = 'VND' and Sessions.stock_id = Stocks.stock_id order by Sessions.created_at desc limit 1;
        end if;

        insert into orders values(concat('order_', id), u_id, stock_session, price, c_amount, c_amount, null, type, 'enabled', s);
    END;
    $$;


create or replace procedure proc_cancel_order(o_id varchar(10))
language plpgsql
as
    $$
    begin
        if not exists(select * from orders where order_id = o_id) then
            raise exception 'Order not exists';
        end if;
        update orders set state = 'canceled' where order_id= o_id;
    end;
    $$;


create or replace function matching_order()
returns trigger
language plpgsql
as
    $$
    declare
        current_order record;
        current_coin_amount_new_order decimal;
        new_coin_amount_current_order decimal;
        new_coin_amount_new_order decimal;
        target_stock_id varchar(10);
        base_stock_id varchar(10);
        s_id varchar(10);
        sub decimal;
        cur_ask_orders cursor(s_id varchar(10)) for select * from orders
                                                         where symbol = new.symbol
                                                            and session_id = s_id
                                                            and state = 'enabled'
                                                            and price_per_unit <= new.price_per_unit
                                                            and order_id != new.order_id
                                                            and type = 'ask'
                                                         order by price_per_unit asc,
                                                                  created_at asc;
        cur_bid_orders cursor(s_id varchar(10)) for select * from orders
                                                         where symbol = new.symbol
                                                            and session_id = s_id
                                                            and state = 'enabled'
                                                            and price_per_unit >= new.price_per_unit
                                                            and order_id != new.order_id
                                                            and type = 'bid'
                                                         order by price_per_unit asc,
                                                                  created_at asc;

    begin
--         PERFORM pg_sleep(5);
        select session_id into s_id from orders where symbol = new.symbol and state = 'enabled' and type != new.type order by created_at desc limit 1;

        target_stock_id := (select stock_id from Stocks where symbol = new.symbol);
        base_stock_id := (select stock_id from Stocks where symbol = 'VND');

        if new.type = 'bid' then
            open cur_ask_orders(s_id);
            loop
                fetch cur_ask_orders into current_order;
                exit when not found;
                raise notice 'Value : %', current_order;
                current_coin_amount_new_order := (select coin_amount from orders where order_id = new.order_id);
                sub := current_coin_amount_new_order - current_order.coin_amount;

                if sub = 0 then
                    new_coin_amount_current_order := 0;
                    new_coin_amount_new_order := 0;
                    -- update target_stock asset
                    update assets set locked_asset = locked_asset - current_coin_amount_new_order where stock_id = target_stock_id and user_id = current_order.user_id;
                    update assets set free_asset = free_asset + current_coin_amount_new_order where stock_id = target_stock_id and user_id = new.user_id;

                    -- update base_stock asset
                    update assets set free_asset = free_asset + current_coin_amount_new_order * current_order.price_per_unit where stock_id = base_stock_id and user_id = current_order.user_id;
                    update assets set locked_asset = locked_asset - current_coin_amount_new_order * current_order.price_per_unit where stock_id = base_stock_id and user_id = new.user_id;
                end if;

                 if sub > 0 then
                    new_coin_amount_current_order := 0;
                    new_coin_amount_new_order := current_coin_amount_new_order - current_order.coin_amount;

                    -- update target_stock asset
                    update assets set locked_asset = locked_asset - new_coin_amount_new_order where stock_id = target_stock_id and user_id = current_order.user_id;
                    update assets set free_asset = free_asset + new_coin_amount_new_order where stock_id = target_stock_id and user_id = new.user_id;

                    -- update base_stock asset
                    update assets set free_asset = free_asset + new_coin_amount_new_order * current_order.price_per_unit where stock_id = base_stock_id and user_id = current_order.user_id;
                    update assets set locked_asset = locked_asset - new_coin_amount_new_order * current_order.price_per_unit where stock_id = base_stock_id and user_id = new.user_id;

                end if;

                if sub < 0 then
                    new_coin_amount_current_order := current_order.coin_amount- current_coin_amount_new_order;
                    new_coin_amount_new_order := 0;

                    -- update target_stock asset
                    update assets set locked_asset = locked_asset - current_coin_amount_new_order where stock_id = target_stock_id and user_id = current_order.user_id;
                    update assets set free_asset = free_asset + current_coin_amount_new_order where stock_id = target_stock_id and user_id = new.user_id;

                    -- update base_stock asset
                    update assets set free_asset = free_asset + current_coin_amount_new_order * current_order.price_per_unit where stock_id = base_stock_id and user_id = current_order.user_id;
                    update assets set locked_asset = locked_asset - current_coin_amount_new_order * current_order.price_per_unit where stock_id = base_stock_id and user_id = new.user_id;

                end if;


                UPDATE orders set coin_amount = new_coin_amount_current_order where order_id = current_order.order_id;
                UPDATE orders set coin_amount = new_coin_amount_new_order where order_id = new.order_id;

            end loop;
            close cur_ask_orders;
        else
            open cur_bid_orders(s_id);
            loop
                fetch cur_bid_orders into current_order;
                exit when not found;
                raise notice 'Value : %', current_order;

                current_coin_amount_new_order := (select coin_amount from orders where order_id = new.order_id);
                sub := current_coin_amount_new_order - current_order.coin_amount;

                if sub = 0 then
                    new_coin_amount_current_order := 0;
                    new_coin_amount_new_order := 0;

                    update assets set locked_asset = locked_asset - current_coin_amount_new_order where stock_id = target_stock_id and user_id = new.user_id;
                    update assets set free_asset = free_asset + current_coin_amount_new_order where stock_id = target_stock_id and user_id = current_order.user_id;

                    update assets set free_asset = free_asset + current_coin_amount_new_order * current_order.price_per_unit where stock_id = base_stock_id and user_id = new.user_id;
                    update assets set locked_asset = locked_asset - current_coin_amount_new_order * current_order.price_per_unit where stock_id = base_stock_id and user_id = current_order.user_id;
                end if;

                if sub > 0 then
                    new_coin_amount_current_order := 0;
                    new_coin_amount_new_order := current_coin_amount_new_order - current_order.coin_amount;

                    update assets set locked_asset = locked_asset - current_order.coin_amount where stock_id = target_stock_id and user_id = new.user_id;
                    update assets set free_asset = free_asset + current_order.coin_amount where stock_id = target_stock_id and user_id = current_order.user_id;

                    update assets set free_asset = free_asset + current_order.coin_amount * current_order.price_per_unit where stock_id = base_stock_id and user_id = new.user_id;
                    update assets set locked_asset = locked_asset - current_order.coin_amount * current_order.price_per_unit where stock_id = base_stock_id and user_id = current_order.user_id;
                end if;

                if sub < 0 then
                    new_coin_amount_current_order := current_order.coin_amount - current_coin_amount_new_order;
                    new_coin_amount_new_order := 0;

                    update assets set locked_asset = locked_asset - current_coin_amount_new_order where stock_id = target_stock_id and user_id = new.user_id;
                    update assets set free_asset = free_asset + current_coin_amount_new_order where stock_id = target_stock_id and user_id = current_order.user_id;

                    update assets set free_asset = free_asset + current_coin_amount_new_order * current_order.price_per_unit where stock_id = base_stock_id and user_id = new.user_id;
                    update assets set locked_asset = locked_asset - current_coin_amount_new_order * current_order.price_per_unit where stock_id = base_stock_id and user_id = current_order.user_id;
                end if;

                UPDATE orders set coin_amount = new_coin_amount_current_order where order_id = current_order.order_id;
                UPDATE orders set coin_amount = new_coin_amount_new_order where order_id = new.order_id;

                end loop;
                close cur_bid_orders;
        end if;

    return new;
    end;
    $$;

create or replace trigger trg_matching_ask_order
    after insert
    on orders
    for each row
    execute procedure matching_order();


create or replace function auto_set_state_order_match()
returns trigger
language plpgsql
    as
    $$
    begin
        if new.coin_amount = 0 then
            new.state = 'successful';
            new.matched_at = now();
        end if;
        return new;
    end;
    $$;

create trigger trg_auto_set_state_order_match
    before update
    on orders
    for each row
    execute procedure auto_set_state_order_match();

create or replace function auto_set_report_order_match()
returns trigger
language plpgsql
as
    $$
    declare current_lowest_price decimal;
        current_highest_price decimal;
        current_session_id varchar(10);
    begin
        if new.coin_amount = 0 then

            if new.type = 'ask' then
                current_session_id := new.session_id;
                update reports set total_ask_volume = total_ask_volume + new.original_coin_amount where session_id = current_session_id;
            else
                select session_id into current_session_id from sessions, stocks where sessions.stock_id = stocks.stock_id order by sessions.created_at desc limit 1;
                update reports set total_bid_volume = total_bid_volume + new.original_coin_amount where session_id = current_session_id;
            end if;

            update reports set total_volume = total_volume + new.original_coin_amount where session_id = current_session_id;

            select highest_price, lowest_price into current_highest_price, current_lowest_price from reports where session_id = current_session_id;

            if new.price_per_unit > current_highest_price then
                update reports set highest_price = new.price_per_unit where session_id = current_session_id;

            end if;

            if new.price_per_unit < current_lowest_price then
                update reports set lowest_price = new.price_per_unit where session_id = current_session_id;
            end if;
        end if;
        return new;
    end;
    $$;

create trigger trg_auto_set_report_order_match
    after update
    on orders
    for each row
    execute procedure auto_set_report_order_match();

create or replace function fn_get_partial_order_book(s varchar(10), t varchar(8), l integer)
returns table (coin_amount decimal, price_per_unit decimal, order_type varchar(8))
language plpgsql
as
    $$
    begin
        if t = 'ask' then
            return query select sum(o.coin_amount), o.price_per_unit, o.type
                from orders as o
                where o.symbol = s and o.type = t and o.state = 'enabled'
                group by o.price_per_unit, o.type
                order by o.price_per_unit asc limit l;
            else
            return query select sum(o.coin_amount), o.price_per_unit, o.type
                from orders as o
                where o.symbol = s and o.type = t and o.state = 'enabled'
                group by o.price_per_unit, o.type
                order by o.price_per_unit desc limit l;
        end if;

    end;
$$;


create or replace function fn_get_user(us varchar(50))
returns table (user_id varchar(10), username varchar(50), password varchar(50), name varchar(50), phone_number varchar(10), address varchar(50), identification_number char(14), birthday timestamp(6))
language plpgsql
as
    $$
    begin
        return query select u.user_id, u.username ,u.password, u.full_name, u.phone_number, u.address, u.identification_number, u.birthday from users as u where u.username = us limit 1;
    end;
    $$;

create or replace function fn_get_latest_order_matching(s char(10))
returns table (coin_amount decimal, price_per_unit decimal)
language plpgsql
as
    $$
    declare latest_price_per_unit decimal;
    begin
        latest_price_per_unit := (select o.price_per_unit from orders as o where o.symbol = s and o.state = 'successful' order by o.matched_at desc limit 1);

        return query select sum(o.original_coin_amount), o.price_per_unit
                     from orders as o
                     where o.symbol = s and o.state = 'successful' and o.price_per_unit = latest_price_per_unit
                     group by o.price_per_unit;

    end;
    $$;

select * from fn_get_latest_order_matching('ACB');

create or replace function fn_get_report_current_session(sym char(10))
returns table (ceil_price decimal, floor_price decimal, ref_price decimal, total_volume decimal, highest_price decimal, lowest_price decimal)
language plpgsql
as
    $$
    begin
        return query select s.ceil_price, s.floor_price, s.ref_price, r.total_volume, r.highest_price, r.lowest_price
                     from reports as r, sessions as s, stocks as st
                    where r.session_id = s.session_id
                    and s.stock_id = st.stock_id
                    and st.symbol = sym
                    order by r.session_id desc limit 1;
    end;
    $$;

select * from fn_get_report_current_session('ACB');

create or replace function fn_filter_order_by_user(u_id varchar(10), sym char(10), s varchar(10))
returns table (order_id varchar(10), price_per_unit decimal, coin_amount decimal, original_coin_amount decimal, type varchar(8), state varchar(10), created_at timestamp(6))
language plpgsql
as
    $$
    begin
        if s = 'all' then
            return query select o.order_id, o.price_per_unit, o.coin_amount, o.original_coin_amount, o.type, o.state, o.created_at
                         from orders as o
                         where o.symbol = sym and
                               o.user_id = u_id
                         order by created_at desc;
        end if;
        return query select o.order_id, o.price_per_unit, o.coin_amount, o.original_coin_amount, o.type, o.state, o.created_at
                     from orders as o
                     where o.symbol = sym and
                           o.state = s and
                           o.user_id = u_id
                     order by created_at desc;
    end;
    $$;

select * from fn_filter_order_by_user('user_1', 'ACB', 'all');
select * from fn_filter_order_by_user('user_1', 'ACB', 'enabled');

create or replace function fn_filter_matching_orders(sym char(10))
returns table (price_per_unit decimal, original_coin_amount decimal, type varchar(8), matched_at timestamp(6))
language plpgsql
as
    $$
    begin
        return query select o.price_per_unit, o.original_coin_amount, o.type,  o.matched_at
                     from orders as o
                     where o.symbol = sym and
                           o.state = 'successful'
                     order by matched_at desc;
    end;
    $$;

select * from fn_filter_matching_orders('ACB');


create or replace function fn_get_all_assets(u_id varchar(10))
returns table (name varchar(50), symbol varchar(10) , free_asset decimal, locked_asset decimal)
language plpgsql
as
    $$
    begin
        return query select s.name, s.symbol, a.free_asset, a.locked_asset from assets as a, stocks as s
            where a.stock_id = s.stock_id and
                  a.user_id = u_id
        order by a.created_at;
    end;
    $$;

select * from fn_get_all_assets('user_1');

create or replace function fn_sync_interval_chart()
returns trigger
language plpgsql
as
    $$
    declare id integer := 1;
        o_time timestamp(6);
        highest_price decimal;
        lowest_price decimal;
    begin
        if new.coin_amount = 0 then
            if not exists(select * from interval1mtickers as i where i.open_time <= now() and i.close_time >= now()) then
                while exists(select * from interval1mtickers where interval_id = concat('interval_', id)) loop
                        id := id + 1;
                    end loop;
                o_time := date_trunc('minute', now());
                insert into interval1mtickers values (concat('interval_', id), new.symbol, new.original_coin_amount, new.price_per_unit, new.price_per_unit, new.price_per_unit, new.price_per_unit, 1, o_time, o_time + interval '59 second');
                return new;
            end if;

            select i.highest_price, i.lowest_price into highest_price, lowest_price from interval1mtickers as i where i.open_time <= now() and i.close_time >= now();

            if highest_price < new.price_per_unit then
                update interval1mtickers set highest_price = new.price_per_unit where open_time <= now() and close_time >= now();
            end if;

            if lowest_price > new.price_per_unit then
                update interval1mtickers set lowest_price = new.price_per_unit where open_time <= now() and close_time >= now();
            end if;

            update interval1mtickers set volume = volume + new.original_coin_amount where open_time <= now() and close_time >= now();
            update interval1mtickers set close_price = new.price_per_unit where open_time <= now() and close_time >= now();
        end if;
        return new;
    end;
    $$;

create trigger trg_sync_interval_chart
    after update
    on orders
    for each row
    execute procedure fn_sync_interval_chart();
--
-- delete from orders;
-- update assets set free_asset = 10000;
-- update assets set locked_asset = 0;
--
-- -- Case: sub = 0
-- call create_order('user_2', 'ACB', 'bid', 20, 20);
-- call create_order('user_1', 'ACB', 'ask', 20, 20);
--
-- --Case: sub > 0
-- call create_order('user_2', 'ACB', 'bid', 30, 20);
-- call create_order('user_1', 'ACB', 'ask', 30, 30);
--
-- --Case: sub < 0
-- call create_order('user_2', 'ACB', 'bid', 20, 30);
-- call create_order('user_1', 'ACB', 'ask', 20, 20);

create or replace function fn_get_chart(s varchar(10))
returns table (volume decimal, open_price decimal, close_price decimal, highest_price decimal, lowest_price decimal, open_time timestamp(6), close_time timestamp(6))
language plpgsql
as
    $$
    begin
        return query select i.volume, i.open_price, i.close_price, i.highest_price, i.lowest_price, i.open_time, i.close_time from interval1mtickers as i where i.symbol = s order by open_time desc;
    end;
    $$;

-- select *
-- from fn_get_chart('ACB');

create or replace function fn_count_all_users()
returns int
language plpgsql
as
    $$
    declare c int := 0;
    begin
        select count(*) into c from users;
        return c;
    end;
    $$;

select * from fn_count_all_users();

select count(*) from users;

select count(*) from orders where state = 'successful';

select sum(total_ask_volume) as total_ask_volume, sum(total_bid_volume) as total_bid_volume from reports;

select sum(total_ask_volume) as total_ask_volume, sum(total_bid_volume) as total_bid_volume, DATE_TRUNC('day', created_at) as day from reports group by DATE_TRUNC('day', created_at);


create or replace function fn_get_users()
returns table (user_id varchar(10), username varchar(50), name varchar(50), phone_number varchar(10), address varchar(50), identification_number char(14), birthday timestamp(6))
language plpgsql
as
    $$
    begin
        return query select u.user_id, u.username, u.full_name, u.phone_number, u.address, u.identification_number, u.birthday from users as u;
    end;
    $$;

select * from fn_get_users();

create or replace function fb_get_stocks()
returns table (stock_id varchar(10), symbol varchar(10), name varchar(50))
language plpgsql
as
    $$
    begin
        return query select s.stock_id, s.symbol, s.name from stocks as s where state = 'enabled';
    end;
    $$;

select * from fb_get_stocks();

create or replace procedure proc_create_internal_user(username varchar(50), password varchar(50), fullname varchar(50))
language plpgsql
as $$
DECLARE
	id integer := 1;
BEGIN
	while exists(select * from internal_users where internal_user_id = CONCAT('internal_user_', id)) loop
		id := id + 1;
	end loop;
	insert into internal_users values (CONCAT('internal_user_', id), username, password, fullname);
END;
$$;

create or replace function fn_get_internal_user(us varchar(50))
returns table (internal_user_id varchar(15), username varchar(50), password varchar(50), full_name varchar(50))
language plpgsql
as
    $$
    begin
        return query select u.internal_user_id, u.username ,u.password, u.full_name from internal_users as u where u.username = us limit 1;
    end;
    $$;


----
-- create role external_user_stock with login password 'Qq123456789';
-- select * from pg_roles;
-- grant connect on database Stock to external_user_stock;
-- grant select on table users to external_user_stock;
-- revoke select on table users from external_user_stock;