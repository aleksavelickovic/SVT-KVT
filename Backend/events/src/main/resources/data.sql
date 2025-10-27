INSERT INTO comments (text, created_at, belongs_to_id, replies_to_id)
VALUES ('This is the first comment.', '2025-10-20T21:45:00',
        (SELECT id FROM users WHERE email = 'aleksavelickovic555@gmail.com'), NULL),
       ('Really interesting topic!', '2025-10-20T21:47:12',
        (SELECT id FROM users WHERE email = 'aleksavelickovic555@gmail.com'), NULL),
       ('I totally agree with this.', '2025-10-20T21:50:05',
        (SELECT id FROM users WHERE email = 'aleksavelickovic555@gmail.com'), NULL),
       ('Thanks for sharing!', '2025-10-20T21:53:42', (SELECT id FROM users WHERE email = 'carol@example.com'), NULL),
       ('Great post, keep it up!', '2025-10-20T21:57:31', (SELECT id FROM users WHERE email = 'carol@example.com'),
        NULL);

SELECT *
FROM comments;

INSERT INTO users (dtype, address, birthday, city, created_at, email, name, password, phone_number, image_filename)
VALUES ('ROLE_ADMINISTRATOR', '123 Elm St, Apt 4', '1990-05-14', 'New York',
        '2025-10-20T22:10:00',
        'aleksavelickovic555@gmail.com', 'Pera Peric', '$2a$08$jUkWGc23Y6Qkl69ikbmjC.0vRSEi6JeecB7unU4ajap4KX.O2dlJm',
        '+1-212-555-0143', 'aleksa.jpg'),
       ('ROLE_USER', '456 Oak Ave', '1985-11-03', 'San Francisco',
        '2025-10-20T22:12:30',
        'bob.smith@example.com', 'Bob Smith', '$2a$08$yJLVcWzRTvqfuluvWPhWaescscSqCw9Hdb2cJ9rTvPPpDHWcZ965m',
        '+1-415-555-0198', 'bob.jpg'),
       ('ROLE_USER', '789 Pine Rd', '1995-07-21', 'Chicago', '2025-10-20T22:15:45',
        'carol@example.com', 'Carol Davis', '$2a$08$g9zvrs9lj8662SD4t53RZ.FGhh9fPl/RN10hvEGhJ1kf1uCj7dmKW',
        '+1-312-555-0177', 'carol.jpeg');

SELECT *
FROM users;

select *
from users
where dtype = 'ROLE_ADMINISTRATOR';

INSERT INTO account_requests (address, created_at, password, rejection_reason, status, email)
VALUES ('321 Maple St, Apt 5', '2025-10-20', '$2a$08$vnTIORF4zzdONivQjYKZZ.WcfyuaU/FROGVbwIoNgiu38VMvgpLjO',
        NULL, 'PENDING', 'a.velickovic333@gmail.com'),
       ('654 Cedar Ave', '2025-10-20', '$2a$08$YzA2345678901bcdefghIJKLMNOpqrstuvWXyzABCD1234567890abc',
        'Incomplete documentation', 'REJECTED', 'documentation@example.com'),
       ('987 Birch Rd', '2025-10-20', '$2a$08$ZaB3456789012cdefghiJKLMNOpqrstuvWXyzABCD1234567890abcd', NULL,
        'PENDING', 'mega3000aka@gmail.com');

SELECT *
FROM account_requests;

INSERT INTO locations (name, description, created_at, address, type, total_rating, image_filename)
VALUES ('Grand Hall', 'Large indoor venue suited for conferences and concerts.', '2025-10-20', '12 Market St, Belgrade',
        'HALL', 5.47, 'turizam1.webp'),
       ('Riverside Park', 'Open-air park with stage and seating for community events.', '2025-09-15',
        'Riverside Dr, Novi Sad', 'OUTDOOR', 3.20, 'turizam2.jpg'),
       ('Studio 7', 'Intimate studio space for workshops and small performances.', '2025-08-05', '7 Creative Ln, Niš',
        'STUDIO', 9.64, 'turizam3.jpg'),
       ('Conference Center Delta', 'Modern conference center with multiple meeting rooms.', '2025-07-01',
        '45 Business Rd, Kragujevac', 'CONFERENCE_CENTER', 7.77, 'turizam4.jpg'),
       ('City Museum Auditorium', 'Auditorium inside the city museum, suitable for lectures and screenings.',
        '2025-06-12', 'Museum Sq 3, Subotica', 'MUSEUM', 8.91, 'turizam5.jpg'),
       ('Open Air Arena', 'Large outdoor arena for festivals and sporting events.', '2025-05-22', 'Arena Blvd, Čačak',
        'HALL', 8.12, 'turizam6.jpg');

SELECT *
FROM locations;

INSERT INTO events (name, address, type, date, price, recurrent, location_id, image_filename)
VALUES ('Tech Summit 2025', '12 Market St, Belgrade', 'CONFERENCE', '2026-11-10', 79.99, TRUE,
        (SELECT id FROM locations WHERE name = 'Grand Hall'), 'tech.jpeg'),
       ('Exit', 'Petrovaradin Fortress 2', 'FESTIVAL', '2029-11-10', 179.99, TRUE,
        (SELECT id FROM locations WHERE name = 'Grand Hall'), 'exit.jpeg'),
       ('Riverside Music Fest', 'Riverside Dr, Novi Sad', 'FESTIVAL', '2025-08-21', 0.00, TRUE,
        (SELECT id FROM locations WHERE name = 'Open Air Arena'), 'riverside.jpg'),
       ('Creative Workshop Series', '7 Creative Ln, Niš', 'WORKSHOP', '2025-09-05', 25.00, TRUE,
        (SELECT id FROM locations WHERE name = 'Studio 7'), 'creativeworkshop.jpg'),
       ('Business Leaders Forum', '45 Business Rd, Kragujevac', 'CONFERENCE', '2021-12-02', 119.00, FALSE,
        (SELECT id FROM locations WHERE name = 'Grand Hall'), 'buisniess.jpeg'),
       ('Museum Lecture Night', 'Museum Sq 3, Subotica', 'LECTURE', '2025-10-15', 12.50, FALSE,
        (SELECT id FROM locations WHERE name = 'City Museum Auditorium'), 'museum.jpg'),
       ('Summer Open Air Gala', 'Arena Blvd, Čačak', 'GALA', '2026-06-12', 39.50, TRUE,
        (SELECT id FROM locations WHERE name = 'Open Air Arena'), 'opengala.jpg');

SELECT *
FROM events;

SELECT *
FROM reviews;

SELECT *
FROM ratings;

INSERT INTO users_manages (managed_by_id, manages_id)
VALUES ((SELECT id FROM users WHERE email = 'aleksavelickovic555@gmail.com'),
        (SELECT id FROM locations WHERE name = 'Grand Hall')),
       ((SELECT id FROM users WHERE email = 'aleksavelickovic555@gmail.com'),
        (SELECT id FROM locations WHERE name = 'Open Air Arena')),
       ((SELECT id FROM users WHERE email = 'carol@example.com'),
        (SELECT id FROM locations WHERE name = 'Open Air Arena'));

SELECT *
FROM users_manages;

select *
from locations l
where l.id in (select manages_id from users_manages where managed_by_id = 1);