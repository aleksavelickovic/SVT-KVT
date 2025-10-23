INSERT INTO comments (text, created_at, replies_to_id)
VALUES ('This is the first comment.', '2025-10-20T21:45:00', NULL),
       ('Really interesting topic!', '2025-10-20T21:47:12', NULL),
       ('I totally agree with this.', '2025-10-20T21:50:05', NULL),
       ('Thanks for sharing!', '2025-10-20T21:53:42', NULL),
       ('Great post, keep it up!', '2025-10-20T21:57:31', NULL);
SELECT *
FROM comments;

INSERT INTO users (dtype, address, birthday, city, created_at, email, name, password, phone_number)
VALUES ('ROLE_ADMINISTRATOR', '123 Elm St, Apt 4', '1990-05-14', 'New York',
        '2025-10-20T22:10:00',
        'pera@gmail.com', 'Pera Peric', '$2a$08$jUkWGc23Y6Qkl69ikbmjC.0vRSEi6JeecB7unU4ajap4KX.O2dlJm',
        '+1-212-555-0143'),
       ('ROLE_USER', '456 Oak Ave', '1985-11-03', 'San Francisco',
        '2025-10-20T22:12:30',
        'bob.smith@example.com', 'Bob Smith', '$2a$08$yJLVcWzRTvqfuluvWPhWaescscSqCw9Hdb2cJ9rTvPPpDHWcZ965m',
        '+1-415-555-0198'),
       ('ROLE_USER', '789 Pine Rd', '1995-07-21', 'Chicago', '2025-10-20T22:15:45',
        'carol@example.com', 'Carol Davis', '$2a$08$g9zvrs9lj8662SD4t53RZ.FGhh9fPl/RN10hvEGhJ1kf1uCj7dmKW',
        '+1-312-555-0177');

SELECT *
FROM users;

select *
from users
where dtype = 'ROLE_ADMINISTRATOR';

INSERT INTO account_requests (address, created_at, password, rejection_reason, status, email)
VALUES ('321 Maple St, Apt 5', '2025-10-20', '$2a$08$vnTIORF4zzdONivQjYKZZ.WcfyuaU/FROGVbwIoNgiu38VMvgpLjO',
        NULL, 'PENDING', 'maple@example.com'),
       ('654 Cedar Ave', '2025-10-20', '$2a$08$YzA2345678901bcdefghIJKLMNOpqrstuvWXyzABCD1234567890abc',
        'Incomplete documentation', 'REJECTED', 'documentation@example.com'),
       ('987 Birch Rd', '2025-10-20', '$2a$08$ZaB3456789012cdefghiJKLMNOpqrstuvWXyzABCD1234567890abcd', NULL,
        'ACCEPTED', 'birch@example.com');

SELECT *
FROM account_requests;

INSERT INTO locations (name, description, created_at, address, type, total_rating)
VALUES ('Grand Hall', 'Large indoor venue suited for conferences and concerts.', '2025-10-20', '12 Market St, Belgrade',
        'HALL', 5.47),
       ('Riverside Park', 'Open-air park with stage and seating for community events.', '2025-09-15',
        'Riverside Dr, Novi Sad', 'OUTDOOR', 3.20),
       ('Studio 7', 'Intimate studio space for workshops and small performances.', '2025-08-05', '7 Creative Ln, Niš',
        'STUDIO', 9.64),
       ('Conference Center Delta', 'Modern conference center with multiple meeting rooms.', '2025-07-01',
        '45 Business Rd, Kragujevac', 'CONFERENCE_CENTER', 7.77),
       ('City Museum Auditorium', 'Auditorium inside the city museum, suitable for lectures and screenings.',
        '2025-06-12', 'Museum Sq 3, Subotica', 'MUSEUM', 8.91),
       ('Open Air Arena', 'Large outdoor arena for festivals and sporting events.', '2025-05-22', 'Arena Blvd, Čačak',
        'HALL', 8.12);

SELECT *
FROM locations;

-- inserts for events referencing locations by name
INSERT INTO events (name, address, type, date, price, recurrent, location_id)
VALUES ('Tech Summit 2025', '12 Market St, Belgrade', 'CONFERENCE', '2025-11-10', 79.99, FALSE,
        (SELECT id FROM locations WHERE name = 'Grand Hall')),
       ('Riverside Music Fest', 'Riverside Dr, Novi Sad', 'FESTIVAL', '2025-08-21', 0.00, TRUE,
        (SELECT id FROM locations WHERE name = 'Riverside Park')),
       ('Creative Workshop Series', '7 Creative Ln, Niš', 'WORKSHOP', '2025-09-05', 25.00, TRUE,
        (SELECT id FROM locations WHERE name = 'Studio 7')),
       ('Business Leaders Forum', '45 Business Rd, Kragujevac', 'CONFERENCE', '2025-12-02', 119.00, FALSE,
        (SELECT id FROM locations WHERE name = 'Conference Center Delta')),
       ('Museum Lecture Night', 'Museum Sq 3, Subotica', 'LECTURE', '2025-10-15', 12.50, FALSE,
        (SELECT id FROM locations WHERE name = 'City Museum Auditorium')),
       ('Summer Open Air Gala', 'Arena Blvd, Čačak', 'GALA', '2026-06-12', 39.50, TRUE,
        (SELECT id FROM locations WHERE name = 'Grand Hall'));

SELECT *
FROM events;

SELECT *
FROM reviews;

SELECT *
FROM ratings