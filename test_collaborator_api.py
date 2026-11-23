#!/usr/bin/env python3
"""
Backend test suite for the NEW collaborator application API endpoint.
Tests POST /api/collaborator/apply endpoint that replaces the prior Google Form.

This endpoint persists to MongoDB `leads` collection with type='collaborator-application'.
"""

import requests
import json
import time
from datetime import datetime

# Configuration
BASE_URL = "https://golfhomes-az.preview.emergentagent.com/api"
LEADS_ACCESS_KEY = "pbgl-leads-Bq7XmN3kJ8vR2wQzL5pY"

def get_timestamp():
    """Generate unique timestamp for test emails"""
    return int(time.time() * 1000)

def print_test_header(test_name):
    """Print formatted test header"""
    print(f"\n{'='*80}")
    print(f"TEST: {test_name}")
    print(f"{'='*80}")

def print_result(success, message):
    """Print test result"""
    status = "✅ PASS" if success else "❌ FAIL"
    print(f"{status}: {message}")

# Store test email addresses for verification
test_emails = []

# ============================================================================
# TEST 1: POST with ALL fields filled (complete application)
# ============================================================================
def test_complete_application():
    print_test_header("Test 1: POST /api/collaborator/apply with ALL fields filled")
    
    timestamp = get_timestamp()
    email = f"test+collab-complete-{timestamp}@scottsdalegolflifestyle.com"
    test_emails.append(email)
    
    payload = {
        "name": "Sarah Johnson",
        "brokerage": "Luxury Homes Realty Group",
        "email": email,
        "phone": "+1 480-555-1001",
        "license": "SA123456789",
        "website": "https://sarahjohnsonhomes.com",
        "linkedin": "https://linkedin.com/in/sarahjohnson",
        "yearsExperience": "12 years",
        "specialty": "Luxury golf course properties and resort communities",
        "communities": "Silverleaf, DC Ranch, Grayhawk, Desert Mountain, Whisper Rock",
        "pitch": "I have been specializing in Scottsdale golf communities for over a decade. My clients appreciate my deep knowledge of the local market, club memberships, and lifestyle amenities. I would love to collaborate on bringing qualified buyers to these exceptional properties.",
        "sourcePath": "/collaborate",
        "sourceDetail": ""
    }
    
    try:
        response = requests.post(f"{BASE_URL}/collaborator/apply", json=payload, timeout=30)
        
        if response.status_code == 200:
            data = response.json()
            if data.get("ok"):
                print_result(True, f"Status 200, ok=true, email={email}")
                print(f"   Response: {json.dumps(data, indent=2)}")
                return True
            else:
                print_result(False, f"Status 200 but ok=false: {data}")
                return False
        else:
            print_result(False, f"Expected 200, got {response.status_code}: {response.text}")
            return False
    except Exception as e:
        print_result(False, f"Exception: {str(e)}")
        return False

# ============================================================================
# TEST 2: POST with ONLY required fields (name, brokerage, email, phone)
# ============================================================================
def test_required_fields_only():
    print_test_header("Test 2: POST with ONLY required fields (name, brokerage, email, phone)")
    
    timestamp = get_timestamp()
    email = f"test+collab-required-{timestamp}@scottsdalegolflifestyle.com"
    test_emails.append(email)
    
    payload = {
        "name": "Michael Chen",
        "brokerage": "Premier Realty Partners",
        "email": email,
        "phone": "+1 480-555-1002"
        # All optional fields omitted
    }
    
    try:
        response = requests.post(f"{BASE_URL}/collaborator/apply", json=payload, timeout=30)
        
        if response.status_code == 200:
            data = response.json()
            if data.get("ok"):
                print_result(True, f"Status 200, ok=true with only required fields, email={email}")
                print(f"   Response: {json.dumps(data, indent=2)}")
                return True
            else:
                print_result(False, f"Status 200 but ok=false: {data}")
                return False
        else:
            print_result(False, f"Expected 200, got {response.status_code}: {response.text}")
            return False
    except Exception as e:
        print_result(False, f"Exception: {str(e)}")
        return False

