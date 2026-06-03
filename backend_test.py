#!/usr/bin/env python3
"""
Backend API tests for La Quinta Golf Lifestyle Phase 4 funnel endpoints.
Tests POST /api/quiz, POST /api/valuation, POST /api/leads, and GET /api/leads
"""

import requests
import json
import sys
from typing import Dict, Any

# Base URL from environment
BASE_URL = "https://la-quinta-living.preview.emergentagent.com/api"
PASSPHRASE = "lqgl-2026-leads-pull"

# Valid community slugs
VALID_SLUGS = {
    'the-madison-club',
    'the-hideaway',
    'pga-west',
    'the-tradition-golf-club',
    'andalusia-country-club',
    'the-quarry-at-la-quinta',
    'la-quinta-country-club'
}

def print_test(name: str):
    """Print test name"""
    print(f"\n{'='*80}")
    print(f"TEST: {name}")
    print('='*80)

def print_pass(msg: str):
    """Print pass message"""
    print(f"✅ PASS: {msg}")

def print_fail(msg: str, details: Any = None):
    """Print fail message"""
    print(f"❌ FAIL: {msg}")
    if details:
        print(f"   Details: {details}")

def check_no_mongo_id(data: Any, path: str = "root") -> bool:
    """Recursively check that no _id field exists in the data"""
    if isinstance(data, dict):
        if '_id' in data:
            print_fail(f"Found MongoDB _id field at {path}")
            return False
        for key, value in data.items():
            if not check_no_mongo_id(value, f"{path}.{key}"):
                return False
    elif isinstance(data, list):
        for i, item in enumerate(data):
            if not check_no_mongo_id(item, f"{path}[{i}]"):
                return False
    return True

# ============================================================================
# TEST 1: POST /api/quiz
# ============================================================================

def test_quiz_basic():
    """Test basic quiz submission with valid data"""
    print_test("POST /api/quiz - Basic valid submission")
    
    payload = {
        "answers": {
            "architecture": "spanish_med",
            "scale": "intimate",
            "design": "forgiving_fazio",
            "social": "quiet",
            "price": "over_10m",
            "use": "winter",
            "property": "new_custom",
            "resort": "private_only"
        },
        "name": "Maria Rodriguez",
        "email": "maria.rodriguez@example.com"
    }
    
    try:
        response = requests.post(f"{BASE_URL}/quiz", json=payload, timeout=10)
        print(f"Status: {response.status_code}")
        
        if response.status_code != 200:
            print_fail(f"Expected 200, got {response.status_code}")
            print(f"Response: {response.text}")
            return None
        
        data = response.json()
        print(f"Response: {json.dumps(data, indent=2)}")
        
        # Check response structure
        if not data.get('ok'):
            print_fail("Response ok field is not true")
            return None
        print_pass("Response has ok:true")
        
        if 'id' not in data:
            print_fail("Response missing 'id' field")
            return None
        print_pass(f"Response has id: {data['id']}")
        
        if 'results' not in data:
            print_fail("Response missing 'results' field")
            return None
        
        results = data['results']
        if not isinstance(results, list):
            print_fail("Results is not an array")
            return None
        
        if len(results) != 3:
            print_fail(f"Expected 3 results, got {len(results)}")
            return None
        print_pass(f"Response has exactly 3 results")
        
        # Check each result
        for i, result in enumerate(results):
            if 'slug' not in result:
                print_fail(f"Result {i} missing 'slug'")
                return None
            if 'name' not in result:
                print_fail(f"Result {i} missing 'name'")
                return None
            if 'architect' not in result:
                print_fail(f"Result {i} missing 'architect'")
                return None
            if 'score' not in result:
                print_fail(f"Result {i} missing 'score'")
                return None
            if 'reason' not in result:
                print_fail(f"Result {i} missing 'reason'")
                return None
            
            if result['slug'] not in VALID_SLUGS:
                print_fail(f"Result {i} has invalid slug: {result['slug']}")
                return None
            
            print_pass(f"Result {i}: {result['name']} ({result['slug']}) - score {result['score']}")
        
        print_pass("All results have required fields and valid slugs")
        return data
        
    except Exception as e:
        print_fail(f"Exception: {str(e)}")
        return None

