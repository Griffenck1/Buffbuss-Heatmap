--> This is the query that did all the leg work, it is real dense
SELECT s.label, count(ip), latitude, longitude FROM buffbus_data.session
    INNER JOIN buffbus_data.stop s on s.id = session.estimated_departure_stop
    INNER JOIN buffbus_data.location l on l.label = s.label
    WHERE start_time > '15:00:00' AND start_time < '16:00:00'
    GROUP BY s.label, latitude, longitude;