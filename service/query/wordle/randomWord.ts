export const getRandomWord = (): string => {
    const words = ['aback', 'actor', 'adapt', 'badge', 'beget', 'bezel', 'cabin', 'draft', 'enter', 'fable', 'facet', 'guise', 'hairy', 'harsh', 'inane', 'lager', 'medal', 'merit', 'nylon', 'pagan', 'pasty', 'quell', 'rabid', 'scrum', 'scrub', 'spray', 'sunny', 'there', 'thumb', 'thump', 'tweet', 'twice', 'usher', 'wider', 'winch', 'windy', 'wrong', 'yeast', 'yield', 'young', 'youth', 'zebra', 'zesty', 'zonal']
    return words[Math.floor(Math.random() * words.length)];
}