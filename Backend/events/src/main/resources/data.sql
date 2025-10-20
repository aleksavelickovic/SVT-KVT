INSERT INTO comments (id, text, created_at, replies_to_id)
VALUES ('4f2c8e7a-7b6b-41c4-932f-74a67d13e9e1', 'This is the first comment.', '2025-10-20T21:45:00', NULL),
       ('8bca5f14-9359-40f7-98f4-7a2d9e98b8cb', 'Really interesting topic!', '2025-10-20T21:47:12', NULL),
       ('f7a12b8e-44b9-4df0-8a19-0c6eeb0fd5d9', 'I totally agree with this.', '2025-10-20T21:50:05', NULL),
       ('c4f5d130-1ad4-4f4b-8471-b0a2eab7df1c', 'Thanks for sharing!', '2025-10-20T21:53:42', NULL),
       ('2e41d0b9-3a36-4bc8-8f43-bb4c3563d9c2', 'Great post, keep it up!', '2025-10-20T21:57:31', NULL);
SELECT *
FROM comments;

INSERT INTO users (username, address, birtday, city, created_at, email, name, password, phone_number)
VALUES ('pera', '123 Elm St, Apt 4', '1990-05-14', 'New York',
        '2025-10-20T22:10:00',
        'pera@gmail.com', 'Pera Peric', 'pera123', '+1-212-555-0143'),
       ('bob', '456 Oak Ave', '1985-11-03', 'San Francisco',
        '2025-10-20T22:12:30',
        'bob.smith@example.com', 'Bob Smith', '$2b$12$examplehash2', '+1-415-555-0198'),
       ('carol', '789 Pine Rd', '1995-07-21', 'Chicago', '2025-10-20T22:15:45',
        'carol@example.com', 'Carol Davis', '$2b$12$examplehash3', '+1-312-555-0177');

SELECT *
FROM users;