import React, { useState } from "react";

class TrieNode {
  constructor() {
    this.children = {};
    this.isEndOfWord = false;
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode();
  }

  insert(word) {
    let node = this.root;
    for (let char of word) {
      if (!node.children[char]) {
        node.children[char] = new TrieNode();
      }
      node = node.children[char];
    }
    node.isEndOfWord = true;
  }

  search(word) {
    let node = this.root;
    for (let char of word) {
      if (!node.children[char]) return false;
      node = node.children[char];
    }
    return node.isEndOfWord;
  }

  startsWith(prefix) {
    let node = this.root;
    for (let char of prefix) {
      if (!node.children[char]) return false;
      node = node.children[char];
    }
    return true;
  }

  autoComplete(prefix) {
    let node = this.root;
    for (let char of prefix) {
      if (!node.children[char]) return [];
      node = node.children[char];
    }
    
    const words = [];
    this._findWords(node, prefix, words);
    return words;
  }

  _findWords(node, prefix, words) {
    if (node.isEndOfWord) words.push(prefix);
    
    for (let char in node.children) {
      this._findWords(node.children[char], prefix + char, words);
    }
  }
}

export default function TrieAnimation() {
  const [trie] = useState(() => {
    const t = new Trie();
    ['app', 'apple', 'application', 'apply', 'april', 'ape', 'best', 'better'].forEach(word => t.insert(word));
    return t;
  });
  
  const [searchWord, setSearchWord] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [prefixWord, setPrefixWord] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const handleSearch = () => {
    setSearchResult(trie.search(searchWord));
  };

  const handleAutoComplete = () => {
    const results = trie.autoComplete(prefixWord);
    setSuggestions(results);
  };

  return (
    <div style={{ maxWidth: "1100px" }}>
      <h2 style={{ color: "#673ab7", marginBottom: "10px" }}>🌲 Trie (Prefix Tree)</h2>
      
      <div style={{ backgroundColor: "#ede7f6", padding: "15px", borderRadius: "8px", marginBottom: "20px" }}>
        <h4>💡 Concept: Efficient String Storage & Search</h4>
        <p>A Trie is a tree-like data structure for storing strings where each path represents a word.</p>
        <p><strong>Operations:</strong></p>
        <ul style={{ marginLeft: "20px", lineHeight: "1.8" }}>
          <li><strong>Insert:</strong> O(m) where m = word length</li>
          <li><strong>Search:</strong> O(m) - faster than hash for prefix queries</li>
          <li><strong>Autocomplete:</strong> Find all words with given prefix</li>
        </ul>
        <p style={{ marginTop: "10px" }}>
          <strong>Space:</strong> O(ALPHABET_SIZE * N * M) | <strong>Use cases:</strong> Autocomplete, spell check, IP routing
        </p>
      </div>

      <div style={{ backgroundColor: "#f5f5f5", padding: "20px", borderRadius: "8px", marginBottom: "20px" }}>
        <h4>Stored Words:</h4>
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginTop: "10px" }}>
          {['app', 'apple', 'application', 'apply', 'april', 'ape', 'best', 'better'].map(word => (
            <div key={word} style={{
              padding: "8px 15px",
              backgroundColor: "#673ab7",
              color: "white",
              borderRadius: "5px",
              fontSize: "14px"
            }}>
              {word}
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "30px" }}>
        <div style={{ padding: "20px", backgroundColor: "#e8eaf6", borderRadius: "10px" }}>
          <h4>🔍 Search Word</h4>
          <div style={{ display: "flex", gap: "10px", marginTop: "15px" }}>
            <input
              type="text"
              value={searchWord}
              onChange={(e) => setSearchWord(e.target.value)}
              placeholder="Enter word"
              style={{
                flex: 1,
                padding: "10px",
                fontSize: "16px",
                borderRadius: "5px",
                border: "2px solid #673ab7"
              }}
            />
            <button
              onClick={handleSearch}
              style={{
                padding: "10px 20px",
                backgroundColor: "#673ab7",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                fontWeight: "bold"
              }}
            >
              Search
            </button>
          </div>
          {searchResult !== null && (
            <div style={{
              marginTop: "15px",
              padding: "15px",
              backgroundColor: searchResult ? "#c8e6c9" : "#ffcdd2",
              borderRadius: "5px",
              textAlign: "center",
              fontSize: "18px",
              fontWeight: "bold"
            }}>
              {searchResult ? `✅ "${searchWord}" exists!` : `❌ "${searchWord}" not found`}
            </div>
          )}
        </div>

        <div style={{ padding: "20px", backgroundColor: "#f3e5f5", borderRadius: "10px" }}>
          <h4>💡 Autocomplete</h4>
          <div style={{ display: "flex", gap: "10px", marginTop: "15px" }}>
            <input
              type="text"
              value={prefixWord}
              onChange={(e) => {
                setPrefixWord(e.target.value);
                if (e.target.value) {
                  setSuggestions(trie.autoComplete(e.target.value));
                } else {
                  setSuggestions([]);
                }
              }}
              placeholder="Type prefix..."
              style={{
                flex: 1,
                padding: "10px",
                fontSize: "16px",
                borderRadius: "5px",
                border: "2px solid #9c27b0"
              }}
            />
          </div>
          {suggestions.length > 0 && (
            <div style={{ marginTop: "15px" }}>
              <strong>Suggestions:</strong>
              <div style={{ marginTop: "10px" }}>
                {suggestions.map(word => (
                  <div key={word} style={{
                    padding: "8px 12px",
                    backgroundColor: "#ce93d8",
                    color: "white",
                    borderRadius: "5px",
                    marginBottom: "5px"
                  }}>
                    {word}
                  </div>
                ))}
              </div>
            </div>
          )}
          {prefixWord && suggestions.length === 0 && (
            <div style={{
              marginTop: "15px",
              padding: "10px",
              backgroundColor: "#ffebee",
              borderRadius: "5px",
              color: "#666"
            }}>
              No words start with "{prefixWord}"
            </div>
          )}
        </div>
      </div>

      <div style={{ marginTop: "25px", padding: "15px", backgroundColor: "#f5f5f5", borderRadius: "8px" }}>
        <h4>📝 Code Example:</h4>
        <pre style={{ backgroundColor: "#263238", color: "#aed581", padding: "15px", borderRadius: "5px", overflow: "auto" }}>
{`class TrieNode {
  constructor() {
    this.children = {};
    this.isEndOfWord = false;
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode();
  }
  
  insert(word) {
    let node = this.root;
    for (let char of word) {
      if (!node.children[char]) {
        node.children[char] = new TrieNode();
      }
      node = node.children[char];
    }
    node.isEndOfWord = true;
  }
  
  search(word) {
    let node = this.root;
    for (let char of word) {
      if (!node.children[char]) return false;
      node = node.children[char];
    }
    return node.isEndOfWord;
  }
  
  startsWith(prefix) {
    let node = this.root;
    for (let char of prefix) {
      if (!node.children[char]) return false;
      node = node.children[char];
    }
    return true;
  }
}

// Time: O(m) for all operations
// Space: O(ALPHABET_SIZE * total_chars)`}
        </pre>
      </div>

      <div style={{ marginTop: "15px", padding: "15px", backgroundColor: "#fff3e0", borderRadius: "8px" }}>
        <h4>💡 Interview Tips:</h4>
        <ul style={{ marginLeft: "20px", lineHeight: "1.8" }}>
          <li><strong>Best for:</strong> Prefix queries, autocomplete, spell checking</li>
          <li><strong>vs Hash Map:</strong> Trie better for prefix searches</li>
          <li><strong>Space tradeoff:</strong> Uses more space but faster prefix queries</li>
          <li>Common problems: Implement Trie, Word Search II, Design Search Autocomplete</li>
        </ul>
      </div>
    </div>
  );
}

