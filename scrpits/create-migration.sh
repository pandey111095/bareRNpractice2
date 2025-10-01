#!/bin/bash

# This script creates a new SQL migration file with a timestamp and a placeholder name.

# Define the migrations directory
MIGRATIONS_DIR="src/db/migrations"

# Ensure the migrations directory exists
mkdir -p "$MIGRATIONS_DIR"

# Generate a Unix timestamp for the filename
TIMESTAMP=$(date +%s)
FILENAME="${TIMESTAMP}_update_this_title.sql"
FILEPATH="$MIGRATIONS_DIR/$FILENAME"

# Create the SQL file with placeholder content
cat > "$FILEPATH" << EOL
-- -----------------------------------------------------------------------------
-- PLEASE RENAME THIS FILE AND UPDATE THE SCRIPT CONTENT.
--
-- Suggested Filename: ${TIMESTAMP}_your_migration_purpose.sql
--
-- Purpose:
--   A brief description of what this migration does.
--
-- -----------------------------------------------------------------------------

-- Your SQL statements go here.
EOL

echo "✅ Created migration file: $FILEPATH"
echo ""
echo "Next steps:"
echo "1. Rename the file to reflect its purpose (e.g., ${TIMESTAMP}_create_users_table.sql)."
echo "2. Add your SQL statements to the file."
echo "3. Register the new script in 'src/db/migrations/index.ts'."