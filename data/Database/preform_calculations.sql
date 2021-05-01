--> calculate wireless session end times
UPDATE buffbus_data.session
    SET end_time = start_time + duration_sec * interval '1 second';

--> delete rows in session that exist out of the bus location tracking data
DELETE FROM buffbus_data.session
    WHERE start_time < '07:11:19' OR end_time > '19:18:21';

--> estimate where people boarded the bus based on their timing
UPDATE buffbus_data.session
    SET estimated_boarding_stop=subquery.id
    FROM(SELECT id, depart_time FROM buffbus_data.stop ORDER BY depart_time DESC ) AS subquery
    WHERE(depart_time < start_time);

--> estimate where passengers got off of the bus
UPDATE buffbus_data.session
    SET estimated_departure_stop=subquery.id
    FROM(SELECT id, arrival_time FROM buffbus_data.stop ORDER BY arrival_time) AS subquery
    WHERE(arrival_time > end_time);