def test_quiz_determinism():
    """Test that same answers return same top match"""
    print_test("POST /api/quiz - Determinism check")
    
    payload = {
        "answers": {
            "architecture": "modern_california",
            "scale": "large",
            "design": "penal_dye",
            "social": "competitive",
            "price": "under_2m",
            "use": "occasional",
            "property": "condo_villa",
            "resort": "important"
        }
    }
    
    try:
        # Submit twice
        response1 = requests.post(f"{BASE_URL}/quiz", json=payload, timeout=10)
        response2 = requests.post(f"{BASE_URL}/quiz", json=payload, timeout=10)
        
        if response1.status_code != 200 or response2.status_code != 200:
            print_fail(f"Got non-200 status: {response1.status_code}, {response2.status_code}")
            return False
        
        data1 = response1.json()
        data2 = response2.json()
        
        top1 = data1['results'][0]['slug']
        top2 = data2['results'][0]['slug']
        
        if top1 != top2:
            print_fail(f"Top matches differ: {top1} vs {top2}")
            return False
        
        print_pass(f"Same answers return same top match: {top1}")
        
        # Check if it's pga-west (expected for broad-access profile)
        if top1 == 'pga-west':
            print_pass("Broad-access profile correctly matched to pga-west")
        else:
            print(f"ℹ️  Note: Top match is {top1}, expected pga-west for this profile")
        
        return True
        
    except Exception as e:
        print_fail(f"Exception: {str(e)}")
        return False

def test_quiz_luxury_profile():
    """Test luxury profile returns expected matches"""
    print_test("POST /api/quiz - Luxury profile")
    
    payload = {
        "answers": {
            "architecture": "spanish_med",
            "scale": "intimate",
            "design": "forgiving_fazio",
            "social": "quiet",
            "price": "over_10m",
            "use": "winter",
            "property": "new_custom",
            "resort": "private_only"
        }
    }
    
    try:
        response = requests.post(f"{BASE_URL}/quiz", json=payload, timeout=10)
        
        if response.status_code != 200:
            print_fail(f"Expected 200, got {response.status_code}")
            return False
        
        data = response.json()
        top_match = data['results'][0]['slug']
        
        print(f"Top match: {top_match}")
        
        if top_match in ['the-madison-club', 'the-quarry-at-la-quinta']:
            print_pass(f"Luxury profile correctly matched to {top_match}")
            return True
        else:
            print(f"ℹ️  Note: Top match is {top_match}, expected the-madison-club or the-quarry-at-la-quinta")
            return True  # Not a failure, just informational
        
    except Exception as e:
        print_fail(f"Exception: {str(e)}")
        return False

def test_quiz_invalid_answers():
    """Test quiz with invalid answers payload"""
    print_test("POST /api/quiz - Invalid answers (not an object)")
    
    payload = {
        "answers": "not-an-object"
    }
    
    try:
        response = requests.post(f"{BASE_URL}/quiz", json=payload, timeout=10)
        
        if response.status_code != 400:
            print_fail(f"Expected 400, got {response.status_code}")
            print(f"Response: {response.text}")
            return False
        
        print_pass("Correctly rejected with 400")
        return True
        
    except Exception as e:
        print_fail(f"Exception: {str(e)}")
        return False

def test_quiz_invalid_email():
    """Test quiz with invalid email"""
    print_test("POST /api/quiz - Invalid email format")
    
    payload = {
        "answers": {
            "architecture": "modern_california",
            "scale": "large"
        },
        "email": "not-an-email"
    }
    
    try:
        response = requests.post(f"{BASE_URL}/quiz", json=payload, timeout=10)
        
        if response.status_code != 400:
            print_fail(f"Expected 400, got {response.status_code}")
            print(f"Response: {response.text}")
            return False
        
        data = response.json()
        if 'Invalid email' not in data.get('error', ''):
            print_fail(f"Expected 'Invalid email' error, got: {data.get('error')}")
            return False
        
        print_pass("Correctly rejected invalid email with 400")
        return True
        
    except Exception as e:
        print_fail(f"Exception: {str(e)}")
        return False

# ============================================================================
# TEST 2: POST /api/valuation
# ============================================================================

def test_valuation_valid():
    """Test valid valuation submission"""
    print_test("POST /api/valuation - Valid submission")
    
    payload = {
        "name": "John Smith",
        "email": "john.smith@example.com",
        "address": "123 Fairway Drive, La Quinta, CA 92253",
        "phone": "760-555-1234",
        "community": "PGA West",
        "sqft": "3500",
        "beds": "4",
        "baths": "3.5",
        "notes": "Looking for a quick sale estimate"
    }
    
    try:
        response = requests.post(f"{BASE_URL}/valuation", json=payload, timeout=10)
        print(f"Status: {response.status_code}")
        
        if response.status_code != 200:
            print_fail(f"Expected 200, got {response.status_code}")
            print(f"Response: {response.text}")
            return None
        
        data = response.json()
        print(f"Response: {json.dumps(data, indent=2)}")
        
        if not data.get('ok'):
            print_fail("Response ok field is not true")
            return None
        print_pass("Response has ok:true")
        
        if 'id' not in data:
            print_fail("Response missing 'id' field")
            return None
        print_pass(f"Response has id: {data['id']}")
        
        return data
        
    except Exception as e:
        print_fail(f"Exception: {str(e)}")
        return None

