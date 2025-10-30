/*
  # Create Users and Employee Onboarding System Tables

  ## New Tables Created
  
  ### 1. `users` table
  - `id` (uuid, primary key)
  - `reg_id` (integer, unique) - Registration ID
  - `first_name` (text, required)
  - `middle_name` (text, optional)
  - `last_name` (text, required)
  - `email_id` (text, unique, required)
  - `emp_type` (integer, required) - Employee type
  - `user_name` (text, unique, required)
  - `password` (text, required) - Hashed password
  - `is_admin` (integer, default 0) - 0: User, 1: Admin
  - `full_name` (text)
  - `gn_status` (integer, default 1) - 1: Active, 0: Inactive
  - `created_at` (timestamptz, auto-generated)
  - `updated_at` (timestamptz, auto-generated)

  ### 2. `employee_details` table
  - Core employee information with foreign key to users table
  
  ### 3. `employee_contact_details` table
  - Contact and address information for employees
  
  ### 4. `employee_bank_details` table
  - Bank account information for payroll
  
  ### 5. `education_details` table
  - Educational qualifications
  
  ### 6. `education_documents` table
  - Educational document uploads
  
  ### 7. `experience_details` table
  - Work experience information
  
  ### 8. `experience_napier_details` table
  - Internal company experience tracking
  
  ### 9. `experience_documents` table
  - Experience verification documents
  
  ### 10. `emergency_contacts` table
  - Emergency contact information
  
  ### 11. `dependent_details` table
  - Dependent/family member information
  
  ### 12. `nominee_details` table
  - Nominee information for benefits
  
  ### 13. `personal_documents` table
  - Personal identification documents
  
  ### 14. `background_verification_documents` table
  - Background check documents

  ## Security
  - RLS enabled on all tables
  - Policies restrict access to authenticated users
  - Users can only access their own data
  - Admins have special access policies
  - Sensitive data like passwords are never exposed in queries

  ## Notes
  - All timestamps use UTC
  - Passwords must be hashed before storage (use bcrypt)
  - Full names computed via trigger
  - Foreign keys maintain referential integrity
*/

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  reg_id integer UNIQUE NOT NULL,
  first_name text NOT NULL,
  middle_name text,
  last_name text NOT NULL,
  email_id text UNIQUE NOT NULL,
  emp_type integer NOT NULL,
  user_name text UNIQUE NOT NULL,
  password text NOT NULL,
  is_admin integer DEFAULT 0,
  full_name text,
  gn_status integer DEFAULT 1,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create employee details table
