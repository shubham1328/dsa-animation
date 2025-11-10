// Navigation Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
}

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
    });
});

// Smooth Scrolling
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// Topic Loading
function loadTopic(topicName) {
    console.log(`Loading topic: ${topicName}`);
    alert(`Loading ${topicName} content...`);
    // In a real implementation, this would load topic-specific content
}

// Visualization Variables
let visualizationRunning = false;
let visualizationSpeed = 5;
let currentArray = [];
let comparisons = 0;
let arrayAccesses = 0;

// Initialize Array Display
function initializeArray(size = 10) {
    currentArray = [];
    for (let i = 0; i < size; i++) {
        currentArray.push(Math.floor(Math.random() * 100) + 10);
    }
    displayArray();
}

// Display Array as Bars
function displayArray(comparingIndices = [], sortedIndices = []) {
    const arrayDisplay = document.getElementById('array-display');
    if (!arrayDisplay) return;
    
    arrayDisplay.innerHTML = '';
    const maxValue = Math.max(...currentArray);
    
    currentArray.forEach((value, index) => {
        const bar = document.createElement('div');
        bar.className = 'array-bar';
        bar.style.height = `${(value / maxValue) * 200}px`;
        bar.textContent = value;
        
        if (comparingIndices.includes(index)) {
            bar.classList.add('comparing');
        }
        if (sortedIndices.includes(index)) {
            bar.classList.add('sorted');
        }
        
        arrayDisplay.appendChild(bar);
    });
}

// Sleep function for animation delays
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Update Algorithm Info
function updateAlgorithmInfo(algorithm) {
    const complexityData = {
        'bubble-sort': { time: 'O(n²)', space: 'O(1)' },
        'selection-sort': { time: 'O(n²)', space: 'O(1)' },
        'insertion-sort': { time: 'O(n²)', space: 'O(1)' },
        'quick-sort': { time: 'O(n log n)', space: 'O(log n)' },
        'merge-sort': { time: 'O(n log n)', space: 'O(n)' },
        'binary-search': { time: 'O(log n)', space: 'O(1)' },
        'linear-search': { time: 'O(n)', space: 'O(1)' },
        'bfs': { time: 'O(V + E)', space: 'O(V)' },
        'dfs': { time: 'O(V + E)', space: 'O(V)' }
    };
    
    const data = complexityData[algorithm] || { time: 'N/A', space: 'N/A' };
    document.getElementById('time-complexity').textContent = data.time;
    document.getElementById('space-complexity').textContent = data.space;
}

// Bubble Sort Algorithm
async function bubbleSort() {
    const n = currentArray.length;
    const sortedIndices = [];
    
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            if (!visualizationRunning) return;
            
            comparisons++;
            arrayAccesses += 2;
            updateStats();
            
            displayArray([j, j + 1], sortedIndices);
            await sleep(1000 / visualizationSpeed);
            
            if (currentArray[j] > currentArray[j + 1]) {
                // Swap
                [currentArray[j], currentArray[j + 1]] = [currentArray[j + 1], currentArray[j]];
                displayArray([j, j + 1], sortedIndices);
                await sleep(1000 / visualizationSpeed);
            }
        }
        sortedIndices.push(n - i - 1);
    }
    sortedIndices.push(0);
    displayArray([], sortedIndices);
}

// Selection Sort Algorithm
async function selectionSort() {
    const n = currentArray.length;
    const sortedIndices = [];
    
    for (let i = 0; i < n - 1; i++) {
        let minIdx = i;
        
        for (let j = i + 1; j < n; j++) {
            if (!visualizationRunning) return;
            
            comparisons++;
            arrayAccesses += 2;
            updateStats();
            
            displayArray([minIdx, j], sortedIndices);
            await sleep(1000 / visualizationSpeed);
            
            if (currentArray[j] < currentArray[minIdx]) {
                minIdx = j;
            }
        }
        
        if (minIdx !== i) {
            [currentArray[i], currentArray[minIdx]] = [currentArray[minIdx], currentArray[i]];
        }
        sortedIndices.push(i);
        displayArray([i], sortedIndices);
        await sleep(1000 / visualizationSpeed);
    }
    sortedIndices.push(n - 1);
    displayArray([], sortedIndices);
}

// Insertion Sort Algorithm
async function insertionSort() {
    const n = currentArray.length;
    const sortedIndices = [0];
    
    for (let i = 1; i < n; i++) {
        let key = currentArray[i];
        let j = i - 1;
        
        displayArray([i], sortedIndices);
        await sleep(1000 / visualizationSpeed);
        
        while (j >= 0 && currentArray[j] > key) {
            if (!visualizationRunning) return;
            
            comparisons++;
            arrayAccesses += 2;
            updateStats();
            
            currentArray[j + 1] = currentArray[j];
            displayArray([j, j + 1], sortedIndices);
            await sleep(1000 / visualizationSpeed);
            j--;
        }
        currentArray[j + 1] = key;
        sortedIndices.push(i);
        displayArray([j + 1], sortedIndices);
        await sleep(1000 / visualizationSpeed);
    }
    displayArray([], sortedIndices);
}

