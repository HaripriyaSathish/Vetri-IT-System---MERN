// All tables are created with IF NOT EXISTS on server start (see config/db.js).
// Flexible section content lives in JSON columns so every section stays dynamic.
export const schema = [
  `CREATE TABLE IF NOT EXISTS admins (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(80) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    display_name VARCHAR(120),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  )`,

  // key/value site settings: 'site' (logo, contact, socials, footer)
  `CREATE TABLE IF NOT EXISTS settings (
    setting_key VARCHAR(80) PRIMARY KEY,
    value JSON,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  )`,

  // SEO meta per page
  `CREATE TABLE IF NOT EXISTS pages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    slug VARCHAR(100) NOT NULL UNIQUE,
    name VARCHAR(150) NOT NULL,
    meta_title VARCHAR(255),
    meta_description VARCHAR(500),
    meta_keywords VARCHAR(500),
    og_image JSON,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  )`,

  // One row per page section; content shape depends on section_key
  `CREATE TABLE IF NOT EXISTS sections (
    id INT AUTO_INCREMENT PRIMARY KEY,
    page_slug VARCHAR(100) NOT NULL,
    section_key VARCHAR(80) NOT NULL,
    label VARCHAR(150) NOT NULL,
    content JSON,
    sort_order INT DEFAULT 0,
    is_active TINYINT(1) DEFAULT 1,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE KEY uq_page_section (page_slug, section_key)
  )`,

  `CREATE TABLE IF NOT EXISTS services (
    id INT AUTO_INCREMENT PRIMARY KEY,
    slug VARCHAR(120) NOT NULL UNIQUE,
    title VARCHAR(200) NOT NULL,
    nav_label VARCHAR(120),
    nav_icon VARCHAR(60),
    badge VARCHAR(120),
    flow VARCHAR(400),
    description TEXT,
    image JSON,
    link VARCHAR(300),
    link_title VARCHAR(200),
    sort_order INT DEFAULT 0,
    is_active TINYINT(1) DEFAULT 1,
    show_on_home TINYINT(1) DEFAULT 1
  )`,

  // Vetri products (Billing, Project Management, HRMS)
  `CREATE TABLE IF NOT EXISTS solutions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    slug VARCHAR(120) NOT NULL UNIQUE,
    tab_label VARCHAR(120) NOT NULL,
    badge VARCHAR(150),
    title VARCHAR(200) NOT NULL,
    subtitle VARCHAR(300),
    description TEXT,
    features JSON,
    stats JSON,
    image JSON,
    live_label VARCHAR(200),
    button_text VARCHAR(120),
    button_link VARCHAR(300),
    sort_order INT DEFAULT 0,
    is_active TINYINT(1) DEFAULT 1
  )`,

  `CREATE TABLE IF NOT EXISTS enquiries (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    email VARCHAR(150),
    phone VARCHAR(30) NOT NULL,
    service VARCHAR(150),
    message TEXT,
    source VARCHAR(100),
    status ENUM('new','contacted','closed') DEFAULT 'new',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )`,

  // Media library: files in server/media (url = /media/...)
  `CREATE TABLE IF NOT EXISTS media (
    id INT AUTO_INCREMENT PRIMARY KEY,
    url VARCHAR(600) NOT NULL,
    public_id VARCHAR(255) NOT NULL,
    resource_type VARCHAR(20) DEFAULT 'image',
    format VARCHAR(20),
    width INT,
    height INT,
    bytes INT,
    original_name VARCHAR(255),
    alt VARCHAR(300),
    mime VARCHAR(120),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )`,

  // File bytes of admin uploads, stored in 8MB pieces so uploads survive hosts with a
  // temporary disk (e.g. Render): a missing file is rebuilt from here on first request.
  `CREATE TABLE IF NOT EXISTS media_chunks (
    media_id INT NOT NULL,
    seq INT NOT NULL,
    data MEDIUMBLOB NOT NULL,
    PRIMARY KEY (media_id, seq),
    FOREIGN KEY (media_id) REFERENCES media(id) ON DELETE CASCADE
  )`,
];

// Columns added after the first release (CREATE TABLE IF NOT EXISTS does not add them to old tables)
export const columnMigrations = [
  { table: 'media', column: 'mime', ddl: 'ALTER TABLE media ADD COLUMN mime VARCHAR(120) AFTER alt' },
  { table: 'services', column: 'nav_icon', ddl: 'ALTER TABLE services ADD COLUMN nav_icon VARCHAR(60) AFTER nav_label' },
  { table: 'services', column: 'show_on_home', ddl: 'ALTER TABLE services ADD COLUMN show_on_home TINYINT(1) DEFAULT 1 AFTER is_active' },
];