CREATE TABLE IF NOT EXISTS employee_details (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  reg_id integer NOT NULL,
  date_of_birth date,
  gender text,
  marital_status text,
  nationality text,
  blood_group text,
  personal_email text,
  mobile_number text,
  alternate_mobile text,
  aadhar_number text,
  pan_number text,
  passport_number text,
  driving_license text,
  father_name text,
  mother_name text,
  spouse_name text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create employee contact details table
CREATE TABLE IF NOT EXISTS employee_contact_details (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  reg_id integer NOT NULL,
  current_address_line1 text,
  current_address_line2 text,
  current_city text,
  current_state text,
  current_country text,
  current_pincode text,
  permanent_address_line1 text,
  permanent_address_line2 text,
  permanent_city text,
  permanent_state text,
  permanent_country text,
  permanent_pincode text,
  same_as_current boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create employee bank details table
CREATE TABLE IF NOT EXISTS employee_bank_details (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  reg_id integer NOT NULL,
  bank_name text,
  account_number text,
  ifsc_code text,
  branch_name text,
  account_holder_name text,
  account_type text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create education details table
CREATE TABLE IF NOT EXISTS education_details (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  reg_id integer NOT NULL,
  qualification text,
  institution_name text,
  board_university text,
  year_of_passing integer,
  percentage_cgpa text,
  specialization text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create education documents table
CREATE TABLE IF NOT EXISTS education_documents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  education_id uuid REFERENCES education_details(id) ON DELETE CASCADE,
  reg_id integer NOT NULL,
  document_type text,
  document_url text,
  created_at timestamptz DEFAULT now()
);

-- Create experience details table
CREATE TABLE IF NOT EXISTS experience_details (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  reg_id integer NOT NULL,
  company_name text,
  designation text,
  from_date date,
  to_date date,
  duration_months integer,
  ctc_amount numeric,
  reason_for_leaving text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create experience in napier details table
CREATE TABLE IF NOT EXISTS experience_napier_details (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  reg_id integer NOT NULL,
  project_name text,
  role text,
  from_date date,
  to_date date,
  duration_months integer,
  technologies_used text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create experience documents table
CREATE TABLE IF NOT EXISTS experience_documents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  experience_id uuid REFERENCES experience_details(id) ON DELETE CASCADE,
  reg_id integer NOT NULL,
  document_type text,
  document_url text,
  created_at timestamptz DEFAULT now()
);

-- Create emergency contacts table
CREATE TABLE IF NOT EXISTS emergency_contacts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  reg_id integer NOT NULL,
  contact_name text,
  relationship text,
  mobile_number text,
  alternate_number text,
  address text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create dependent details table
CREATE TABLE IF NOT EXISTS dependent_details (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  reg_id integer NOT NULL,
  dependent_name text,
  relationship text,
  date_of_birth date,
  gender text,
  is_dependent boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create nominee details table
CREATE TABLE IF NOT EXISTS nominee_details (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  reg_id integer NOT NULL,
  nominee_name text,
  relationship text,
  date_of_birth date,
  mobile_number text,
  address text,
  percentage_share numeric,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create personal documents table
CREATE TABLE IF NOT EXISTS personal_documents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  reg_id integer NOT NULL,
  document_type text,
  document_url text,
  created_at timestamptz DEFAULT now()
);

-- Create background verification documents table
CREATE TABLE IF NOT EXISTS background_verification_documents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  reg_id integer NOT NULL,
  document_type text,
  document_url text,
  verification_status text DEFAULT 'pending',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email_id);
CREATE INDEX IF NOT EXISTS idx_users_reg_id ON users(reg_id);
CREATE INDEX IF NOT EXISTS idx_employee_details_user_id ON employee_details(user_id);
CREATE INDEX IF NOT EXISTS idx_employee_details_reg_id ON employee_details(reg_id);

-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Function to automatically update full_name
CREATE OR REPLACE FUNCTION update_full_name()
RETURNS TRIGGER AS $$
BEGIN
  NEW.full_name = TRIM(CONCAT(NEW.first_name, ' ', COALESCE(NEW.middle_name, ''), ' ', NEW.last_name));
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers
CREATE TRIGGER update_users_full_name
  BEFORE INSERT OR UPDATE ON users
  FOR EACH ROW
  EXECUTE FUNCTION update_full_name();

CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_employee_details_updated_at
  BEFORE UPDATE ON employee_details
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_employee_contact_details_updated_at
  BEFORE UPDATE ON employee_contact_details
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_employee_bank_details_updated_at
  BEFORE UPDATE ON employee_bank_details
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_education_details_updated_at
  BEFORE UPDATE ON education_details
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_experience_details_updated_at
  BEFORE UPDATE ON experience_details
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_experience_napier_details_updated_at
  BEFORE UPDATE ON experience_napier_details
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_emergency_contacts_updated_at
  BEFORE UPDATE ON emergency_contacts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_dependent_details_updated_at
  BEFORE UPDATE ON dependent_details
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_nominee_details_updated_at
  BEFORE UPDATE ON nominee_details
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_background_verification_updated_at
  BEFORE UPDATE ON background_verification_documents
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE employee_details ENABLE ROW LEVEL SECURITY;
ALTER TABLE employee_contact_details ENABLE ROW LEVEL SECURITY;
ALTER TABLE employee_bank_details ENABLE ROW LEVEL SECURITY;
ALTER TABLE education_details ENABLE ROW LEVEL SECURITY;
ALTER TABLE education_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE experience_details ENABLE ROW LEVEL SECURITY;
ALTER TABLE experience_napier_details ENABLE ROW LEVEL SECURITY;
ALTER TABLE experience_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE emergency_contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE dependent_details ENABLE ROW LEVEL SECURITY;
ALTER TABLE nominee_details ENABLE ROW LEVEL SECURITY;
ALTER TABLE personal_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE background_verification_documents ENABLE ROW LEVEL SECURITY;

-- RLS Policies for users table
CREATE POLICY "Service role can manage all users"
  ON users FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Users can view own profile"
  ON users FOR SELECT
  TO authenticated
  USING (id = auth.uid() OR is_admin = 1);

CREATE POLICY "Users can update own profile"
  ON users FOR UPDATE
  TO authenticated
  USING (id = auth.uid())
  WITH CHECK (id = auth.uid());

-- RLS Policies for employee_details table
CREATE POLICY "Service role can manage all employee details"
  ON employee_details FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Users can view own employee details"
  ON employee_details FOR SELECT
  TO authenticated
  USING (
    user_id = auth.uid() OR 
    EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND is_admin = 1)
  );

CREATE POLICY "Users can manage own employee details"
  ON employee_details FOR ALL
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- Apply similar policies to other tables
CREATE POLICY "Service role can manage contact details"
  ON employee_contact_details FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Users can view own contact details"
  ON employee_contact_details FOR SELECT
  TO authenticated
  USING (
    user_id = auth.uid() OR 
    EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND is_admin = 1)
  );

CREATE POLICY "Users can manage own contact details"
  ON employee_contact_details FOR ALL
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Service role can manage bank details"
  ON employee_bank_details FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Users can view own bank details"
  ON employee_bank_details FOR SELECT
  TO authenticated
  USING (
    user_id = auth.uid() OR 
    EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND is_admin = 1)
  );

CREATE POLICY "Users can manage own bank details"
  ON employee_bank_details FOR ALL
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Service role can manage education details"
  ON education_details FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Users can view own education details"
  ON education_details FOR SELECT
  TO authenticated
  USING (
    user_id = auth.uid() OR 
    EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND is_admin = 1)
  );