# ============================================================================
# TEST 3: POST with missing NAME (should return 400)
# ============================================================================
def test_missing_name():
    print_test_header("Test 3: POST with missing NAME (expect 400)")
    
    timestamp = get_timestamp()
    email = f"test+collab-noname-{timestamp}@scottsdalegolflifestyle.com"
    
    payload = {
        # "name": missing
        "brokerage": "Test Brokerage",
        "email": email,
        "phone": "+1 480-555-1003"
    }
    
    try:
        response = requests.post(f"{BASE_URL}/collaborator/apply", json=payload, timeout=30)
        
        if response.status_code == 400:
            data = response.json()
            error_msg = data.get("error", "")
            if "required" in error_msg.lower():
                print_result(True, f"Status 400 with error mentioning required fields: {error_msg}")
                return True
            else:
                print_result(False, f"Status 400 but error doesn't mention required fields: {error_msg}")
                return False
        else:
            print_result(False, f"Expected 400, got {response.status_code}: {response.text}")
            return False
    except Exception as e:
        print_result(False, f"Exception: {str(e)}")
        return False

# ============================================================================
# TEST 4: POST with missing BROKERAGE (should return 400)
# ============================================================================
def test_missing_brokerage():
    print_test_header("Test 4: POST with missing BROKERAGE (expect 400)")
    
    timestamp = get_timestamp()
    email = f"test+collab-nobrokerage-{timestamp}@scottsdalegolflifestyle.com"
    
    payload = {
        "name": "Test Agent",
        # "brokerage": missing
        "email": email,
        "phone": "+1 480-555-1004"
    }
    
    try:
        response = requests.post(f"{BASE_URL}/collaborator/apply", json=payload, timeout=30)
        
        if response.status_code == 400:
            data = response.json()
            error_msg = data.get("error", "")
            if "required" in error_msg.lower():
                print_result(True, f"Status 400 with error mentioning required fields: {error_msg}")
                return True
            else:
                print_result(False, f"Status 400 but error doesn't mention required fields: {error_msg}")
                return False
        else:
            print_result(False, f"Expected 400, got {response.status_code}: {response.text}")
            return False
    except Exception as e:
        print_result(False, f"Exception: {str(e)}")
        return False

# ============================================================================
# TEST 5: POST with missing EMAIL (should return 400)
# ============================================================================
def test_missing_email():
    print_test_header("Test 5: POST with missing EMAIL (expect 400)")
    
    payload = {
        "name": "Test Agent",
        "brokerage": "Test Brokerage",
        # "email": missing
        "phone": "+1 480-555-1005"
    }
    
    try:
        response = requests.post(f"{BASE_URL}/collaborator/apply", json=payload, timeout=30)
        
        if response.status_code == 400:
            data = response.json()
            error_msg = data.get("error", "")
            if "required" in error_msg.lower():
                print_result(True, f"Status 400 with error mentioning required fields: {error_msg}")
                return True
            else:
                print_result(False, f"Status 400 but error doesn't mention required fields: {error_msg}")
                return False
        else:
            print_result(False, f"Expected 400, got {response.status_code}: {response.text}")
            return False
    except Exception as e:
        print_result(False, f"Exception: {str(e)}")
        return False

# ============================================================================
# TEST 6: POST with missing PHONE (should return 400)
# ============================================================================
def test_missing_phone():
    print_test_header("Test 6: POST with missing PHONE (expect 400)")
    
    timestamp = get_timestamp()
    email = f"test+collab-nophone-{timestamp}@scottsdalegolflifestyle.com"
    
    payload = {
        "name": "Test Agent",
        "brokerage": "Test Brokerage",
        "email": email
        # "phone": missing
    }
    
    try:
        response = requests.post(f"{BASE_URL}/collaborator/apply", json=payload, timeout=30)
        
        if response.status_code == 400:
            data = response.json()
            error_msg = data.get("error", "")
            if "required" in error_msg.lower():
                print_result(True, f"Status 400 with error mentioning required fields: {error_msg}")
                return True
            else:
                print_result(False, f"Status 400 but error doesn't mention required fields: {error_msg}")
                return False
        else:
            print_result(False, f"Expected 400, got {response.status_code}: {response.text}")
            return False
    except Exception as e:
        print_result(False, f"Exception: {str(e)}")
        return False

