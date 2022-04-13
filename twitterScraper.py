import requests
import os
import json

# To set your environment variables in your terminal run the following line:
# export 'BEARER_TOKEN'='AAAAAAAAAAAAAAAAAAAAAPGUbQEAAAAAg%2B9USykp9ipGbV7rq%2FXaiEVo3MQ%3DIUES5pbBYe83F0tctvrMisyZ2w9nX1WSZeDKwOSqXOP5PrLJ0J'
bearer_token = os.environ.get("BEARER_TOKEN")


# Optional params: start_time,end_time,since_id,until_id,max_results,next_token,
# expansions,tweet.fields,media.fields,poll.fields,place.fields,user.fields
#query_params = {'query': '("covid" from:cdcgov -is:retweet)'} #,'tweet.fields': 'author_id'}


def bearer_oauth(r):
    """
    Method required by bearer token authentication.
    """

    r.headers["Authorization"] = f"Bearer {bearer_token}"
    r.headers["User-Agent"] = "v2RecentSearchPython"
    return r

def connect_to_endpoint(keyword):
    search_url = "https://api.twitter.com/2/tweets/search/recent"
    param = '("{}" from:cdcgov -is:retweet -is:reply)'.format(keyword)

    
    query_params = {'query': param}
    response = requests.get(search_url, auth=bearer_oauth, params=query_params)
    print(response.status_code)
    if response.status_code != 200:
        raise Exception(response.status_code, response.text)
    return response.json()


def search_twitter(keyword):
    json_response = connect_to_endpoint(keyword)
    with open('json_data.json', 'w') as outfile:
        outfile.write(json.dumps(json_response, indent=4, sort_keys=True))



def main():
    json_response = connect_to_endpoint("covid")
    search_twitter("covid")
    print(json.dumps(json_response, indent=4, sort_keys=True))


if __name__ == "__main__":
    main()