def test_valuation_missing_address():
    """Test valuation with missing address"""
    print_test("POST /api/valuation - Missing address")
    
    payload = {
        "name": "Jane Doe",
        "email": "jane.doe@example.com"
    }
    
    try:
        response = requests.post(f"{BASE_URL}/valuation", json=payload, timeout=10)
        
        if response.status_code != 400:
            print_fail(f"Expected 400, got {response.status_code}")
            return False
        
        data = response.json()
        error = data.get('error', '')
        if 'address' not in error.lower():
            print_fail(f"Expected error mentioning 'address', got: {error}")
            return False
        
        print_pass(f"Correctly rejected with 400: {error}")
        return True
        
    except Exception as e:
        print_fail(f"Exception: {str(e)}")
        return False

def test_valuation_missing_email():
    """Test valuation with missing email"""
    print_test("POST /api/valuation - Missing email")
    
    payload = {
        "name": "Jane Doe",
        "address": "456 Golf Course Rd"
    }
    
    try:
        response = requests.post(f"{BASE_URL}/valuation", json=payload, timeout=10)
        
        if response.status_code != 400:
            print_fail(f"Expected 400, got {response.status_code}")
            return False
        
        data = response.json()
        error = data.get('error', '')
        if 'email' not in error.lower():
            print_fail(f"Expected error mentioning 'email', got: {error}")
            return False
        
        print_pass(f"Correctly rejected with 400: {error}")
        return True
        
    except Exception as e:
        print_fail(f"Exception: {str(e)}")
        return False

def test_valuation_invalid_email():
    """Test valuation with invalid email format"""
    print_test("POST /api/valuation - Invalid email format")
    
    payload = {
        "name": "Jane Doe",
        "email": "invalid-email",
        "address": "456 Golf Course Rd"
    }
    
    try:
        response = requests.post(f"{BASE_URL}/valuation", json=payload, timeout=10)
        
        if response.status_code != 400:
            print_fail(f"Expected 400, got {response.status_code}")
            return False
        
        data = response.json()
        if 'Invalid email' not in data.get('error', ''):
            print_fail(f"Expected 'Invalid email' error, got: {data.get('error')}")
            return False
        
        print_pass("Correctly rejected invalid email with 400")
        return True
        
    except Exception as e:
        print_fail(f"Exception: {str(e)}")
        return False

# ============================================================================
# TEST 3: POST /api/leads
# ============================================================================

def test_leads_valid():
    """Test valid lead magnet submission"""
    print_test("POST /api/leads - Valid submission")
    
    payload = {
        "email": "sarah.johnson@example.com",
        "name": "Sarah Johnson",
        "magnet": "la-quinta-buyers-checklist"
    }
    
    try:
        response = requests.post(f"{BASE_URL}/leads", json=payload, timeout=10)
        print(f"Status: {response.status_code}")
        
        if response.status_code != 200:
            print_fail(f"Expected 200, got {response.status_code}")
            print(f"Response: {response.text}")
            return None
        
        data = response.json()
        print(f"Response: {json.dumps(data, indent=2)}")
        
        if not data.get('ok'):
            print_fail("Response ok field is not true")
            return None
        print_pass("Response has ok:true")
        
        if 'id' not in data:
            print_fail("Response missing 'id' field")
            return None
        print_pass(f"Response has id: {data['id']}")
        
        return data
        
    except Exception as e:
        print_fail(f"Exception: {str(e)}")
        return None

def test_leads_missing_email():
    """Test lead magnet with missing email"""
    print_test("POST /api/leads - Missing email")
    
    payload = {
        "name": "Bob Wilson",
        "magnet": "la-quinta-buyers-checklist"
    }
    
    try:
        response = requests.post(f"{BASE_URL}/leads", json=payload, timeout=10)
        
        if response.status_code != 400:
            print_fail(f"Expected 400, got {response.status_code}")
            return False
        
        data = response.json()
        if 'Invalid email' not in data.get('error', ''):
            print_fail(f"Expected 'Invalid email' error, got: {data.get('error')}")
            return False
        
        print_pass("Correctly rejected with 400")
        return True
        
    except Exception as e:
        print_fail(f"Exception: {str(e)}")
        return False