// Quick Sort Algorithm
async function quickSort(arr = currentArray, low = 0, high = currentArray.length - 1, sortedIndices = []) {
    if (low < high) {
        const pi = await partition(arr, low, high, sortedIndices);
        await quickSort(arr, low, pi - 1, sortedIndices);
        await quickSort(arr, pi + 1, high, sortedIndices);
    }
    return arr;
}

async function partition(arr, low, high, sortedIndices) {
    const pivot = arr[high];
    let i = low - 1;
    
    for (let j = low; j < high; j++) {
        if (!visualizationRunning) return high;
        
        comparisons++;
        arrayAccesses += 2;
        updateStats();
        
        displayArray([j, high], sortedIndices);
        await sleep(1000 / visualizationSpeed);
        
        if (arr[j] < pivot) {
            i++;
            [arr[i], arr[j]] = [arr[j], arr[i]];
            displayArray([i, j], sortedIndices);
            await sleep(1000 / visualizationSpeed);
        }
    }
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    sortedIndices.push(i + 1);
    displayArray([i + 1], sortedIndices);
    await sleep(1000 / visualizationSpeed);
    return i + 1;
}

// Merge Sort Algorithm
async function mergeSort(arr = currentArray, left = 0, right = currentArray.length - 1) {
    if (left < right) {
        const mid = Math.floor((left + right) / 2);
        await mergeSort(arr, left, mid);
        await mergeSort(arr, mid + 1, right);
        await merge(arr, left, mid, right);
    }
    return arr;
}

async function merge(arr, left, mid, right) {
    const n1 = mid - left + 1;
    const n2 = right - mid;
    const L = arr.slice(left, mid + 1);
    const R = arr.slice(mid + 1, right + 1);
    
    let i = 0, j = 0, k = left;
    
    while (i < n1 && j < n2) {
        if (!visualizationRunning) return;
        
        comparisons++;
        arrayAccesses += 2;
        updateStats();
        
        displayArray([left + i, mid + 1 + j], []);
        await sleep(1000 / visualizationSpeed);
        
        if (L[i] <= R[j]) {
            arr[k] = L[i];
            i++;
        } else {
            arr[k] = R[j];
            j++;
        }
        k++;
    }
    
    while (i < n1) {
        arr[k] = L[i];
        i++;
        k++;
    }
    
    while (j < n2) {
        arr[k] = R[j];
        j++;
        k++;
    }
    
    displayArray([], []);
    await sleep(1000 / visualizationSpeed);
}

// Linear Search Algorithm
async function linearSearch(target) {
    for (let i = 0; i < currentArray.length; i++) {
        if (!visualizationRunning) return -1;
        
        comparisons++;
        arrayAccesses++;
        updateStats();
        
        displayArray([i], []);
        await sleep(1000 / visualizationSpeed);
        
        if (currentArray[i] === target) {
            displayArray([], [i]);
            return i;
        }
    }
    return -1;
}

