import pandas as pd
import matplotlib.pyplot as plt
from nltk.sentiment.vader import SentimentIntensityAnalyzer
import nltk



# Load your dataset
data = pd.read_csv(r"E:\inspiron15\Sample\zomato.csv", encoding="ISO-8859-1")
print("Zomato Dataset Loaded Successfully")
print(data.head())

# Initialize Sentiment Analyzer
analyzer = SentimentIntensityAnalyzer()

# Apply sentiment scoring to each review
data['compound'] = data['review'].apply(lambda x: analyzer.polarity_scores(str(x))['compound'])

# Classify into Positive / Negative / Neutral
data['Sentiment'] = data['compound'].apply(lambda score: 
                                           'Positive' if score > 0.05 
                                           else ('Negative' if score < -0.05 
                                                 else 'Neutral'))

# Display sentiment distribution
summary = data['Sentiment'].value_counts()
print("\nSentiment Summary:")
print(summary)

# Plot sentiment distribution
plt.figure(figsize=(6,4))
summary.plot(kind='bar', color=['green', 'red', 'gray'])
plt.title("Sentiment Distribution of Zomato Reviews")
plt.xlabel("Sentiment Category")
plt.ylabel("Number of Reviews")
plt.tight_layout()
plt.show()

# Save analyzed results to CSV
output_path = r"E:\inspiron15\Sample\zomato_sentiment_results.csv"
data.to_csv(output_path, index=False)
print(f"\nResults saved to {output_path}")