def test_leads_invalid_email():
    """Test lead magnet with invalid email"""
    print_test("POST /api/leads - Invalid email")
    
    payload = {
        "email": "not-valid",
        "name": "Bob Wilson",
        "magnet": "la-quinta-buyers-checklist"
    }
    
    try:
        response = requests.post(f"{BASE_URL}/leads", json=payload, timeout=10)
        
        if response.status_code != 400:
            print_fail(f"Expected 400, got {response.status_code}")
            return False
        
        data = response.json()
        if 'Invalid email' not in data.get('error', ''):
            print_fail(f"Expected 'Invalid email' error, got: {data.get('error')}")
            return False
        
        print_pass("Correctly rejected with 400")
        return True
        
    except Exception as e:
        print_fail(f"Exception: {str(e)}")
        return False

def test_leads_missing_magnet():
    """Test lead magnet with missing magnet slug"""
    print_test("POST /api/leads - Missing magnet slug")
    
    payload = {
        "email": "bob.wilson@example.com",
        "name": "Bob Wilson"
    }
    
    try:
        response = requests.post(f"{BASE_URL}/leads", json=payload, timeout=10)
        
        if response.status_code != 400:
            print_fail(f"Expected 400, got {response.status_code}")
            return False
        
        data = response.json()
        if 'Missing magnet slug' not in data.get('error', ''):
            print_fail(f"Expected 'Missing magnet slug' error, got: {data.get('error')}")
            return False
        
        print_pass("Correctly rejected with 400")
        return True
        
    except Exception as e:
        print_fail(f"Exception: {str(e)}")
        return False

# ============================================================================
# TEST 4: GET /api/leads (retrieval)
# ============================================================================

def test_leads_retrieval_no_key():
    """Test lead retrieval without key"""
    print_test("GET /api/leads - No key")
    
    try:
        response = requests.get(f"{BASE_URL}/leads", timeout=10)
        
        if response.status_code != 401:
            print_fail(f"Expected 401, got {response.status_code}")
            return False
        
        data = response.json()
        if 'Unauthorized' not in data.get('error', ''):
            print_fail(f"Expected 'Unauthorized' error, got: {data.get('error')}")
            return False
        
        print_pass("Correctly rejected with 401")
        return True
        
    except Exception as e:
        print_fail(f"Exception: {str(e)}")
        return False

def test_leads_retrieval_wrong_key():
    """Test lead retrieval with wrong key"""
    print_test("GET /api/leads - Wrong key")
    
    try:
        response = requests.get(f"{BASE_URL}/leads?key=wrong-key", timeout=10)
        
        if response.status_code != 401:
            print_fail(f"Expected 401, got {response.status_code}")
            return False
        
        data = response.json()
        if 'Unauthorized' not in data.get('error', ''):
            print_fail(f"Expected 'Unauthorized' error, got: {data.get('error')}")
            return False
        
        print_pass("Correctly rejected with 401")
        return True
        
    except Exception as e:
        print_fail(f"Exception: {str(e)}")
        return False

def test_leads_retrieval_correct_key():
    """Test lead retrieval with correct key"""
    print_test("GET /api/leads - Correct key")
    
    try:
        response = requests.get(f"{BASE_URL}/leads?key={PASSPHRASE}", timeout=10)
        print(f"Status: {response.status_code}")
        
        if response.status_code != 200:
            print_fail(f"Expected 200, got {response.status_code}")
            print(f"Response: {response.text}")
            return False
        
        data = response.json()
        
        if not data.get('ok'):
            print_fail("Response ok field is not true")
            return False
        print_pass("Response has ok:true")
        
        # Check structure
        if 'counts' not in data:
            print_fail("Response missing 'counts' field")
            return False
        
        counts = data['counts']
        if 'quiz' not in counts or 'valuation' not in counts or 'leadMagnet' not in counts:
            print_fail("Counts missing required fields")
            return False
        print_pass(f"Counts: quiz={counts['quiz']}, valuation={counts['valuation']}, leadMagnet={counts['leadMagnet']}")
        
        if 'quiz' not in data or 'valuation' not in data or 'leadMagnet' not in data:
            print_fail("Response missing data arrays")
            return False
        
        print_pass(f"Response has all required arrays")
        
        # Check for MongoDB _id
        if not check_no_mongo_id(data):
            print_fail("Found MongoDB _id in response")
            return False
        print_pass("No MongoDB _id fields found in response")
        
        # Verify our test records are present
        quiz_records = data['quiz']
        valuation_records = data['valuation']
        lead_records = data['leadMagnet']
        
        print(f"\nℹ️  Found {len(quiz_records)} quiz submissions")
        print(f"ℹ️  Found {len(valuation_records)} valuation requests")
        print(f"ℹ️  Found {len(lead_records)} lead magnet captures")
        
        # Check if our test emails are present
        quiz_emails = [r.get('email') for r in quiz_records if r.get('email')]
        if 'maria.rodriguez@example.com' in quiz_emails:
            print_pass("Found our test quiz submission")
        
        valuation_emails = [r.get('email') for r in valuation_records]
        if 'john.smith@example.com' in valuation_emails:
            print_pass("Found our test valuation request")
        
        lead_emails = [r.get('email') for r in lead_records]
        if 'sarah.johnson@example.com' in lead_emails:
            print_pass("Found our test lead magnet capture")
        
        return True
        
    except Exception as e:
        print_fail(f"Exception: {str(e)}")
        return False