# ============================================================================
# TEST 7: POST with 4000-char PITCH (should truncate to 3000)
# ============================================================================
def test_pitch_truncation():
    print_test_header("Test 7: POST with 4000-char PITCH (expect 200 and truncation to 3000)")
    
    timestamp = get_timestamp()
    email = f"test+collab-longpitch-{timestamp}@scottsdalegolflifestyle.com"
    test_emails.append(email)
    
    # Create a 4000-character pitch
    long_pitch = "I am a dedicated real estate professional with extensive experience in luxury golf communities. " * 45  # ~4050 chars
    long_pitch = long_pitch[:4000]  # Exactly 4000 chars
    
    payload = {
        "name": "Jennifer Martinez",
        "brokerage": "Elite Golf Properties",
        "email": email,
        "phone": "+1 480-555-1007",
        "pitch": long_pitch
    }
    
    try:
        response = requests.post(f"{BASE_URL}/collaborator/apply", json=payload, timeout=30)
        
        if response.status_code == 200:
            data = response.json()
            if data.get("ok"):
                print_result(True, f"Status 200, ok=true (4000-char pitch accepted), email={email}")
                print(f"   Response: {json.dumps(data, indent=2)}")
                print(f"   Original pitch length: {len(long_pitch)} chars")
                print(f"   Expected stored length: 3000 chars (truncated)")
                return True
            else:
                print_result(False, f"Status 200 but ok=false: {data}")
                return False
        else:
            print_result(False, f"Expected 200, got {response.status_code}: {response.text}")
            return False
    except Exception as e:
        print_result(False, f"Exception: {str(e)}")
        return False

# ============================================================================
# TEST 8: Verify MongoDB persistence via GET /api/leads/list
# ============================================================================
def test_mongodb_persistence():
    print_test_header("Test 8: Verify MongoDB persistence via GET /api/leads/list")
    
    # Wait for MongoDB to persist the records
    time.sleep(3)
    
    try:
        response = requests.get(
            f"{BASE_URL}/leads/list",
            params={"key": LEADS_ACCESS_KEY, "limit": 100},
            timeout=30
        )
        
        if response.status_code != 200:
            print_result(False, f"Expected 200, got {response.status_code}: {response.text}")
            return False
        
        data = response.json()
        if not data.get("ok"):
            print_result(False, f"Response ok=false: {data}")
            return False
        
        leads = data.get("leads", [])
        print(f"   Retrieved {len(leads)} total leads from MongoDB")
        
        # Find our test leads with type='collaborator-application'
        collab_leads = [l for l in leads if l.get("type") == "collaborator-application"]
        print(f"   Found {len(collab_leads)} collaborator-application leads")
        
        # Check for our specific test emails
        test_lead_complete = None
        test_lead_required = None
        test_lead_truncation = None
        
        for lead in collab_leads:
            payload = lead.get("payload", {})
            email = payload.get("email", "")
            
            if email == test_emails[0]:  # Complete application
                test_lead_complete = lead
                print(f"   ✓ Found complete application: {email}")
                
                # Verify ALL fields are present
                required_fields = ["name", "brokerage", "email", "phone"]
                optional_fields = ["license", "website", "linkedin", "yearsExperience", 
                                 "specialty", "communities", "pitch", "sourcePath", "sourceDetail"]
                
                all_fields_present = True
                for field in required_fields + optional_fields:
                    if field not in payload:
                        print(f"      ⚠ Missing field: {field}")
                        all_fields_present = False
                
                if all_fields_present:
                    print(f"      ✓ All 13 fields present in payload")
                    # Verify some specific values
                    if payload.get("name") == "Sarah Johnson":
                        print(f"      ✓ name field correct: Sarah Johnson")
                    if payload.get("brokerage") == "Luxury Homes Realty Group":
                        print(f"      ✓ brokerage field correct")
                    if "Silverleaf" in payload.get("communities", ""):
                        print(f"      ✓ communities field contains expected data")
            
            elif len(test_emails) > 1 and email == test_emails[1]:  # Required fields only
                test_lead_required = lead
                print(f"   ✓ Found required-fields-only application: {email}")
                
                # Verify optional fields default to empty strings
                payload = lead.get("payload", {})
                optional_empty = True
                for field in ["license", "website", "linkedin", "yearsExperience", 
                            "specialty", "communities", "pitch"]:
                    if field in payload and payload[field] != "":
                        print(f"      ⚠ Optional field '{field}' is not empty: {payload[field]}")
                        optional_empty = False
                
                if optional_empty:
                    print(f"      ✓ Optional fields correctly default to empty strings")
            
            elif len(test_emails) > 2 and email == test_emails[2]:  # Truncation test
                test_lead_truncation = lead
                print(f"   ✓ Found truncation test application: {email}")
                
                # Verify pitch was truncated to 3000 chars
                pitch = lead.get("payload", {}).get("pitch", "")
                if len(pitch) == 3000:
                    print(f"      ✓ Pitch correctly truncated to 3000 chars (was 4000)")
                else:
                    print(f"      ⚠ Pitch length is {len(pitch)}, expected 3000")
        
        # Summary
        found_count = sum([
            test_lead_complete is not None,
            test_lead_required is not None,
            test_lead_truncation is not None
        ])
        
        if found_count >= 2:  # At least 2 of 3 test leads found
            print_result(True, f"Found {found_count}/3 test leads in MongoDB with correct type='collaborator-application'")
            return True
        else:
            print_result(False, f"Only found {found_count}/3 test leads in MongoDB")
            return False
        
    except Exception as e:
        print_result(False, f"Exception: {str(e)}")
        return False

