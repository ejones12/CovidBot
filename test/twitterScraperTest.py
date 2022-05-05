import pytest
 
import twitterScraper


"""
    Unit tests for twitterScraper.py using pytest
"""

#command to run: python -m pytest ./twitterScraperTest.py 

#Tests that the search_twitter function creates a non-empty json file with the "masks" keyword
def test_masks():
    twitterScraper.search_twitter("masks", twitterScraper.get_related("masks"))
    file = open("./json_data/masks_data.json",'r')
    assert file.read() != None

#Tests that the search_twitter function creates a non-empty json file with the "vaccines" keyword
def test_vaccines():
    twitterScraper.search_twitter("vaccines", twitterScraper.get_related("vaccines"))
    file = open("./json_data/vaccines_data.json",'r')
    assert file.read() != None

#Tests that the search_twitter function creates a non-empty json file with the "travel" keyword
def test_travel(tmpdir):
    twitterScraper.search_twitter("travel", twitterScraper.get_related("travel"))
    file = open("./json_data/travel_data.json",'r')
    assert file.read() != None

#Tests that the search_twitter function creates a non-empty file with the "general" keyword
def test_general(tmpdir):
    twitterScraper.search_twitter("general", twitterScraper.get_related("general"))
    file = open("./json_data/general_data.json",'r')
    assert file.read() != None