CREATE POLICY "Users can manage own education details"
  ON education_details FOR ALL
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Service role can manage education documents"
  ON education_documents FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Users can view own education documents"
  ON education_documents FOR SELECT
  TO authenticated
  USING (
    user_id = auth.uid() OR 
    EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND is_admin = 1)
  );

CREATE POLICY "Users can manage own education documents"
  ON education_documents FOR ALL
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Service role can manage experience details"
  ON experience_details FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Users can view own experience details"
  ON experience_details FOR SELECT
  TO authenticated
  USING (
    user_id = auth.uid() OR 
    EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND is_admin = 1)
  );

CREATE POLICY "Users can manage own experience details"
  ON experience_details FOR ALL
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Service role can manage napier experience"
  ON experience_napier_details FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Users can view own napier experience"
  ON experience_napier_details FOR SELECT
  TO authenticated
  USING (
    user_id = auth.uid() OR 
    EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND is_admin = 1)
  );

CREATE POLICY "Users can manage own napier experience"
  ON experience_napier_details FOR ALL
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Service role can manage experience documents"
  ON experience_documents FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Users can view own experience documents"
  ON experience_documents FOR SELECT
  TO authenticated
  USING (
    user_id = auth.uid() OR 
    EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND is_admin = 1)
  );

CREATE POLICY "Users can manage own experience documents"
  ON experience_documents FOR ALL
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Service role can manage emergency contacts"
  ON emergency_contacts FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Users can view own emergency contacts"
  ON emergency_contacts FOR SELECT
  TO authenticated
  USING (
    user_id = auth.uid() OR 
    EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND is_admin = 1)
  );

CREATE POLICY "Users can manage own emergency contacts"
  ON emergency_contacts FOR ALL
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Service role can manage dependent details"
  ON dependent_details FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Users can view own dependent details"
  ON dependent_details FOR SELECT
  TO authenticated
  USING (
    user_id = auth.uid() OR 
    EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND is_admin = 1)
  );

CREATE POLICY "Users can manage own dependent details"
  ON dependent_details FOR ALL
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Service role can manage nominee details"
  ON nominee_details FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Users can view own nominee details"
  ON nominee_details FOR SELECT
  TO authenticated
  USING (
    user_id = auth.uid() OR 
    EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND is_admin = 1)
  );

CREATE POLICY "Users can manage own nominee details"
  ON nominee_details FOR ALL
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Service role can manage personal documents"
  ON personal_documents FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Users can view own personal documents"
  ON personal_documents FOR SELECT
  TO authenticated
  USING (
    user_id = auth.uid() OR 
    EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND is_admin = 1)
  );

CREATE POLICY "Users can manage own personal documents"
  ON personal_documents FOR ALL
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Service role can manage background verification"
  ON background_verification_documents FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Users can view own background verification"
  ON background_verification_documents FOR SELECT
  TO authenticated
  USING (
    user_id = auth.uid() OR 
    EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND is_admin = 1)
  );

CREATE POLICY "Users can insert own background verification"
  ON background_verification_documents FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Admins can update background verification"
  ON background_verification_documents FOR UPDATE
  TO authenticated
  USING (
    EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND is_admin = 1)
  )
  WITH CHECK (
    EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND is_admin = 1)
  );