from twython import Twython
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer
from sqlalchemy import create_engine
import pandas as pd

# This .py file creates a list of dictionaries that contain
# info about tweets that have a specific word in it,
# and stores the text, url, date, source and query

APP_KEY = 'HThJ824aMl0KwdEYZhRAs5aeQ'

APP_SECRET = 'va5dpwBjfubZb9TVDhSwKHTEbFMklUNdGEzo71lTDa4a1setjL'

def search_twitter(query):

    # Stuff to instantiate twitter connection
    twitter = Twython(APP_KEY, APP_SECRET, oauth_version = 2)
    accesstoken = twitter.obtain_access_token()
    twitter = Twython(APP_KEY, access_token = accesstoken)

    search = twitter.search(lang = 'en', q = query)

    results = search['statuses']

    dict_list = []

    for result in results:
        dict_list.append({'text': result['text'], 'vader_sentiment': SentimentIntensityAnalyzer().polarity_scores(result['text']),
                            'url': "https://twitter.com/{}/status/{}".format(result['user']['screen_name'], result['id']),
                            'date': result['created_at'],
                            'source': "Twitter",
                            "query": query})

    return dict_list


#Test code
search = search_twitter(query="Power 10 -filter:retweets") #BlueGene/Q
i = 1
aFile = open('tweets.txt', 'w')

#return data in a csv file
df = pd.DataFrame(search, columns = ['text', 'vader_sentiment', 'url', 'date', 'source', 'query'])
df.to_csv('tweets.csv')

#print data in a txt file
for tweet in search:

    print("TWEET #" + str(i) + "\n", file = aFile)
    for akey in tweet:

        print(akey + ": " + str(tweet[akey])+ "\n", file = aFile)
    i = i + 1
    print("----------------------------------------", file =aFile)
aFile.close()