// Binary Search Algorithm (requires sorted array)
async function binarySearch(target) {
    // First sort the array
    currentArray.sort((a, b) => a - b);
    displayArray();
    await sleep(1000);
    
    let left = 0;
    let right = currentArray.length - 1;
    
    while (left <= right) {
        if (!visualizationRunning) return -1;
        
        const mid = Math.floor((left + right) / 2);
        comparisons++;
        arrayAccesses++;
        updateStats();
        
        displayArray([left, mid, right], []);
        await sleep(1000 / visualizationSpeed);
        
        if (currentArray[mid] === target) {
            displayArray([], [mid]);
            return mid;
        }
        
        if (currentArray[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    return -1;
}

// Update Statistics
function updateStats() {
    document.getElementById('comparisons').textContent = comparisons;
    document.getElementById('array-accesses').textContent = arrayAccesses;
}

// Start Visualization
async function startVisualization() {
    if (visualizationRunning) return;
    
    const algorithm = document.getElementById('algorithm-select').value;
    visualizationSpeed = parseInt(document.getElementById('speed').value);
    visualizationRunning = true;
    comparisons = 0;
    arrayAccesses = 0;
    updateStats();
    updateAlgorithmInfo(algorithm);
    
    // Initialize array if not already done
    if (currentArray.length === 0) {
        initializeArray();
    }
    
    switch (algorithm) {
        case 'bubble-sort':
            await bubbleSort();
            break;
        case 'selection-sort':
            await selectionSort();
            break;
        case 'insertion-sort':
            await insertionSort();
            break;
        case 'quick-sort':
            await quickSort();
            break;
        case 'merge-sort':
            await mergeSort();
            break;
        case 'linear-search':
            const targetLinear = currentArray[Math.floor(Math.random() * currentArray.length)];
            await linearSearch(targetLinear);
            break;
        case 'binary-search':
            const targetBinary = currentArray[Math.floor(Math.random() * currentArray.length)];
            await binarySearch(targetBinary);
            break;
        case 'bfs':
        case 'dfs':
            alert('Graph algorithms visualization coming soon!');
            break;
    }
    
    visualizationRunning = false;
}

// Reset Visualization
function resetVisualization() {
    visualizationRunning = false;
    comparisons = 0;
    arrayAccesses = 0;
    updateStats();
    initializeArray();
}

// Speed Control
document.getElementById('speed')?.addEventListener('input', (e) => {
    visualizationSpeed = parseInt(e.target.value);
});

// Algorithm Select
document.getElementById('algorithm-select')?.addEventListener('change', (e) => {
    updateAlgorithmInfo(e.target.value);
    resetVisualization();
});

// Filter Problems by Difficulty
const filterButtons = document.querySelectorAll('.filter-btn');
const problemItems = document.querySelectorAll('.problem-item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        const difficulty = button.getAttribute('data-difficulty');
        
        problemItems.forEach(item => {
            if (difficulty === 'all' || item.getAttribute('data-difficulty') === difficulty) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// Problem Modal Functions
const problemData = {
    'two-sum': {
        title: 'Two Sum',
        description: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice.',
        example: 'Input: nums = [2,7,11,15], target = 9\nOutput: [0,1]\nExplanation: Because nums[0] + nums[1] == 9, we return [0, 1].'
    },
    'valid-parentheses': {
        title: 'Valid Parentheses',
        description: 'Given a string s containing just the characters \'(\', \')\', \'{\', \'}\', \'[\' and \']\', determine if the input string is valid. An input string is valid if: Open brackets must be closed by the same type of brackets. Open brackets must be closed in the correct order.',
        example: 'Input: s = "()[]{}"\nOutput: true\n\nInput: s = "([)]"\nOutput: false'
    },
    'level-order': {
        title: 'Binary Tree Level Order Traversal',
        description: 'Given the root of a binary tree, return the level order traversal of its nodes\' values. (i.e., from left to right, level by level).',
        example: 'Input: root = [3,9,20,null,null,15,7]\nOutput: [[3],[9,20],[15,7]]'
    },
    'lis': {
        title: 'Longest Increasing Subsequence',
        description: 'Given an integer array nums, return the length of the longest strictly increasing subsequence.',
        example: 'Input: nums = [10,9,2,5,3,7,101,18]\nOutput: 4\nExplanation: The longest increasing subsequence is [2,3,7,101], therefore the length is 4.'
    },
    'merge-k-lists': {
        title: 'Merge K Sorted Lists',
        description: 'You are given an array of k linked-lists lists, each linked-list is sorted in ascending order. Merge all the linked-lists into one sorted linked-list and return it.',
        example: 'Input: lists = [[1,4,5],[1,3,4],[2,6]]\nOutput: [1,1,2,3,4,4,5,6]'
    },
    'word-ladder': {
        title: 'Word Ladder',
        description: 'A transformation sequence from word beginWord to word endWord using a dictionary wordList is a sequence of words beginWord -> s1 -> s2 -> ... -> sk such that every adjacent pair of words differs by a single letter.',
        example: 'Input: beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log","cog"]\nOutput: 5\nExplanation: One shortest transformation sequence is "hit" -> "hot" -> "dot" -> "dog" -> "cog", which is 5 words long.'
    }
};

function openProblem(problemId) {
    const modal = document.getElementById('problem-modal');
    const data = problemData[problemId];
    
    if (data) {
        document.getElementById('modal-title').textContent = data.title;
        document.getElementById('modal-description').textContent = data.description;
        document.getElementById('modal-example').textContent = data.example;
        document.getElementById('code-input').value = '';
        document.getElementById('output').innerHTML = '';
        modal.style.display = 'block';
    }
}

function closeProblemModal() {
    document.getElementById('problem-modal').style.display = 'none';
}

function runCode() {
    const code = document.getElementById('code-input').value;
    const output = document.getElementById('output');
    
    if (!code.trim()) {
        output.innerHTML = '<span style="color: var(--error);">Please write some code first!</span>';
        return;
    }
    
    output.innerHTML = '<span style="color: var(--success);">Code execution simulation...\nTest Case 1: Passed ✓\nTest Case 2: Passed ✓</span>';
}

function submitSolution() {
    const code = document.getElementById('code-input').value;
    const output = document.getElementById('output');
    
    if (!code.trim()) {
        output.innerHTML = '<span style="color: var(--error);">Please write some code first!</span>';
        return;
    }
    
    output.innerHTML = '<span style="color: var(--success);">Solution submitted successfully! ✓\nAll test cases passed.\nRuntime: 52ms (beats 85.3%)\nMemory: 42.1MB (beats 78.2%)</span>';
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('problem-modal');
    if (event.target == modal) {
        closeProblemModal();
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    initializeArray();
    updateAlgorithmInfo('bubble-sort');
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});
