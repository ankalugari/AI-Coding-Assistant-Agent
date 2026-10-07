CREATE DATABASE IF NOT EXISTS codementor;

USE codementor;

CREATE TABLE IF NOT EXISTS users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE IF NOT EXISTS coding_problems (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    difficulty ENUM('Easy', 'Medium', 'Hard') DEFAULT 'Easy',
    topic VARCHAR(100),
    solution TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);



CREATE TABLE IF NOT EXISTS conversations (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    title VARCHAR(200),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS messages (
    id INT PRIMARY KEY AUTO_INCREMENT,
    conversation_id INT NOT NULL,
    role ENUM('user', 'assistant') NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (conversation_id)
        REFERENCES conversations(id)
        ON DELETE CASCADE
);


CREATE TABLE IF NOT EXISTS code_submissions (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    problem_id INT,
    language VARCHAR(50) NOT NULL,
    code TEXT NOT NULL,
    status ENUM('pending', 'solved', 'failed') DEFAULT 'pending',
    error_message TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE,

    FOREIGN KEY (problem_id)
        REFERENCES coding_problems(id)
        ON DELETE SET NULL
);



CREATE TABLE IF NOT EXISTS code_reviews (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    submission_id INT,
    language VARCHAR(50),
    code TEXT,
    review TEXT,
    score INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE,

    FOREIGN KEY (submission_id)
        REFERENCES code_submissions(id)
        ON DELETE SET NULL
);


CREATE TABLE IF NOT EXISTS user_memory (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    memory_type VARCHAR(100) NOT NULL,
    memory_key VARCHAR(100) NOT NULL,
    memory_value TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    UNIQUE KEY unique_user_memory
        (user_id, memory_type, memory_key),

    FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
);


CREATE TABLE IF NOT EXISTS learning_progress (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    topic VARCHAR(100) NOT NULL,
    problems_attempted INT DEFAULT 0,
    problems_solved INT DEFAULT 0,
    accuracy DECIMAL(5,2) DEFAULT 0.00,
    level VARCHAR(50) DEFAULT 'Beginner',
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    UNIQUE KEY unique_user_topic
        (user_id, topic),

    FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
);


CREATE TABLE IF NOT EXISTS knowledge_documents (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    topic VARCHAR(100),
    source VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);



INSERT INTO coding_problems
(title, description, difficulty, topic)
VALUES

(
    'Two Sum',
    'Given an array of integers and a target value, find two numbers whose sum equals the target.',
    'Easy',
    'Arrays'
),

(
    'Reverse String',
    'Write a program to reverse a given string.',
    'Easy',
    'Strings'
),

(
    'Binary Search',
    'Search for a target value in a sorted array using binary search.',
    'Medium',
    'Searching'
),

(
    'Valid Parentheses',
    'Check whether the brackets in a string are balanced.',
    'Easy',
    'Stack'
),

(
    'Merge Intervals',
    'Merge all overlapping intervals in a collection of intervals.',
    'Medium',
    'Arrays'
),

(
    'Longest Substring',
    'Find the length of the longest substring without repeating characters.',
    'Medium',
    'Strings'
);



INSERT INTO knowledge_documents
(title, content, topic, source)
VALUES

(
    'JavaScript Arrays',
    'An array is a data structure used to store multiple values in a single variable. Common operations include accessing elements, iterating through elements, adding elements and removing elements.',
    'Arrays',
    'CodeMentor Knowledge Base'
),

(
    'JavaScript Loops',
    'JavaScript provides for, while and do while loops. Loops are used when the same operation needs to be performed repeatedly.',
    'Loops',
    'CodeMentor Knowledge Base'
),

(
    'JavaScript Functions',
    'A function is a reusable block of code that performs a specific task. Functions can accept parameters and return values.',
    'Functions',
    'CodeMentor Knowledge Base'
),

(
    'Time Complexity',
    'Time complexity describes how the running time of an algorithm grows as the input size increases. Common complexities include O(1), O(log n), O(n), O(n log n) and O(n²).',
    'Algorithms',
    'CodeMentor Knowledge Base'
),

(
    'Debugging JavaScript',
    'Common JavaScript errors include TypeError, ReferenceError and SyntaxError. Reading the error message and identifying the line causing the problem are important debugging steps.',
    'Debugging',
    'CodeMentor Knowledge Base'
),

(
    'React Hooks',
    'React Hooks allow functional components to use state and other React features. Common hooks include useState and useEffect.',
    'React',
    'CodeMentor Knowledge Base'
);