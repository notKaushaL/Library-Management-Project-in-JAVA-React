-- Insert sample books
INSERT INTO BOOK (title, author, isbn, available) VALUES
('The Great Gatsby', 'F. Scott Fitzgerald', '978-0743273565', true),
('To Kill a Mockingbird', 'Harper Lee', '978-0446310789', true),
('1984', 'George Orwell', '978-0451524935', true),
('Pride and Prejudice', 'Jane Austen', '978-0141439518', true),
('The Catcher in the Rye', 'J.D. Salinger', '978-0316769488', true);

-- Insert sample users
INSERT INTO LIBRARY_USER (name, email) VALUES
('John Doe', 'john.doe@example.com'),
('Jane Smith', 'jane.smith@example.com'),
('Bob Wilson', 'bob.wilson@example.com'),
('Alice Johnson', 'alice.johnson@example.com'),
('Charlie Brown', 'charlie.brown@example.com');

-- Insert sample borrow records
INSERT INTO BORROW_RECORD (user_id, book_id, borrow_date, return_date) VALUES
(1, 2, CURRENT_TIMESTAMP(), NULL),
(2, 3, CURRENT_TIMESTAMP(), NULL),
(3, 1, CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP()); 