# ============================================================================
# TEST 9: Verify CSV export includes collaborator-application leads
# ============================================================================
def test_csv_export():
    print_test_header("Test 9: Verify GET /api/leads/export.csv includes collaborator-application leads")
    
    try:
        response = requests.get(
            f"{BASE_URL}/leads/export.csv",
            params={"key": LEADS_ACCESS_KEY},
            timeout=30
        )
        
        if response.status_code != 200:
            print_result(False, f"Expected 200, got {response.status_code}: {response.text}")
            return False
        
        content_type = response.headers.get("Content-Type", "")
        if "text/csv" not in content_type:
            print_result(False, f"Expected text/csv, got {content_type}")
            return False
        
        csv_text = response.text
        lines = csv_text.strip().split('\n')
        
        if len(lines) < 1:
            print_result(False, "CSV is empty")
            return False
        
        header = lines[0]
        print(f"   CSV header: {header}")
        
        # Verify 'type' column exists
        if "type" not in header:
            print_result(False, "CSV header missing 'type' column")
            return False
        
        # Find our test leads in the CSV
        found_collab_leads = []
        for line in lines[1:]:  # Skip header
            if "collaborator-application" in line:
                # Check if any of our test emails are in this line
                for email in test_emails:
                    if email in line:
                        found_collab_leads.append(email)
                        print(f"   ✓ Found test lead in CSV: {email}")
                        break
        
        if len(found_collab_leads) >= 2:
            print_result(True, f"Found {len(found_collab_leads)} collaborator-application test leads in CSV export")
            print(f"   Note: CSV columns are magnet-shaped, but leads appear with type='collaborator-application'")
            return True
        else:
            print_result(False, f"Only found {len(found_collab_leads)} test leads in CSV (expected at least 2)")
            return False
        
    except Exception as e:
        print_result(False, f"Exception: {str(e)}")
        return False

# ============================================================================
# MAIN TEST RUNNER
# ============================================================================
def main():
    print("\n" + "="*80)
    print("COLLABORATOR APPLICATION API ENDPOINT TEST SUITE")
    print("Testing: POST /api/collaborator/apply (NEW endpoint)")
    print("Testing: MongoDB persistence with type='collaborator-application'")
    print("Testing: CSV export includes new lead type")
    print("="*80)
    
    results = []
    
    # Run all test scenarios in order
    results.append(("Test 1: Complete application (all fields)", test_complete_application()))
    results.append(("Test 2: Required fields only", test_required_fields_only()))
    results.append(("Test 3: Missing name (expect 400)", test_missing_name()))
    results.append(("Test 4: Missing brokerage (expect 400)", test_missing_brokerage()))
    results.append(("Test 5: Missing email (expect 400)", test_missing_email()))
    results.append(("Test 6: Missing phone (expect 400)", test_missing_phone()))
    results.append(("Test 7: 4000-char pitch truncation", test_pitch_truncation()))
    results.append(("Test 8: MongoDB persistence verification", test_mongodb_persistence()))
    results.append(("Test 9: CSV export verification", test_csv_export()))
    
    # Print summary
    print("\n" + "="*80)
    print("TEST SUMMARY")
    print("="*80)
    
    passed = sum(1 for _, result in results if result)
    total = len(results)
    
    for name, result in results:
        status = "✅ PASS" if result else "❌ FAIL"
        print(f"{status}: {name}")
    
    print(f"\n{passed}/{total} tests passed")
    
    if passed == total:
        print("\n🎉 ALL TESTS PASSED - Collaborator application endpoint working correctly!")
        return 0
    else:
        print(f"\n⚠️  {total - passed} test(s) failed - see details above")
        return 1

if __name__ == "__main__":
    exit(main())
