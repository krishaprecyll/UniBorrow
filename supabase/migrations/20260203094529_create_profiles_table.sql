/*
  # Create User Profiles Table

  ## Overview
  This migration creates a profiles table to store additional user information beyond what's stored in Supabase's auth.users table.

  ## New Tables
  - `profiles`
    - `id` (uuid, primary key, references auth.users)
    - `name` (text, required) - User's full name
    - `email` (text, required, unique) - User's email address
    - `avatar` (text) - URL to user's avatar image
    - `rating` (numeric, default 5.0) - User's rating as a renter/lender
    - `verified` (boolean, default false) - Whether the user's identity is verified
    - `created_at` (timestamptz, default now()) - Account creation timestamp
    - `updated_at` (timestamptz, default now()) - Last profile update timestamp

  ## Security
  - Enable RLS on profiles table
  - Policy: Users can view all profiles (for marketplace browsing)
  - Policy: Users can only insert their own profile
  - Policy: Users can only update their own profile
  - Policy: Users can only delete their own profile

  ## Important Notes
  1. The id field references auth.users(id) to link profiles with authentication
  2. Email field is unique to prevent duplicate accounts
  3. Rating defaults to 5.0 for new users
  4. Verified defaults to false until admin verification
*/

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name text NOT NULL,
  email text UNIQUE NOT NULL,
  avatar text,
  rating numeric DEFAULT 5.0,
  verified boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Policy: Allow authenticated users to view all profiles
CREATE POLICY "Users can view all profiles"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (true);

-- Policy: Allow users to insert their own profile
CREATE POLICY "Users can insert own profile"
  ON profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Policy: Allow users to update their own profile
CREATE POLICY "Users can update own profile"
  ON profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Policy: Allow users to delete their own profile
CREATE POLICY "Users can delete own profile"
  ON profiles
  FOR DELETE
  TO authenticated
  USING (auth.uid() = id);

-- Create index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_profiles_email ON profiles(email);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update updated_at
DROP TRIGGER IF EXISTS update_profiles_updated_at ON profiles;
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