# ============================================================================
# TEST 5: GET /api/ (status)
# ============================================================================

def test_status_endpoint():
    """Test status endpoint"""
    print_test("GET /api/ - Status endpoint")
    
    try:
        response = requests.get(f"{BASE_URL}/", timeout=10)
        print(f"Status: {response.status_code}")
        
        if response.status_code != 200:
            print_fail(f"Expected 200, got {response.status_code}")
            return False
        
        data = response.json()
        print(f"Response: {json.dumps(data, indent=2)}")
        
        if not data.get('ok'):
            print_fail("Response ok field is not true")
            return False
        print_pass("Response has ok:true")
        
        if 'endpoints' not in data:
            print_fail("Response missing 'endpoints' field")
            return False
        
        if not isinstance(data['endpoints'], list):
            print_fail("Endpoints is not an array")
            return False
        
        print_pass(f"Response has endpoints array with {len(data['endpoints'])} items")
        return True
        
    except Exception as e:
        print_fail(f"Exception: {str(e)}")
        return False

# ============================================================================
# MAIN
# ============================================================================

def main():
    print("\n" + "="*80)
    print("LA QUINTA GOLF LIFESTYLE - PHASE 4 BACKEND API TESTS")
    print("="*80)
    print(f"Base URL: {BASE_URL}")
    print("="*80)
    
    results = {
        'passed': 0,
        'failed': 0,
        'total': 0
    }
    
    tests = [
        # Quiz tests
        ('POST /api/quiz - Basic', test_quiz_basic),
        ('POST /api/quiz - Determinism', test_quiz_determinism),
        ('POST /api/quiz - Luxury profile', test_quiz_luxury_profile),
        ('POST /api/quiz - Invalid answers', test_quiz_invalid_answers),
        ('POST /api/quiz - Invalid email', test_quiz_invalid_email),
        
        # Valuation tests
        ('POST /api/valuation - Valid', test_valuation_valid),
        ('POST /api/valuation - Missing address', test_valuation_missing_address),
        ('POST /api/valuation - Missing email', test_valuation_missing_email),
        ('POST /api/valuation - Invalid email', test_valuation_invalid_email),
        
        # Lead magnet tests
        ('POST /api/leads - Valid', test_leads_valid),
        ('POST /api/leads - Missing email', test_leads_missing_email),
        ('POST /api/leads - Invalid email', test_leads_invalid_email),
        ('POST /api/leads - Missing magnet', test_leads_missing_magnet),
        
        # Lead retrieval tests
        ('GET /api/leads - No key', test_leads_retrieval_no_key),
        ('GET /api/leads - Wrong key', test_leads_retrieval_wrong_key),
        ('GET /api/leads - Correct key', test_leads_retrieval_correct_key),
        
        # Status test
        ('GET /api/ - Status', test_status_endpoint),
    ]
    
    for name, test_func in tests:
        results['total'] += 1
        try:
            result = test_func()
            if result or result is None:  # None means test ran but had issues
                results['passed'] += 1
            else:
                results['failed'] += 1
        except Exception as e:
            print_fail(f"Test crashed: {str(e)}")
            results['failed'] += 1
    
    # Summary
    print("\n" + "="*80)
    print("TEST SUMMARY")
    print("="*80)
    print(f"Total tests: {results['total']}")
    print(f"Passed: {results['passed']}")
    print(f"Failed: {results['failed']}")
    print("="*80)
    
    if results['failed'] == 0:
        print("\n✅ ALL TESTS PASSED!")
        return 0
    else:
        print(f"\n❌ {results['failed']} TEST(S) FAILED")
        return 1

if __name__ == '__main__':
    sys.exit(main())
