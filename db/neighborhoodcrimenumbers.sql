SELECT COUNT(*) FROM (SELECT * FROM Incidents ORDER BY date_time DESC limit 1000) 
WHERE neighborhood_number = '17'

