#!/usr/bin/env python3
"""
Comprehensive Backend Testing for Real Estate Microservices System
Tests both Users Microservice (port 3333) and Properties Microservice (port 3334)
"""

import requests
import json
import sys
from datetime import datetime
from typing import Dict, Any, Optional

class RealEstateMicroservicesTest:
    def __init__(self):
        self.users_base_url = "http://localhost:3333"
        self.properties_base_url = "http://localhost:3334"
        self.tests_run = 0
        self.tests_passed = 0
        self.auth_token = None
        self.test_corretor_ids = [
            "550e8400-e29b-41d4-a716-446655440010",
            "550e8400-e29b-41d4-a716-446655440011", 
            "550e8400-e29b-41d4-a716-446655440012"
        ]

    def log_test(self, name: str, success: bool, details: str = ""):
        """Log test results"""
        self.tests_run += 1
        if success:
            self.tests_passed += 1
            print(f"✅ {name} - PASSED {details}")
        else:
            print(f"❌ {name} - FAILED {details}")

    def make_request(self, method: str, url: str, data: Optional[Dict] = None, 
                    headers: Optional[Dict] = None) -> tuple[bool, Dict, int]:
        """Make HTTP request and return success, response data, status code"""
        try:
            if headers is None:
                headers = {'Content-Type': 'application/json'}
            
            if method.upper() == 'GET':
                response = requests.get(url, headers=headers, timeout=10)
            elif method.upper() == 'POST':
                response = requests.post(url, json=data, headers=headers, timeout=10)
            elif method.upper() == 'PUT':
                response = requests.put(url, json=data, headers=headers, timeout=10)
            elif method.upper() == 'DELETE':
                response = requests.delete(url, headers=headers, timeout=10)
            else:
                return False, {"error": "Unsupported method"}, 0

            try:
                response_data = response.json()
            except:
                response_data = {"raw_response": response.text}

            return response.status_code < 400, response_data, response.status_code

        except requests.exceptions.RequestException as e:
            return False, {"error": str(e)}, 0

    def test_services_health(self):
        """Test if both microservices are running"""
        print("\n🔍 TESTING MICROSERVICES HEALTH")
        print("=" * 50)
        
        # Test Users Service (no specific health endpoint, test with 404)
        success, data, status = self.make_request('GET', f"{self.users_base_url}/")
        self.log_test("Users Service Running", status == 404, f"(Status: {status})")
        
        # Test Properties Service health endpoint
        success, data, status = self.make_request('GET', f"{self.properties_base_url}/health")
        self.log_test("Properties Service Health", success and status == 200, 
                     f"(Status: {status}, Service: {data.get('service', 'Unknown')})")

    def test_users_microservice(self):
        """Test Users Microservice endpoints"""
        print("\n🔍 TESTING USERS MICROSERVICE")
        print("=" * 50)
        
        # Test list brokers (corretores)
        success, data, status = self.make_request('GET', f"{self.users_base_url}/users/CORRETOR")
        self.log_test("List Brokers (CORRETOR)", success and status == 200, 
                     f"(Status: {status}, Count: {len(data.get('data', []))})")
        
        # Test authentication with test broker
        auth_data = {
            "email": "carlos.corretor@email.com",
            "password": "123456"
        }
        success, data, status = self.make_request('POST', f"{self.users_base_url}/users/auth", auth_data)
        self.log_test("Broker Authentication", success and status == 200, 
                     f"(Status: {status}, Has Token: {'token' in data.get('data', {})})")
        
        if success and 'data' in data and 'token' in data['data']:
            self.auth_token = data['data']['token']
        
        # Test validate broker for each test ID
        for corretor_id in self.test_corretor_ids:
            success, data, status = self.make_request('GET', 
                f"{self.users_base_url}/users/validate-corretor/{corretor_id}")
            self.log_test(f"Validate Broker {corretor_id[-4:]}", success and status == 200, 
                         f"(Status: {status})")

    def test_properties_microservice(self):
        """Test Properties Microservice endpoints"""
        print("\n🔍 TESTING PROPERTIES MICROSERVICE")
        print("=" * 50)
        
        # Test list all properties
        success, data, status = self.make_request('GET', f"{self.properties_base_url}/properties")
        properties_count = 0
        if success and data.get('data') and data['data'].get('properties'):
            properties_count = len(data['data']['properties'])
        self.log_test("List All Properties", success and status == 200, 
                     f"(Status: {status}, Count: {properties_count})")
        
        # Store first property ID for further testing
        first_property_id = None
        if success and data.get('data') and data['data'].get('properties') and len(data['data']['properties']) > 0:
            first_property_id = data['data']['properties'][0].get('id')
        
        # Test get property by ID
        if first_property_id:
            success, data, status = self.make_request('GET', 
                f"{self.properties_base_url}/properties/{first_property_id}")
            self.log_test("Get Property by ID", success and status == 200, 
                         f"(Status: {status}, ID: {first_property_id})")
        
        # Test property search with filters
        filters = [
            "?city=São Paulo",
            "?property_type=APARTMENT", 
            "?city=São Paulo&property_type=APARTMENT"
        ]
        
        for filter_param in filters:
            success, data, status = self.make_request('GET', 
                f"{self.properties_base_url}/properties{filter_param}")
            filter_name = filter_param.replace('?', '').replace('&', ' & ')
            results_count = len(data.get('data', [])) if success else 0
            self.log_test(f"Filter Properties ({filter_name})", success and status == 200, 
                         f"(Status: {status}, Results: {results_count})")
        
        # Test properties by broker
        for corretor_id in self.test_corretor_ids:
            success, data, status = self.make_request('GET', 
                f"{self.properties_base_url}/corretor/{corretor_id}/properties")
            results_count = len(data.get('data', [])) if success else 0
            self.log_test(f"Properties by Broker {corretor_id[-4:]}", success and status == 200, 
                         f"(Status: {status}, Properties: {results_count})")

    def test_contacts_system(self):
        """Test Property Contacts system"""
        print("\n🔍 TESTING CONTACTS SYSTEM")
        print("=" * 50)
        
        # Test create contact (this should validate broker via HTTP)
        contact_data = {
            "property_id": "550e8400-e29b-41d4-a716-446655440001",
            "corretor_id": self.test_corretor_ids[0],
            "client_name": "João Silva",
            "client_email": "joao.silva@email.com",
            "client_phone": "(11) 99999-9999",
            "message": "Tenho interesse neste imóvel. Gostaria de agendar uma visita."
        }
        
        success, data, status = self.make_request('POST', 
            f"{self.properties_base_url}/contacts", contact_data)
        self.log_test("Create Contact", success and status == 201, 
                     f"(Status: {status}, Validates Broker via HTTP)")
        
        # Test get contacts by broker
        for corretor_id in self.test_corretor_ids:
            success, data, status = self.make_request('GET', 
                f"{self.properties_base_url}/corretor/{corretor_id}/contacts")
            contacts_count = len(data.get('data', [])) if success else 0
            self.log_test(f"Contacts by Broker {corretor_id[-4:]}", success and status == 200, 
                         f"(Status: {status}, Contacts: {contacts_count})")

    def test_microservices_communication(self):
        """Test communication between microservices"""
        print("\n🔍 TESTING MICROSERVICES COMMUNICATION")
        print("=" * 50)
        
        # The contact creation should validate broker via HTTP call to users service
        # This tests the inter-service communication
        contact_data = {
            "property_id": "550e8400-e29b-41d4-a716-446655440002",
            "corretor_id": self.test_corretor_ids[1],
            "client_name": "Maria Santos",
            "client_email": "maria.santos@email.com", 
            "client_phone": "(11) 88888-8888",
            "message": "Gostaria de mais informações sobre este imóvel."
        }
        
        success, data, status = self.make_request('POST', 
            f"{self.properties_base_url}/contacts", contact_data)
        self.log_test("Inter-service Communication (Contact → User Validation)", 
                     success and status == 201, 
                     f"(Status: {status}, Properties service validated broker via Users service)")

    def run_all_tests(self):
        """Run all test suites"""
        print("🏠 REAL ESTATE MICROSERVICES TESTING")
        print("=" * 60)
        print(f"Started at: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
        
        self.test_services_health()
        self.test_users_microservice()
        self.test_properties_microservice()
        self.test_contacts_system()
        self.test_microservices_communication()
        
        # Final results
        print("\n📊 FINAL TEST RESULTS")
        print("=" * 50)
        print(f"Tests Run: {self.tests_run}")
        print(f"Tests Passed: {self.tests_passed}")
        print(f"Tests Failed: {self.tests_run - self.tests_passed}")
        print(f"Success Rate: {(self.tests_passed/self.tests_run)*100:.1f}%")
        
        if self.tests_passed == self.tests_run:
            print("🎉 ALL TESTS PASSED!")
            return 0
        else:
            print("⚠️  SOME TESTS FAILED!")
            return 1

def main():
    """Main test execution"""
    tester = RealEstateMicroservicesTest()
    return tester.run_all_tests()

if __name__ == "__main__":
    sys.exit(main())