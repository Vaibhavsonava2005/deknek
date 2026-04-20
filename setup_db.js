// Setup script to run SQL schema against Supabase
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'YOUR_SUPABASE_URL';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'YOUR_SUPABASE_ANON_KEY';

const supabase = createClient(supabaseUrl, supabaseKey);

async function testConnection() {
  console.log('Testing Supabase connection...');
  
  // Try to access the contacts table
  const { data, error } = await supabase.from('contacts').select('*').limit(1);
  
  if (error) {
    console.log('Contacts table status:', error.message);
    console.log('(This is expected if the table does not exist yet)');
    console.log('');
    console.log('Please run the schema.sql file in the Supabase SQL Editor:');
    console.log('1. Go to https://supabase.com/dashboard');
    console.log('2. Select your project');
    console.log('3. Go to SQL Editor');
    console.log('4. Paste the contents of schema.sql');
    console.log('5. Click Run');
  } else {
    console.log('✓ Contacts table exists and is accessible');
  }

  // Test profiles table
  const { error: profileError } = await supabase.from('profiles').select('*').limit(1);
  
  if (profileError) {
    console.log('Profiles table status:', profileError.message);
  } else {
    console.log('✓ Profiles table exists and is accessible');
  }
}

testConnection().catch(console.error);
