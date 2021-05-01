DROP TABLE IF EXISTS buffbus_data.session;
DROP TABLE IF EXISTS buffbus_data.stop;
DROP TABLE IF EXISTS buffbus_data.location;

DROP SCHEMA IF EXISTS buffbus_data;

Create SCHEMA buffbus_data;

CREATE TABLE buffbus_data.location (
    label varchar(45) NOT NULL UNIQUE PRIMARY KEY,
    latitude float,
    longitude float
);

CREATE TABLE buffbus_data.stop (
    id SERIAL NOT NULL UNIQUE PRIMARY KEY,
    label varchar(45),
    arrival_time time,
    depart_time time,
    CONSTRAINT fk_session_has_boarding_stop
        FOREIGN KEY(label)
        REFERENCES buffbus_data.location(label)
);

-->No need to use a foreign key as there is only one bus being used at the moment
CREATE TABLE buffbus_data.session (
    id SERIAL NOT NULL UNIQUE PRIMARY KEY,
    start_time time,
    duration_sec int,
    end_time time,
    estimated_boarding_stop int,
    estimated_departure_stop int,
    CONSTRAINT fk_session_has_boarding_stop
        FOREIGN KEY(estimated_boarding_stop)
        REFERENCES buffbus_data.stop(id),
    CONSTRAINT fk_session_has_departure_stop
        FOREIGN KEY(estimated_departure_stop)
        REFERENCES buffbus_data.stop(id)
);