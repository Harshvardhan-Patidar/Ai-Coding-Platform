const mongoose = require('mongoose');
const Question = require('../models/Question');
const User = require('../models/User');

const sampleQuestions = [
  {
    title: "Two Sum",
    description: `
Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.

**Example 1:**
Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].

**Example 2:**
Input: nums = [3,2,4], target = 6
Output: [1,2]

**Example 3:**
Input: nums = [3,3], target = 6
Output: [0,1]

**Constraints:**
- 2 <= nums.length <= 10^4
- -10^9 <= nums[i] <= 10^9
- -10^9 <= target <= 10^9
- Only one valid answer exists.
    `,
    difficulty: "easy",
    topics: ["Array", "Hash Table"],
    companies: ["Google", "Amazon", "Microsoft", "Apple"],
    constraints: [
      "2 <= nums.length <= 10^4",
      "-10^9 <= nums[i] <= 10^9",
      "-10^9 <= target <= 10^9",
      "Only one valid answer exists"
    ],
    examples: [
      {
        input: "nums = [2,7,11,15], target = 9",
        output: "[0,1]",
        explanation: "Because nums[0] + nums[1] == 9, we return [0, 1]."
      },
      {
        input: "nums = [3,2,4], target = 6",
        output: "[1,2]",
        explanation: "Because nums[1] + nums[2] == 6, we return [1, 2]."
      }
    ],
    testCases: [
      {
        input: "[2,7,11,15]\n9",
        expectedOutput: "[0,1]",
        isHidden: false
      },
      {
        input: "[3,2,4]\n6",
        expectedOutput: "[1,2]",
        isHidden: false
      },
      {
        input: "[3,3]\n6",
        expectedOutput: "[0,1]",
        isHidden: true
      }
    ],
    hints: [
      "A really brute force way would be to search for all possible pairs of numbers but that would be too slow. Again, the thing that is tricky is that we have to return the indices of the two numbers, not the numbers themselves.",
      "So, if we fix one of the numbers, say x, we have to scan the entire array to find the next number y which is value - x where value is the input parameter. Can we change our array somehow so that this search becomes faster?",
      "The second train of thought is, without changing the array, can we use additional space somehow? Like maybe a hash map to speed up the search?"
    ],
    solutions: [
      {
        language: "javascript",
        code: `function twoSum(nums, target) {
    const map = new Map();
    
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        
        if (map.has(complement)) {
            return [map.get(complement), i];
        }
        
        map.set(nums[i], i);
    }
    
    return [];
}`,
        explanation: "We use a hash map to store the value and its index. For each number, we check if its complement (target - current number) exists in the map. If it does, we return the indices.",
        timeComplexity: "O(n)",
        spaceComplexity: "O(n)"
      }
    ],
    acceptanceRate: 45.2,
    totalSubmissions: 15000,
    correctSubmissions: 6780,
    averageTime: 15
  },
  {
    title: "Add Two Numbers",
    description: `
You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.

You may assume the two numbers do not contain any leading zero, except the number 0 itself.

**Example 1:**
Input: l1 = [2,4,3], l2 = [5,6,4]
Output: [7,0,8]
Explanation: 342 + 465 = 807.

**Example 2:**
Input: l1 = [0], l2 = [0]
Output: [0]

**Example 3:**
Input: l1 = [9,9,9,9,9,9,9], l2 = [9,9,9,9]
Output: [8,9,9,9,0,0,0,1]

**Constraints:**
- The number of nodes in each linked list is in the range [1, 100].
- 0 <= Node.val <= 9
- It is guaranteed that the list represents a number that does not have leading zeros.
    `,
    difficulty: "medium",
    topics: ["Linked List", "Math", "Recursion"],
    companies: ["Microsoft", "Amazon", "Bloomberg", "Adobe"],
    constraints: [
      "The number of nodes in each linked list is in the range [1, 100]",
      "0 <= Node.val <= 9",
      "It is guaranteed that the list represents a number that does not have leading zeros"
    ],
    examples: [
      {
        input: "l1 = [2,4,3], l2 = [5,6,4]",
        output: "[7,0,8]",
        explanation: "342 + 465 = 807"
      },
      {
        input: "l1 = [0], l2 = [0]",
        output: "[0]",
        explanation: "0 + 0 = 0"
      }
    ],
    testCases: [
      {
        input: "[2,4,3]\n[5,6,4]",
        expectedOutput: "[7,0,8]",
        isHidden: false
      },
      {
        input: "[0]\n[0]",
        expectedOutput: "[0]",
        isHidden: false
      },
      {
        input: "[9,9,9,9,9,9,9]\n[9,9,9,9]",
        expectedOutput: "[8,9,9,9,0,0,0,1]",
        isHidden: true
      }
    ],
    hints: [
      "Keep track of the carry using a variable and simulate digits-by-digits sum starting from the head of list, which contains the least-significant digit.",
      "Just like how you would sum two numbers on a piece of paper, we begin by summing the least-significant digits, which is the head of l1 and l2.",
      "Since each digit is in the range 0...9, summing two digits may 'overflow'. For example 5 + 7 = 12. In this case, we set the current digit to 2 and bring over the carry=1 to the next iteration."
    ],
    solutions: [
      {
        language: "javascript",
        code: `function addTwoNumbers(l1, l2) {
    let dummyHead = new ListNode(0);
    let current = dummyHead;
    let carry = 0;
    
    while (l1 !== null || l2 !== null) {
        let x = l1 ? l1.val : 0;
        let y = l2 ? l2.val : 0;
        let sum = carry + x + y;
        
        carry = Math.floor(sum / 10);
        current.next = new ListNode(sum % 10);
        current = current.next;
        
        if (l1) l1 = l1.next;
        if (l2) l2 = l2.next;
    }
    
    if (carry > 0) {
        current.next = new ListNode(carry);
    }
    
    return dummyHead.next;
}`,
        explanation: "We iterate through both linked lists, adding corresponding digits and keeping track of the carry. We create a new linked list to store the result.",
        timeComplexity: "O(max(m,n))",
        spaceComplexity: "O(max(m,n))"
      }
    ],
    acceptanceRate: 34.5,
    totalSubmissions: 12000,
    correctSubmissions: 4140,
    averageTime: 25
  },
  {
    title: "Longest Substring Without Repeating Characters",
    description: `
Given a string s, find the length of the longest substring without repeating characters.

**Example 1:**
Input: s = "abcabcbb"
Output: 3
Explanation: The answer is "abc", with the length of 3.

**Example 2:**
Input: s = "bbbbb"
Output: 1
Explanation: The answer is "b", with the length of 1.

**Example 3:**
Input: s = "pwwkew"
Output: 3
Explanation: The answer is "wke", with the length of 3. Notice that the answer must be a substring, "pwke" is a subsequence and not a substring.

**Constraints:**
- 0 <= s.length <= 5 * 10^4
- s consists of English letters, digits, symbols and spaces.
    `,
    difficulty: "medium",
    topics: ["Hash Table", "String", "Sliding Window"],
    companies: ["Amazon", "Google", "Facebook", "Microsoft"],
    constraints: [
      "0 <= s.length <= 5 * 10^4",
      "s consists of English letters, digits, symbols and spaces"
    ],
    examples: [
      {
        input: 's = "abcabcbb"',
        output: "3",
        explanation: 'The answer is "abc", with the length of 3.'
      },
      {
        input: 's = "bbbbb"',
        output: "1",
        explanation: 'The answer is "b", with the length of 1.'
      }
    ],
    testCases: [
      {
        input: '"abcabcbb"',
        expectedOutput: "3",
        isHidden: false
      },
      {
        input: '"bbbbb"',
        expectedOutput: "1",
        isHidden: false
      },
      {
        input: '"pwwkew"',
        expectedOutput: "3",
        isHidden: true
      }
    ],
    hints: [
      "Use a sliding window approach with two pointers.",
      "Keep track of characters in the current window using a hash set.",
      "When you encounter a duplicate character, move the left pointer until the duplicate is removed."
    ],
    solutions: [
      {
        language: "javascript",
        code: `function lengthOfLongestSubstring(s) {
    let maxLength = 0;
    let left = 0;
    let charSet = new Set();
    
    for (let right = 0; right < s.length; right++) {
        while (charSet.has(s[right])) {
            charSet.delete(s[left]);
            left++;
        }
        charSet.add(s[right]);
        maxLength = Math.max(maxLength, right - left + 1);
    }
    
    return maxLength;
}`,
        explanation: "We use a sliding window with two pointers. We keep track of characters in the current window using a Set. When we encounter a duplicate, we move the left pointer until the duplicate is removed.",
        timeComplexity: "O(n)",
        spaceComplexity: "O(min(m,n))"
      }
    ],
    acceptanceRate: 31.2,
    totalSubmissions: 18000,
    correctSubmissions: 5616,
    averageTime: 20
  },
  {
    "title": "Reverse String",
    "description": "Write a function that reverses a string. The input string is given as an array of characters `s`.\n\nYou must do this by modifying the input array in-place with O(1) extra memory.\n\n**Example 1:**\nInput: s = [\"h\",\"e\",\"l\",\"l\",\"o\"]\nOutput: [\"o\",\"l\",\"l\",\"e\",\"h\"]\n\n**Example 2:**\nInput: s = [\"H\",\"a\",\"n\",\"n\",\"a\",\"h\"]\nOutput: [\"h\",\"a\",\"n\",\"n\",\"a\",\"H\"]\n\n**Constraints:**\n- 1 <= s.length <= 10^5\n- s[i] is a printable ascii character.",
    "difficulty": "easy",
    "topics": [
      "String",
      "Two Pointers"
    ],
    "companies": [
      "Apple",
      "Microsoft",
      "Uber",
      "Adobe"
    ],
    "constraints": [
      "1 <= s.length <= 10^5",
      "s[i] is a printable ascii character."
    ],
    "examples": [
      {
        "input": "s = [\"h\",\"e\",\"l\",\"l\",\"o\"]",
        "output": "[\"o\",\"l\",\"l\",\"e\",\"h\"]",
        "explanation": "The string is reversed in-place."
      },
      {
        "input": "s = [\"H\",\"a\",\"n\",\"n\",\"a\",\"h\"]",
        "output": "[\"h\",\"a\",\"n\",\"n\",\"a\",\"H\"]",
        "explanation": "The string is reversed in-place."
      }
    ],
    "testCases": [
      {
        "input": "[\"h\",\"e\",\"l\",\"l\",\"o\"]",
        "expectedOutput": "[\"o\",\"l\",\"l\",\"e\",\"h\"]",
        "isHidden": false
      },
      {
        "input": "[\"A\",\" \",\"m\",\"a\",\"n\"]",
        "expectedOutput": "[\"n\",\"a\",\"m\",\" \",\"A\"]",
        "isHidden": true
      },
      {
        "input": "[\"a\"]",
        "expectedOutput": "[\"a\"]",
        "isHidden": true
      }
    ],
    "hints": [
      "Think about swapping characters from the beginning and the end of the array.",
      "Use two pointers, one starting at the beginning and one at the end.",
      "Move the pointers towards the center, swapping elements at each step."
    ],
    "solutions": [
      {
        "language": "javascript",
        "code": "var reverseString = function(s) {\n    let left = 0;\n    let right = s.length - 1;\n    while (left < right) {\n        // Swap elements\n        const temp = s[left];\n        s[left] = s[right];\n        s[right] = temp;\n        \n        // Move pointers\n        left++;\n        right--;\n    }\n};",
        "explanation": "This solution uses a classic two-pointer approach. One pointer `left` starts at the beginning (index 0) and one pointer `right` starts at the end. The loop continues as long as `left` is less than `right`. In each iteration, it swaps the characters at the `left` and `right` indices and then moves both pointers one step closer to the center.",
        "timeComplexity": "O(n)",
        "spaceComplexity": "O(1)"
      }
    ],
    "acceptanceRate": 72.5,
    "totalSubmissions": 12000,
    "correctSubmissions": 8700,
    "averageTime": 8
  },
  {
    "title": "Valid Parentheses",
    "description": "Given a string `s` containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.\n\nAn input string is valid if:\n1. Open brackets must be closed by the same type of brackets.\n2. Open brackets must be closed in the correct order.\n\n**Example 1:**\nInput: s = \"()\"\nOutput: true\n\n**Example 2:**\nInput: s = \"()[]{}\"\nOutput: true\n\n**Example 3:**\nInput: s = \"(]\"\nOutput: false\n\n**Constraints:**\n- 1 <= s.length <= 10^4\n- s consists of parentheses only '()[]{}'.",
    "difficulty": "easy",
    "topics": [
      "String",
      "Stack"
    ],
    "companies": [
      "Facebook",
      "Amazon",
      "LinkedIn",
      "Google"
    ],
    "constraints": [
      "1 <= s.length <= 10^4",
      "s consists of parentheses only '()[]{}'."
    ],
    "examples": [
      {
        "input": "s = \"()[]{}\"",
        "output": "true",
        "explanation": "All brackets are matched and closed correctly."
      },
      {
        "input": "s = \"(]\"",
        "output": "false",
        "explanation": "The open parenthesis is closed by an incorrect bracket."
      },
      {
        "input": "s = \"([)]\"",
        "output": "false",
        "explanation": "The brackets are closed in the wrong order."
      }
    ],
    "testCases": [
      {
        "input": "\"()\"",
        "expectedOutput": "true",
        "isHidden": false
      },
      {
        "input": "\"(]\"",
        "expectedOutput": "false",
        "isHidden": false
      },
      {
        "input": "\"{[]}\"",
        "expectedOutput": "true",
        "isHidden": true
      },
      {
        "input": "\"[\"",
        "expectedOutput": "false",
        "isHidden": true
      }
    ],
    "hints": [
      "Use a stack to keep track of opening brackets.",
      "When you encounter a closing bracket, check if the top of the stack is the matching opening bracket.",
      "If it matches, pop from the stack. If it doesn't, or if the stack is empty, the string is invalid.",
      "After iterating through the whole string, the stack must be empty for the string to be valid."
    ],
    "solutions": [
      {
        "language": "javascript",
        "code": "var isValid = function(s) {\n    const stack = [];\n    const map = {\n        '(': ')',\n        '{': '}',\n        '[': ']'\n    };\n\n    for (let i = 0; i < s.length; i++) {\n        const char = s[i];\n        if (map[char]) {\n            // It's an opening bracket\n            stack.push(char);\n        } else {\n            // It's a closing bracket\n            if (stack.length === 0) {\n                return false;\n            }\n            const lastOpen = stack.pop();\n            if (map[lastOpen] !== char) {\n                return false;\n            }\n        }\n    }\n\n    return stack.length === 0;\n};",
        "explanation": "This solution uses a stack and a hash map. The map stores the matching pairs of brackets. We iterate through the string. If we find an opening bracket, we push it onto the stack. If we find a closing bracket, we check if the stack is empty (which would be invalid) or if the top of the stack is the matching opening bracket. If it matches, we pop the stack. If it doesn't, the string is invalid. Finally, if the stack is empty after the loop, the string is valid.",
        "timeComplexity": "O(n)",
        "spaceComplexity": "O(n)"
      }
    ],
    "acceptanceRate": 39.8,
    "totalSubmissions": 25000,
    "correctSubmissions": 9950,
    "averageTime": 12
  },
  {
    "title": "Merge Two Sorted Lists",
    "description": "Merge two sorted linked lists and return it as a sorted list. The new list should be made by splicing together the nodes of the first two lists.\n\n(Note: Definition for singly-linked list is assumed)\n`function ListNode(val, next) {`\n`    this.val = (val===undefined ? 0 : val)`\n`    this.next = (next===undefined ? null : next)`\n`}`\n\n**Example 1:**\nInput: l1 = [1,2,4], l2 = [1,3,4]\nOutput: [1,1,2,3,4,4]\n\n**Example 2:**\nInput: l1 = [], l2 = []\nOutput: []\n\n**Example 3:**\nInput: l1 = [], l2 = [0]\nOutput: [0]\n\n**Constraints:**\n- The number of nodes in both lists is in the range [0, 50].\n- -100 <= Node.val <= 100\n- Both l1 and l2 are sorted in non-decreasing order.",
    "difficulty": "easy",
    "topics": [
      "Linked List",
      "Recursion"
    ],
    "companies": [
      "Amazon",
      "Microsoft",
      "Adobe",
      "Apple"
    ],
    "constraints": [
      "The number of nodes in both lists is in the range [0, 50].",
      "-100 <= Node.val <= 100",
      "Both l1 and l2 are sorted in non-decreasing order."
    ],
    "examples": [
      {
        "input": "l1 = [1,2,4], l2 = [1,3,4]",
        "output": "[1,1,2,3,4,4]",
        "explanation": "The lists are merged node by node, maintaining the sorted order."
      }
    ],
    "testCases": [
      {
        "input": "[1,2,4]\n[1,3,4]",
        "expectedOutput": "[1,1,2,3,4,4]",
        "isHidden": false
      },
      {
        "input": "[]\n[]",
        "expectedOutput": "[]",
        "isHidden": false
      },
      {
        "input": "[]\n[0]",
        "expectedOutput": "[0]",
        "isHidden": true
      }
    ],
    "hints": [
      "Create a dummy node to act as the head of the new list. This simplifies edge cases.",
      "Iterate through both lists, comparing the values of the current nodes.",
      "Append the smaller node to the new list and advance the pointer of that list.",
      "Once one list is exhausted, append the remainder of the other list."
    ],
    "solutions": [
      {
        "language": "javascript",
        "code": "/**\n * Definition for singly-linked list.\n * function ListNode(val, next) {\n * this.val = (val===undefined ? 0 : val)\n * this.next = (next===undefined ? null : next)\n * }\n */\nvar mergeTwoLists = function(l1, l2) {\n    let dummy = new ListNode();\n    let current = dummy;\n\n    while (l1 !== null && l2 !== null) {\n        if (l1.val < l2.val) {\n            current.next = l1;\n            l1 = l1.next;\n        } else {\n            current.next = l2;\n            l2 = l2.next;\n        }\n        current = current.next;\n    }\n\n    // Append the remaining nodes from the non-empty list\n    current.next = l1 !== null ? l1 : l2;\n\n    return dummy.next;\n};",
        "explanation": "This iterative solution uses a `dummy` node to act as a placeholder for the head of the merged list. A `current` pointer tracks the last node in the merged list. We iterate as long as both `l1` and `l2` have nodes, comparing their values and appending the smaller node to `current.next`. After the loop, one of the lists might still have remaining nodes; we append the rest of that list to the end. Finally, we return `dummy.next`, which is the true head of the merged list.",
        "timeComplexity": "O(n + m)",
        "spaceComplexity": "O(1)"
      }
    ],
    "acceptanceRate": 58.1,
    "totalSubmissions": 18000,
    "correctSubmissions": 10458,
    "averageTime": 10
  },
  {
    "title": "Best Time to Buy and Sell Stock",
    "description": "You are given an array `prices` where `prices[i]` is the price of a given stock on the `i`-th day.\n\nYou want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.\n\nReturn the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return 0.\n\n**Example 1:**\nInput: prices = [7,1,5,3,6,4]\nOutput: 5\nExplanation: Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5.\nNote that buying on day 2 and selling on day 1 is not allowed because you must buy before you sell.\n\n**Example 2:**\nInput: prices = [7,6,4,3,1]\nOutput: 0\nExplanation: In this case, no transactions are done, and the max profit = 0.\n\n**Constraints:**\n- 1 <= prices.length <= 10^5\n- 0 <= prices[i] <= 10^4",
    "difficulty": "easy",
    "topics": [
      "Array",
      "Dynamic Programming"
    ],
    "companies": [
      "Amazon",
      "Facebook",
      "Microsoft",
      "Bloomberg"
    ],
    "constraints": [
      "1 <= prices.length <= 10^5",
      "0 <= prices[i] <= 10^4"
    ],
    "examples": [
      {
        "input": "prices = [7,1,5,3,6,4]",
        "output": "5",
        "explanation": "Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5."
      },
      {
        "input": "prices = [7,6,4,3,1]",
        "output": "0",
        "explanation": "No transaction is made, so the max profit is 0."
      }
    ],
    "testCases": [
      {
        "input": "[7,1,5,3,6,4]",
        "expectedOutput": "5",
        "isHidden": false
      },
      {
        "input": "[7,6,4,3,1]",
        "expectedOutput": "0",
        "isHidden": false
      },
      {
        "input": "[2,4,1]",
        "expectedOutput": "2",
        "isHidden": true
      }
    ],
    "hints": [
      "You need to find the largest difference between two numbers in the array.",
      "The second number (selling price) must come after the first number (buying price).",
      "Keep track of the minimum price seen so far as you iterate through the array.",
      "At each day, calculate the potential profit if you sold today, using the minimum price seen so far. Update your maximum profit."
    ],
    "solutions": [
      {
        "language": "javascript",
        "code": "var maxProfit = function(prices) {\n    let minPrice = Infinity;\n    let maxProfit = 0;\n\n    for (let i = 0; i < prices.length; i++) {\n        if (prices[i] < minPrice) {\n            // Found a new minimum buying price\n            minPrice = prices[i];\n        } else if (prices[i] - minPrice > maxProfit) {\n            // Found a new maximum profit\n            maxProfit = prices[i] - minPrice;\n        }\n    }\n\n    return maxProfit;\n};",
        "explanation": "This solution iterates through the `prices` array just once. It maintains two variables: `minPrice` (the smallest price seen so far) and `maxProfit` (the maximum profit found so far). For each price, it first checks if this price is a new `minPrice`. If not, it checks if selling at this price (i.e., `prices[i] - minPrice`) would yield a new `maxProfit`. This ensures we are always buying at the lowest point *before* selling at the highest point.",
        "timeComplexity": "O(n)",
        "spaceComplexity": "O(1)"
      }
    ],
    "acceptanceRate": 51.3,
    "totalSubmissions": 20000,
    "correctSubmissions": 10260,
    "averageTime": 14
  },
  {
    "title": "Longest Substring Without Repeating Characters",
    "description": "Given a string `s`, find the length of the longest substring without repeating characters.\n\n**Example 1:**\nInput: s = \"abcabcbb\"\nOutput: 3\nExplanation: The answer is \"abc\", with the length of 3.\n\n**Example 2:**\nInput: s = \"bbbbb\"\nOutput: 1\nExplanation: The answer is \"b\", with the length of 1.\n\n**Example 3:**\nInput: s = \"pwwkew\"\nOutput: 3\nExplanation: The answer is \"wke\", with the length of 3.\nNotice that the answer must be a substring, \"pwke\" is a subsequence and not a substring.\n\n**Constraints:**\n- 0 <= s.length <= 5 * 10^4\n- s consists of English letters, digits, symbols and spaces.",
    "difficulty": "medium",
    "topics": [
      "String",
      "Hash Table",
      "Sliding Window"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Facebook",
      "Microsoft"
    ],
    "constraints": [
      "0 <= s.length <= 5 * 10^4",
      "s consists of English letters, digits, symbols and spaces."
    ],
    "examples": [
      {
        "input": "s = \"abcabcbb\"",
        "output": "3",
        "explanation": "The longest substring without repeating characters is \"abc\"."
      },
      {
        "input": "s = \"bbbbb\"",
        "output": "1",
        "explanation": "The longest substring without repeating characters is \"b\"."
      }
    ],
    "testCases": [
      {
        "input": "\"abcabcbb\"",
        "expectedOutput": "3",
        "isHidden": false
      },
      {
        "input": "\"bbbbb\"",
        "expectedOutput": "1",
        "isHidden": false
      },
      {
        "input": "\"pwwkew\"",
        "expectedOutput": "3",
        "isHidden": false
      },
      {
        "input": "\" \"",
        "expectedOutput": "1",
        "isHidden": true
      },
      {
        "input": "\"dvdf\"",
        "expectedOutput": "3",
        "isHidden": true
      }
    ],
    "hints": [
      "Use a 'sliding window' approach.",
      "Maintain a window (a substring) and a set or map to store the characters currently in that window.",
      "Expand the window by moving the right pointer. If you encounter a character already in the set, shrink the window from the left until the duplicate is removed.",
      "Keep track of the maximum window size seen."
    ],
    "solutions": [
      {
        "language": "javascript",
        "code": "var lengthOfLongestSubstring = function(s) {\n    let charSet = new Set();\n    let left = 0;\n    let maxLength = 0;\n\n    for (let right = 0; right < s.length; right++) {\n        // While the character is already in the set, shrink the window from the left\n        while (charSet.has(s[right])) {\n            charSet.delete(s[left]);\n            left++;\n        }\n        \n        // Add the new character to the set\n        charSet.add(s[right]);\n        \n        // Update the max length\n        maxLength = Math.max(maxLength, right - left + 1);\n    }\n\n    return maxLength;\n};",
        "explanation": "This solution uses the sliding window technique with two pointers, `left` and `right`, and a `Set` to store characters in the current window. The `right` pointer expands the window. If `s[right]` is already in the `charSet`, we shrink the window from the `left` by removing `s[left]` from the set and incrementing `left` until the duplicate is gone. After adding `s[right]` to the set, we update `maxLength` with the size of the current valid window (`right - left + 1`).",
        "timeComplexity": "O(n)",
        "spaceComplexity": "O(min(n, m))"
      }
    ],
    "acceptanceRate": 32.4,
    "totalSubmissions": 30000,
    "correctSubmissions": 9720,
    "averageTime": 25
  },
  {
    "title": "Add Two Numbers",
    "description": "You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.\n\nYou may assume the two numbers do not contain any leading zero, except the number 0 itself.\n\n**Example 1:**\nInput: l1 = [2,4,3], l2 = [5,6,4]\nOutput: [7,0,8]\nExplanation: 342 + 465 = 807.\n\n**Example 2:**\nInput: l1 = [0], l2 = [0]\nOutput: [0]\n\n**Constraints:**\n- The number of nodes in each linked list is in the range [1, 100].\n- 0 <= Node.val <= 9\n- It is guaranteed that the list represents a number that does not have leading zeros.",
    "difficulty": "medium",
    "topics": [
      "Linked List",
      "Math"
    ],
    "companies": [
      "Amazon",
      "Microsoft",
      "Google",
      "Facebook"
    ],
    "constraints": [
      "The number of nodes in each linked list is in the range [1, 100].",
      "0 <= Node.val <= 9",
      "It is guaranteed that the list represents a number that does not have leading zeros."
    ],
    "examples": [
      {
        "input": "l1 = [2,4,3], l2 = [5,6,4]",
        "output": "[7,0,8]",
        "explanation": "342 + 465 = 807. The result list is the reverse order [7,0,8]."
      }
    ],
    "testCases": [
      {
        "input": "[2,4,3]\n[5,6,4]",
        "expectedOutput": "[7,0,8]",
        "isHidden": false
      },
      {
        "input": "[0]\n[0]",
        "expectedOutput": "[0]",
        "isHidden": false
      },
      {
        "input": "[9,9,9,9,9,9,9]\n[9,9,9,9]",
        "expectedOutput": "[8,9,9,9,0,0,0,1]",
        "isHidden": true
      }
    ],
    "hints": [
      "Create a dummy head for the result list to simplify the code.",
      "Keep track of a `carry` value, initialized to 0.",
      "Iterate through both lists simultaneously. For each position, calculate the sum of the two digits plus the `carry`.",
      "The new digit for the result list is `sum % 10`, and the new `carry` is `Math.floor(sum / 10)`.",
      "After the loop, if the `carry` is still 1, add one more node to the result list."
    ],
    "solutions": [
      {
        "language": "javascript",
        "code": "/**\n * Definition for singly-linked list.\n * function ListNode(val, next) {\n * this.val = (val===undefined ? 0 : val)\n * this.next = (next===undefined ? null : next)\n * }\n */\nvar addTwoNumbers = function(l1, l2) {\n    let dummyHead = new ListNode(0);\n    let current = dummyHead;\n    let carry = 0;\n\n    let p1 = l1;\n    let p2 = l2;\n\n    while (p1 !== null || p2 !== null) {\n        const val1 = (p1 !== null) ? p1.val : 0;\n        const val2 = (p2 !== null) ? p2.val : 0;\n\n        const sum = val1 + val2 + carry;\n        carry = Math.floor(sum / 10);\n        const newDigit = sum % 10;\n\n        current.next = new ListNode(newDigit);\n        current = current.next;\n\n        if (p1 !== null) p1 = p1.next;\n        if (p2 !== null) p2 = p2.next;\n    }\n\n    if (carry > 0) {\n        current.next = new ListNode(carry);\n    }\n\n    return dummyHead.next;\n};",
        "explanation": "This solution iterates through both linked lists `l1` and `l2` at the same time. It uses a `dummyHead` to build the new result list and a `carry` variable to handle sums greater than 9. In each iteration, it sums the values from `l1` and `l2` (using 0 if a list has ended) and the `carry`. The new digit is `sum % 10`, and the new `carry` is `Math.floor(sum / 10)`. A new node with the digit is appended to the result list. If a carry remains after the loop, a final node is added.",
        "timeComplexity": "O(max(n, m))",
        "spaceComplexity": "O(max(n, m))"
      }
    ],
    "acceptanceRate": 37.6,
    "totalSubmissions": 22000,
    "correctSubmissions": 8272,
    "averageTime": 22
  },
  {
    "title": "3Sum",
    "description": "Given an integer array `nums`, return all the triplets `[nums[i], nums[j], nums[k]]` such that `i != j`, `i != k`, and `j != k`, and `nums[i] + nums[j] + nums[k] == 0`.\n\nNotice that the solution set must not contain duplicate triplets.\n\n**Example 1:**\nInput: nums = [-1,0,1,2,-1,-4]\nOutput: [[-1,-1,2],[-1,0,1]]\n\n**Example 2:**\nInput: nums = []\nOutput: []\n\n**Example 3:**\nInput: nums = [0]\nOutput: []\n\n**Constraints:**\n- 0 <= nums.length <= 3000\n- -10^5 <= nums[i] <= 10^5",
    "difficulty": "medium",
    "topics": [
      "Array",
      "Two Pointers",
      "Sorting"
    ],
    "companies": [
      "Amazon",
      "Facebook",
      "Google",
      "Microsoft"
    ],
    "constraints": [
      "0 <= nums.length <= 3000",
      "-10^5 <= nums[i] <= 10^5"
    ],
    "examples": [
      {
        "input": "nums = [-1,0,1,2,-1,-4]",
        "output": "[[-1,-1,2],[-1,0,1]]",
        "explanation": "The triplets [-1, 0, 1] and [-1, -1, 2] sum to zero. The order of the output and the order of the triplets does not matter."
      }
    ],
    "testCases": [
      {
        "input": "[-1,0,1,2,-1,-4]",
        "expectedOutput": "[[-1,-1,2],[-1,0,1]]",
        "isHidden": false
      },
      {
        "input": "[]",
        "expectedOutput": "[]",
        "isHidden": false
      },
      {
        "input": "[0,0,0,0]",
        "expectedOutput": "[[0,0,0]]",
        "isHidden": true
      }
    ],
    "hints": [
      "A brute-force solution would be O(n^3). Can we do better?",
      "Sorting the array first can help avoid duplicates and use other techniques.",
      "Fix one number and then try to find two other numbers that sum to the negative of the fixed number. This reduces the problem to 'Two Sum'.",
      "After sorting, you can use the 'Two Pointers' technique on the subarray to find the remaining two numbers efficiently."
    ],
    "solutions": [
      {
        "language": "javascript",
        "code": "var threeSum = function(nums) {\n    nums.sort((a, b) => a - b);\n    const result = [];\n\n    for (let i = 0; i < nums.length - 2; i++) {\n        // Skip duplicate values for the first number\n        if (i > 0 && nums[i] === nums[i - 1]) {\n            continue;\n        }\n\n        let left = i + 1;\n        let right = nums.length - 1;\n        const target = -nums[i];\n\n        while (left < right) {\n            const sum = nums[left] + nums[right];\n\n            if (sum === target) {\n                result.push([nums[i], nums[left], nums[right]]);\n                \n                // Skip duplicates for the second and third numbers\n                while (left < right && nums[left] === nums[left + 1]) left++;\n                while (left < right && nums[right] === nums[right - 1]) right--;\n\n                left++;\n                right--;\n            } else if (sum < target) {\n                left++;\n            } else {\n                right--;\n            }\n        }\n    }\n\n    return result;\n};",
        "explanation": "First, we sort the array. This allows us to use the two-pointer technique and easily skip duplicates. We iterate through the array with a for-loop, fixing the first number `nums[i]`. We then use two pointers, `left` and `right`, to scan the rest of the array (from `i+1` to the end). We look for a pair (`nums[left]`, `nums[right]`) that sums to `-nums[i]`. If the sum is too small, we move `left` right. If it's too large, we move `right` left. If we find a match, we add the triplet to the result and move both pointers, skipping any duplicate values to avoid duplicate triplets.",
        "timeComplexity": "O(n^2)",
        "spaceComplexity": "O(1) or O(n)"
      }
    ],
    "acceptanceRate": 28.9,
    "totalSubmissions": 19000,
    "correctSubmissions": 5491,
    "averageTime": 30
  },
  {
    "title": "Binary Tree Level Order Traversal",
    "description": "Given the `root` of a binary tree, return the level order traversal of its nodes' values. (i.e., from left to right, level by level).\n\n(Note: Definition for a binary tree node is assumed)\n`function TreeNode(val, left, right) {`\n`    this.val = (val===undefined ? 0 : val)`\n`    this.left = (left===undefined ? null : left)`\n`    this.right = (right===undefined ? null : right)`\n`}`\n\n**Example 1:**\nInput: root = [3,9,20,null,null,15,7]\nOutput: [[3],[9,20],[15,7]]\n\n**Example 2:**\nInput: root = [1]\nOutput: [[1]]\n\n**Example 3:**\nInput: root = []\nOutput: []\n\n**Constraints:**\n- The number of nodes in the tree is in the range [0, 2000].\n- -1000 <= Node.val <= 1000",
    "difficulty": "medium",
    "topics": [
      "Tree",
      "Breadth-First Search (BFS)",
      "Queue"
    ],
    "companies": [
      "Amazon",
      "Microsoft",
      "Facebook",
      "LinkedIn"
    ],
    "constraints": [
      "The number of nodes in the tree is in the range [0, 2000].",
      "-1000 <= Node.val <= 1000"
    ],
    "examples": [
      {
        "input": "root = [3,9,20,null,null,15,7]",
        "output": "[[3],[9,20],[15,7]]",
        "explanation": "Level 0: [3], Level 1: [9, 20], Level 2: [15, 7]"
      }
    ],
    "testCases": [
      {
        "input": "[3,9,20,null,null,15,7]",
        "expectedOutput": "[[3],[9,20],[15,7]]",
        "isHidden": false
      },
      {
        "input": "[1]",
        "expectedOutput": "[[1]]",
        "isHidden": false
      },
      {
        "input": "[]",
        "expectedOutput": "[]",
        "isHidden": false
      }
    ],
    "hints": [
      "This problem is a classic Breadth-First Search (BFS).",
      "Use a queue to store nodes that need to be visited.",
      "Start by adding the root node to the queue.",
      "In a loop, process all nodes at the current level. Get the size of the queue (that's the number of nodes at this level).",
      "Dequeue each node, add its value to a 'current level' list, and enqueue its children (if they exist).",
      "After processing all nodes at the current level, add the 'current level' list to your final result."
    ],
    "solutions": [
      {
        "language": "javascript",
        "code": "/**\n * Definition for a binary tree node.\n * function TreeNode(val, left, right) {\n * this.val = (val===undefined ? 0 : val)\n * this.left = (left===undefined ? null : left)\n * this.right = (right===undefined ? null : right)\n * }\n */\nvar levelOrder = function(root) {\n    if (!root) {\n        return [];\n    }\n\n    const result = [];\n    const queue = [root]; // Use array as a queue\n\n    while (queue.length > 0) {\n        const levelSize = queue.length;\n        const currentLevel = [];\n\n        for (let i = 0; i < levelSize; i++) {\n            // Dequeue\n            const node = queue.shift();\n            currentLevel.push(node.val);\n\n            // Enqueue children\n            if (node.left) {\n                queue.push(node.left);\n            }\n            if (node.right) {\n                queue.push(node.right);\n            }\n        }\n        result.push(currentLevel);\n    }\n\n    return result;\n};",
        "explanation": "This solution uses a queue to perform a Breadth-First Search (BFS). We initialize the queue with the `root` node. The main `while` loop runs as long as the queue is not empty. Inside the loop, we first get the `levelSize` (the number of nodes at the current level). We then run a `for` loop `levelSize` times to process exactly that many nodes. In this inner loop, we `shift` (dequeue) a node, add its value to the `currentLevel` array, and `push` (enqueue) its left and right children. After the inner loop finishes, all nodes for the current level have been processed, so we add the `currentLevel` array to our `result`.",
        "timeComplexity": "O(n)",
        "spaceComplexity": "O(n)"
      }
    ],
    "acceptanceRate": 60.1,
    "totalSubmissions": 15000,
    "correctSubmissions": 9015,
    "averageTime": 18
  },
  {
    "title": "Median of Two Sorted Arrays",
    "description": "Given two sorted arrays `nums1` and `nums2` of size `m` and `n` respectively, return the median of the two sorted arrays.\n\nThe overall run time complexity should be O(log (m+n)).\n\n**Example 1:**\nInput: nums1 = [1,3], nums2 = [2]\nOutput: 2.00000\nExplanation: merged array = [1,2,3] and median is 2.\n\n**Example 2:**\nInput: nums1 = [1,2], nums2 = [3,4]\nOutput: 2.50000\nExplanation: merged array = [1,2,3,4] and median is (2 + 3) / 2 = 2.5.\n\n**Constraints:**\n- nums1.length == m\n- nums2.length == n\n- 0 <= m <= 1000\n- 0 <= n <= 1000\n- 1 <= m + n <= 2000\n- -10^6 <= nums1[i], nums2[i] <= 10^6",
    "difficulty": "hard",
    "topics": [
      "Array",
      "Binary Search",
      "Divide and Conquer"
    ],
    "companies": [
      "Google",
      "Amazon",
      "Apple",
      "Microsoft"
    ],
    "constraints": [
      "nums1.length == m",
      "nums2.length == n",
      "0 <= m <= 1000",
      "0 <= n <= 1000",
      "1 <= m + n <= 2000",
      "-10^6 <= nums1[i], nums2[i] <= 10^6"
    ],
    "examples": [
      {
        "input": "nums1 = [1,3], nums2 = [2]",
        "output": "2.00000",
        "explanation": "The merged sorted array is [1,2,3]. The median is the middle element, 2."
      },
      {
        "input": "nums1 = [1,2], nums2 = [3,4]",
        "output": "2.50000",
        "explanation": "The merged sorted array is [1,2,3,4]. The median is the average of the two middle elements, (2 + 3) / 2 = 2.5."
      }
    ],
    "testCases": [
      {
        "input": "[1,3]\n[2]",
        "expectedOutput": "2.0",
        "isHidden": false
      },
      {
        "input": "[1,2]\n[3,4]",
        "expectedOutput": "2.5",
        "isHidden": false
      },
      {
        "input": "[0,0]\n[0,0]",
        "expectedOutput": "0.0",
        "isHidden": true
      },
      {
        "input": "[]\n[1]",
        "expectedOutput": "1.0",
        "isHidden": true
      }
    ],
    "hints": [
      "A simple solution would be to merge the two arrays, which takes O(m+n) time. The problem asks for O(log(m+n)).",
      "This suggests a binary search approach.",
      "The problem is equivalent to finding the k-th smallest element in the combined array, where k is related to the median.",
      "Try to partition both arrays such that all elements in the left partitions are smaller than all elements in the right partitions, and the sizes of the left partitions add up to the required amount."
    ],
    "solutions": [
      {
        "language": "javascript",
        "code": "var findMedianSortedArrays = function(nums1, nums2) {\n    // Ensure nums1 is the smaller array\n    if (nums1.length > nums2.length) {\n        return findMedianSortedArrays(nums2, nums1);\n    }\n\n    const m = nums1.length;\n    const n = nums2.length;\n    let low = 0;\n    let high = m;\n    const halfLen = Math.floor((m + n + 1) / 2);\n\n    while (low <= high) {\n        const partitionX = Math.floor((low + high) / 2);\n        const partitionY = halfLen - partitionX;\n\n        const maxLeftX = (partitionX === 0) ? -Infinity : nums1[partitionX - 1];\n        const minRightX = (partitionX === m) ? Infinity : nums1[partitionX];\n\n        const maxLeftY = (partitionY === 0) ? -Infinity : nums2[partitionY - 1];\n        const minRightY = (partitionY === n) ? Infinity : nums2[partitionY];\n\n        if (maxLeftX <= minRightY && maxLeftY <= minRightX) {\n            // Found the correct partition\n            if ((m + n) % 2 === 0) {\n                // Even total length\n                return (Math.max(maxLeftX, maxLeftY) + Math.min(minRightX, minRightY)) / 2;\n            } else {\n                // Odd total length\n                return Math.max(maxLeftX, maxLeftY);\n            }\n        } else if (maxLeftX > minRightY) {\n            // Move partitionX to the left\n            high = partitionX - 1;\n        } else {\n            // Move partitionX to the right\n            low = partitionX + 1;\n        }\n    }\n};",
        "explanation": "This solution uses binary search on the smaller array (`nums1`) to find the correct partition point. The goal is to partition both arrays into left and right halves such that `max(left_half) <= min(right_half)` and the total number of elements in the left halves is `(m+n+1)/2`. `partitionX` is the cut point in `nums1`, and `partitionY` is calculated based on it. We check the boundary elements (`maxLeftX`, `minRightX`, `maxLeftY`, `minRightY`). If the partition is correct, we calculate the median based on whether the total length is odd or even. If not, we adjust the binary search range (`low` or `high`) based on which condition failed.",
        "timeComplexity": "O(log(min(m, n)))",
        "spaceComplexity": "O(1)"
      }
    ],
    "acceptanceRate": 33.1,
    "totalSubmissions": 10000,
    "correctSubmissions": 3310,
    "averageTime": 45
  },
  {
    "title": "Trapping Rain Water",
    "description": "Given `n` non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.\n\n**Example 1:**\nInput: height = [0,1,0,2,1,0,1,3,2,1,2,1]\nOutput: 6\nExplanation: The above elevation map is represented by [0,1,0,2,1,0,1,3,2,1,2,1]. In this case, 6 units of rain water are being trapped.\n\n**Example 2:**\nInput: height = [4,2,0,3,2,5]\nOutput: 9\n\n**Constraints:**\n- n == height.length\n- 1 <= n <= 2 * 10^4\n- 0 <= height[i] <= 10^5",
    "difficulty": "hard",
    "topics": [
      "Array",
      "Two Pointers",
      "Dynamic Programming",
      "Stack"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Facebook",
      "Apple"
    ],
    "constraints": [
      "n == height.length",
      "1 <= n <= 2 * 10^4",
      "0 <= height[i] <= 10^5"
    ],
    "examples": [
      {
        "input": "height = [0,1,0,2,1,0,1,3,2,1,2,1]",
        "output": "6",
        "explanation": "The elevation map traps 6 units of water."
      },
      {
        "input": "height = [4,2,0,3,2,5]",
        "output": "9",
        "explanation": "The elevation map traps 9 units of water."
      }
    ],
    "testCases": [
      {
        "input": "[0,1,0,2,1,0,1,3,2,1,2,1]",
        "expectedOutput": "6",
        "isHidden": false
      },
      {
        "input": "[4,2,0,3,2,5]",
        "expectedOutput": "9",
        "isHidden": false
      },
      {
        "input": "[4,2,3]",
        "expectedOutput": "1",
        "isHidden": true
      }
    ],
    "hints": [
      "The amount of water trapped at any position `i` is determined by `min(max_left_height, max_right_height) - height[i]`.",
      "One approach is to precompute the maximum height to the left and maximum height to the right for every position. This takes O(n) time and O(n) space.",
      "Can we do it with O(1) space? Think about the two-pointer approach.",
      "Use a left pointer and a right pointer, and maintain `maxLeft` and `maxRight` heights seen so far."
    ],
    "solutions": [
      {
        "language": "javascript",
        "code": "var trap = function(height) {\n    if (!height || height.length === 0) {\n        return 0;\n    }\n\n    let left = 0;\n    let right = height.length - 1;\n    let leftMax = 0;\n    let rightMax = 0;\n    let totalWater = 0;\n\n    while (left < right) {\n        if (height[left] < height[right]) {\n            // Process from the left side\n            if (height[left] >= leftMax) {\n                // New left max, no water can be trapped at this_position\n                leftMax = height[left];\n            } else {\n                // Trap water\n                totalWater += leftMax - height[left];\n            }\n            left++;\n        } else {\n            // Process from the right side\n            if (height[right] >= rightMax) {\n                // New right max, no water can be trapped\n                rightMax = height[right];\n            } else {\n                // Trap water\n                totalWater += rightMax - height[right];\n            }\n            right--;\n        }\n    }\n\n    return totalWater;\n};",
        "explanation": "This solution uses an optimized two-pointer approach with O(1) space. We maintain `left` and `right` pointers, and `leftMax` and `rightMax` variables. The key insight is that the water trapped at any point is limited by the *smaller* of the `leftMax` and `rightMax`. We move the smaller pointer inwards. If `height[left] < height[right]`, we know that the water level at `left` is determined by `leftMax` (since `rightMax` is guaranteed to be at least as high as `height[right]`, which is higher than `height[left]`). We either update `leftMax` or add trapped water (`leftMax - height[left]`) to the total. A symmetric operation is performed if `height[right]` is smaller.",
        "timeComplexity": "O(n)",
        "spaceComplexity": "O(1)"
      }
    ],
    "acceptanceRate": 53.7,
    "totalSubmissions": 11000,
    "correctSubmissions": 5907,
    "averageTime": 35
  },
  {
    "title": "Valid Anagram",
    "description": "Given two strings `s` and `t`, return `true` if `t` is an anagram of `s`, and `false` otherwise.\n\nAn **Anagram** is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.\n\n**Example 1:**\nInput: s = \"anagram\", t = \"nagaram\"\nOutput: true\n\n**Example 2:**\nInput: s = \"rat\", t = \"car\"\nOutput: false\n\n**Constraints:**\n- 1 <= s.length, t.length <= 5 * 10^4\n- s and t consist of lowercase English letters.",
    "difficulty": "easy",
    "topics": [
      "String",
      "Hash Table",
      "Sorting"
    ],
    "companies": [
      "Amazon",
      "Facebook",
      "Uber",
      "Yelp"
    ],
    "constraints": [
      "1 <= s.length, t.length <= 5 * 10^4",
      "s and t consist of lowercase English letters."
    ],
    "examples": [
      {
        "input": "s = \"anagram\", t = \"nagaram\"",
        "output": "true",
        "explanation": "Both strings contain the same characters with the same frequency."
      },
      {
        "input": "s = \"rat\", t = \"car\"",
        "output": "false",
        "explanation": "The characters are different."
      }
    ],
    "testCases": [
      {
        "input": "\"anagram\"\n\"nagaram\"",
        "expectedOutput": "true",
        "isHidden": false
      },
      {
        "input": "\"rat\"\n\"car\"",
        "expectedOutput": "false",
        "isHidden": false
      },
      {
        "input": "\"aacc\"\n\"ccac\"",
        "expectedOutput": "false",
        "isHidden": true
      }
    ],
    "hints": [
      "How can you check if two strings have the same characters with the same frequency?",
      "One way is to use a hash map (or an array of size 26) to store the character counts for the first string, and then decrement the counts using the second string. If all counts are zero at the end, they are anagrams.",
      "Alternatively, what happens if you sort both strings?"
    ],
    "solutions": [
      {
        "language": "javascript",
        "code": "var isAnagram = function(s, t) {\n    if (s.length !== t.length) {\n        return false;\n    }\n\n    const charCount = new Array(26).fill(0);\n    const baseCode = 'a'.charCodeAt(0);\n\n    for (let i = 0; i < s.length; i++) {\n        charCount[s.charCodeAt(i) - baseCode]++;\n        charCount[t.charCodeAt(i) - baseCode]--;\n    }\n\n    for (let i = 0; i < 26; i++) {\n        if (charCount[i] !== 0) {\n            return false;\n        }\n    }\n\n    return true;\n};",
        "explanation": "This solution uses a frequency array `charCount` of size 26 (for the 26 lowercase English letters). It first checks if the lengths are different, which would mean they can't be anagrams. It then iterates through both strings simultaneously, incrementing the count for the character in `s` and decrementing for the character in `t`. Finally, it checks if all counts in the `charCount` array are zero. If they are, the strings are anagrams.",
        "timeComplexity": "O(n)",
        "spaceComplexity": "O(1)"
      }
    ],
    "acceptanceRate": 59.2,
    "totalSubmissions": 15000,
    "correctSubmissions": 8880,
    "averageTime": 10
  },
  {
    "title": "Invert Binary Tree",
    "description": "Given the `root` of a binary tree, invert the tree, and return its root.\n\n(Note: Definition for a binary tree node is assumed)\n`function TreeNode(val, left, right) {`\n`    this.val = (val===undefined ? 0 : val)`\n`    this.left = (left===undefined ? null : left)`\n`    this.right = (right===undefined ? null : right)`\n`}`\n\n**Example 1:**\nInput: root = [4,2,7,1,3,6,9]\nOutput: [4,7,2,9,6,3,1]\n\n**Example 2:**\nInput: root = [2,1,3]\nOutput: [2,3,1]\n\n**Example 3:**\nInput: root = []\nOutput: []\n\n**Constraints:**\n- The number of nodes in the tree is in the range [0, 100].\n- -100 <= Node.val <= 100",
    "difficulty": "easy",
    "topics": [
      "Tree",
      "Recursion",
      "Depth-First Search",
      "Breadth-First Search"
    ],
    "companies": [
      "Google",
      "Apple",
      "Amazon",
      "Microsoft"
    ],
    "constraints": [
      "The number of nodes in the tree is in the range [0, 100].",
      "-100 <= Node.val <= 100"
    ],
    "examples": [
      {
        "input": "root = [4,2,7,1,3,6,9]",
        "output": "[4,7,2,9,6,3,1]",
        "explanation": "The left and right children of every node are swapped."
      }
    ],
    "testCases": [
      {
        "input": "[4,2,7,1,3,6,9]",
        "expectedOutput": "[4,7,2,9,6,3,1]",
        "isHidden": false
      },
      {
        "input": "[]",
        "expectedOutput": "[]",
        "isHidden": false
      },
      {
        "input": "[1,2]",
        "expectedOutput": "[1,null,2]",
        "isHidden": true
      }
    ],
    "hints": [
      "Think recursively. What is the base case for the recursion?",
      "If you are at a node, what do you need to do? You need to swap its left and right children.",
      "After swapping, you need to recursively invert the (new) left and right subtrees."
    ],
    "solutions": [
      {
        "language": "javascript",
        "code": "/**\n * Definition for a binary tree node.\n * function TreeNode(val, left, right) {\n * this.val = (val===undefined ? 0 : val)\n * this.left = (left===undefined ? null : left)\n * this.right = (right===undefined ? null : right)\n * }\n */\nvar invertTree = function(root) {\n    if (root === null) {\n        return null;\n    }\n\n    // Swap the children\n    const temp = root.left;\n    root.left = root.right;\n    root.right = temp;\n\n    // Recursively invert the subtrees\n    invertTree(root.left);\n    invertTree(root.right);\n\n    return root;\n};",
        "explanation": "This is a classic recursive solution. The base case is when the `root` is `null`, in which case we return `null`. For any non-null node, we first swap its left and right children. Then, we make recursive calls to `invertTree` for the new left subtree and the new right subtree. Finally, we return the `root` itself.",
        "timeComplexity": "O(n)",
        "spaceComplexity": "O(h)"
      }
    ],
    "acceptanceRate": 75.1,
    "totalSubmissions": 13000,
    "correctSubmissions": 9763,
    "averageTime": 7
  },
  {
    "title": "Container With Most Water",
    "description": "You are given an integer array `height` of length `n`. There are `n` vertical lines drawn such that the two endpoints of the `i`-th line are `(i, 0)` and `(i, height[i])`.\n\nFind two lines that together with the x-axis form a container, such that the container contains the most water.\n\nReturn the maximum amount of water a container can store. Notice that you may not slant the container.\n\n**Example 1:**\nInput: height = [1,8,6,2,5,4,8,3,7]\nOutput: 49\nExplanation: The vertical lines are represented by [1,8,6,2,5,4,8,3,7]. The max area is formed by the lines at index 1 (height 8) and index 8 (height 7). Area = 7 * (8-1) = 49.\n\n**Constraints:**\n- n == height.length\n- 2 <= n <= 10^5\n- 0 <= height[i] <= 10^4",
    "difficulty": "medium",
    "topics": [
      "Array",
      "Two Pointers"
    ],
    "companies": [
      "Google",
      "Amazon",
      "Facebook",
      "Microsoft"
    ],
    "constraints": [
      "n == height.length",
      "2 <= n <= 10^5",
      "0 <= height[i] <= 10^4"
    ],
    "examples": [
      {
        "input": "height = [1,8,6,2,5,4,8,3,7]",
        "output": "49",
        "explanation": "The maximum water (blue section) is 49."
      },
      {
        "input": "height = [1,1]",
        "output": "1",
        "explanation": "The only possible container has area 1."
      }
    ],
    "testCases": [
      {
        "input": "[1,8,6,2,5,4,8,3,7]",
        "expectedOutput": "49",
        "isHidden": false
      },
      {
        "input": "[1,1]",
        "expectedOutput": "1",
        "isHidden": false
      },
      {
        "input": "[2,3,4,5,18,17,6]",
        "expectedOutput": "17",
        "isHidden": true
      }
    ],
    "hints": [
      "A brute-force O(n^2) solution exists by checking every pair of lines. How can we optimize this?",
      "Use two pointers, one at the start (`left`) and one at the end (`right`) of the array.",
      "The area is calculated as `width * height = (right - left) * min(height[left], height[right])`.",
      "To find a potentially larger area, which pointer should you move? Moving the pointer with the taller line is never beneficial, as the area will be limited by the shorter line and the width will decrease. Therefore, always move the pointer with the shorter line."
    ],
    "solutions": [
      {
        "language": "javascript",
        "code": "var maxArea = function(height) {\n    let left = 0;\n    let right = height.length - 1;\n    let maxWater = 0;\n\n    while (left < right) {\n        const width = right - left;\n        const h = Math.min(height[left], height[right]);\n        const currentWater = width * h;\n        maxWater = Math.max(maxWater, currentWater);\n\n        // Move the pointer that points to the shorter line\n        if (height[left] < height[right]) {\n            left++;\n        } else {\n            right--;\n        }\n    }\n\n    return maxWater;\n};",
        "explanation": "This solution uses a two-pointer approach. We start with the widest possible container (using the first and last lines). We calculate the area and update `maxWater`. Then, we try to find a larger area by moving one of the pointers. The key insight is to always move the pointer corresponding to the shorter of the two lines. This is because moving the taller pointer will only decrease the width, and the height is already limited by the shorter side, so the area can only decrease. By moving the shorter pointer, we give up the smallest limiting factor in hopes of finding a taller line, which could create a larger area despite the reduced width.",
        "timeComplexity": "O(n)",
        "spaceComplexity": "O(1)"
      }
    ],
    "acceptanceRate": 53.4,
    "totalSubmissions": 17000,
    "correctSubmissions": 9078,
    "averageTime": 19
  },
  {
    "title": "Kth Smallest Element in a BST",
    "description": "Given the `root` of a binary search tree (BST), and an integer `k`, return the `k`-th smallest element (1-indexed) in the tree.\n\n**Example 1:**\nInput: root = [3,1,4,null,2], k = 1\nOutput: 1\n\n**Example 2:**\nInput: root = [5,3,6,2,4,null,null,1], k = 3\nOutput: 3\n\n**Constraints:**\n- The number of nodes in the tree is `n`.\n- 1 <= k <= n <= 10^4\n- 0 <= Node.val <= 10^4",
    "difficulty": "medium",
    "topics": [
      "Tree",
      "Binary Search Tree",
      "Inorder Traversal",
      "DFS"
    ],
    "companies": [
      "Amazon",
      "Facebook",
      "Google",
      "Bloomberg"
    ],
    "constraints": [
      "The number of nodes in the tree is n.",
      "1 <= k <= n <= 10^4",
      "0 <= Node.val <= 10^4"
    ],
    "examples": [
      {
        "input": "root = [3,1,4,null,2], k = 1",
        "output": "1",
        "explanation": "The 1st smallest element is 1."
      },
      {
        "input": "root = [5,3,6,2,4,null,null,1], k = 3",
        "output": "3",
        "explanation": "The sorted elements are [1, 2, 3, 4, 5, 6]. The 3rd smallest is 3."
      }
    ],
    "testCases": [
      {
        "input": "[3,1,4,null,2]\n1",
        "expectedOutput": "1",
        "isHidden": false
      },
      {
        "input": "[5,3,6,2,4,null,null,1]\n3",
        "expectedOutput": "3",
        "isHidden": false
      },
      {
        "input": "[1]\n1",
        "expectedOutput": "1",
        "isHidden": true
      }
    ],
    "hints": [
      "What property of a BST is useful here?",
      "An in-order traversal (Left, Root, Right) of a BST visits the nodes in sorted, ascending order.",
      "Perform an in-order traversal and stop when you have visited `k` nodes. The `k`-th node you visit is the answer.",
      "You can do this recursively or iteratively with a stack."
    ],
    "solutions": [
      {
        "language": "javascript",
        "code": "/**\n * Definition for a binary tree node.\n * function TreeNode(val, left, right) {\n * this.val = (val===undefined ? 0 : val)\n * this.left = (left===undefined ? null : left)\n * this.right = (right===undefined ? null : right)\n * }\n */\nvar kthSmallest = function(root, k) {\n    const stack = [];\n    let count = 0;\n\n    while (root || stack.length > 0) {\n        // Go left as far as possible\n        while (root) {\n            stack.push(root);\n            root = root.left;\n        }\n\n        // Process the node\n        root = stack.pop();\n        count++;\n\n        if (count === k) {\n            return root.val;\n        }\n\n        // Go right\n        root = root.right;\n    }\n};",
        "explanation": "This solution performs an iterative in-order traversal of the BST using a stack. The in-order traversal visits nodes in ascending order. We keep pushing nodes onto the stack as we traverse left. When we can't go left anymore, we pop a node from the stack, increment our `count`, and check if this is the `k`-th node. If it is, we return its value. If not, we move to the node's right child and repeat the process. This is more efficient than building a full sorted array, as it stops as soon as the `k`-th element is found.",
        "timeComplexity": "O(H + k)",
        "spaceComplexity": "O(H)"
      }
    ],
    "acceptanceRate": 65.8,
    "totalSubmissions": 10000,
    "correctSubmissions": 6580,
    "averageTime": 16
  },
  {
    "title": "Product of Array Except Self",
    "description": "Given an integer array `nums`, return an array `answer` such that `answer[i]` is equal to the product of all the elements of `nums` except `nums[i]`.\n\nThe product of any prefix or suffix of `nums` is guaranteed to fit in a 32-bit integer.\n\nYou must write an algorithm that runs in O(n) time and without using the division operation.\n\n**Example 1:**\nInput: nums = [1,2,3,4]\nOutput: [24,12,8,6]\n\n**Example 2:**\nInput: nums = [-1,1,0,-3,3]\nOutput: [0,0,9,0,0]\n\n**Constraints:**\n- 2 <= nums.length <= 10^5\n- -30 <= nums[i] <= 30\n- The product of any prefix or suffix of `nums` is guaranteed to fit in a 32-bit integer.",
    "difficulty": "medium",
    "topics": [
      "Array",
      "Prefix Sum"
    ],
    "companies": [
      "Amazon",
      "Microsoft",
      "Facebook",
      "Apple"
    ],
    "constraints": [
      "2 <= nums.length <= 10^5",
      "-30 <= nums[i] <= 30",
      "Must run in O(n) time and without division."
    ],
    "examples": [
      {
        "input": "nums = [1,2,3,4]",
        "output": "[24,12,8,6]",
        "explanation": "answer[0] = 2*3*4=24, answer[1] = 1*3*4=12, answer[2] = 1*2*4=8, answer[3] = 1*2*3=6"
      }
    ],
    "testCases": [
      {
        "input": "[1,2,3,4]",
        "expectedOutput": "[24,12,8,6]",
        "isHidden": false
      },
      {
        "input": "[-1,1,0,-3,3]",
        "expectedOutput": "[0,0,9,0,0]",
        "isHidden": false
      },
      {
        "input": "[1,0]",
        "expectedOutput": "[0,1]",
        "isHidden": true
      }
    ],
    "hints": [
      "The product at index `i` is (product of all elements to the left of `i`) * (product of all elements to the right of `i`).",
      "You can create two arrays: one storing the prefix products from left to right, and one storing the postfix products from right to left.",
      "The final answer at `i` would be `prefix[i-1] * postfix[i+1]`.",
      "Can you optimize this from O(n) space to O(1) space (excluding the output array)?"
    ],
    "solutions": [
      {
        "language": "javascript",
        "code": "var productExceptSelf = function(nums) {\n    const n = nums.length;\n    const answer = new Array(n);\n\n    // 1. Calculate left prefix products\n    // answer[i] will store the product of all elements to the left of i\n    answer[0] = 1;\n    for (let i = 1; i < n; i++) {\n        answer[i] = answer[i - 1] * nums[i - 1];\n    }\n\n    // 2. Calculate right products and multiply with left products\n    // Use a variable to store the running product from the right\n    let rightProduct = 1;\n    for (let i = n - 1; i >= 0; i--) {\n        // answer[i] already has the left product\n        // Multiply it by the right product\n        answer[i] = answer[i] * rightProduct;\n        \n        // Update the right product for the next iteration\n        rightProduct = rightProduct * nums[i];\n    }\n\n    return answer;\n};",
        "explanation": "This solution achieves O(n) time and O(1) extra space (the `answer` array doesn't count as extra space). It works in two passes. In the first pass (left-to-right), `answer[i]` is populated with the product of all elements to the left of `i`. In the second pass (right-to-left), a variable `rightProduct` keeps track of the product of all elements to the right. We multiply `answer[i]` (which holds the left product) by `rightProduct` to get the final result, and then update `rightProduct` for the next element to the left.",
        "timeComplexity": "O(n)",
        "spaceComplexity": "O(1)"
      }
    ],
    "acceptanceRate": 61.5,
    "totalSubmissions": 14000,
    "correctSubmissions": 8610,
    "averageTime": 17
  },
  {
    "title": "Coin Change",
    "description": "You are given an integer array `coins` representing coins of different denominations and an integer `amount` representing a total amount of money.\n\nReturn the fewest number of coins that you need to make up that amount. If that amount of money cannot be made up by any combination of the coins, return -1.\n\nYou may assume that you have an infinite number of each kind of coin.\n\n**Example 1:**\nInput: coins = [1,2,5], amount = 11\nOutput: 3\nExplanation: 11 = 5 + 5 + 1\n\n**Example 2:**\nInput: coins = [2], amount = 3\nOutput: -1\n\n**Example 3:**\nInput: coins = [1], amount = 0\nOutput: 0\n\n**Constraints:**\n- 1 <= coins.length <= 12\n- 1 <= coins[i] <= 2^31 - 1\n- 0 <= amount <= 10^4",
    "difficulty": "medium",
    "topics": [
      "Dynamic Programming",
      "Memoization"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Microsoft",
      "Capital One"
    ],
    "constraints": [
      "1 <= coins.length <= 12",
      "1 <= coins[i] <= 2^31 - 1",
      "0 <= amount <= 10^4"
    ],
    "examples": [
      {
        "input": "coins = [1,2,5], amount = 11",
        "output": "3",
        "explanation": "The fewest coins is 3: (5 + 5 + 1)."
      },
      {
        "input": "coins = [2], amount = 3",
        "output": "-1",
        "explanation": "It's impossible to make 3 using only 2-value coins."
      }
    ],
    "testCases": [
      {
        "input": "[1,2,5]\n11",
        "expectedOutput": "3",
        "isHidden": false
      },
      {
        "input": "[2]\n3",
        "expectedOutput": "-1",
        "isHidden": false
      },
      {
        "input": "[1]\n0",
        "expectedOutput": "0",
        "isHidden": false
      },
      {
        "input": "[1,2147483647]\n2",
        "expectedOutput": "2",
        "isHidden": true
      }
    ],
    "hints": [
      "This is a classic Dynamic Programming problem.",
      "Think from the bottom up. How many coins does it take to make amount 0? 1? 2? ... up to `amount`?",
      "Let `dp[i]` be the minimum number of coins to make amount `i`.",
      "`dp[0]` is 0. For any other amount `i`, `dp[i]` can be found by looking at `dp[i - coin] + 1` for every coin in `coins`. You should take the minimum of these values.",
      "Initialize the `dp` array with a large value (like `amount + 1` or `Infinity`) to represent that the amount is unreachable."
    ],
    "solutions": [
      {
        "language": "javascript",
        "code": "var coinChange = function(coins, amount) {\n    // Create a DP array, initialized to a value larger than any possible answer\n    // dp[i] will store the min coins to make amount i\n    const dp = new Array(amount + 1).fill(amount + 1);\n\n    // Base case: 0 coins are needed to make amount 0\n    dp[0] = 0;\n\n    // Build the DP table from 1 up to amount\n    for (let i = 1; i <= amount; i++) {\n        // Try every coin\n        for (const coin of coins) {\n            if (coin <= i) {\n                // If this coin can be used, check if it gives a better (smaller) result\n                dp[i] = Math.min(dp[i], dp[i - coin] + 1);\n            }\n        }\n    }\n\n    // If dp[amount] is still the initial value, it means it's not possible to form that amount\n    return dp[amount] > amount ? -1 : dp[amount];\n};",
        "explanation": "This solution uses bottom-up Dynamic Programming. We create an array `dp` of size `amount + 1`. `dp[i]` will store the minimum number of coins needed to make the sum `i`. We initialize all values to `amount + 1` (a sentinel value representing infinity) and set `dp[0] = 0` (0 coins make 0 amount). Then, we iterate from 1 to `amount`. For each amount `i`, we iterate through our `coins`. If a `coin` is less than or equal to `i`, we can potentially use it. The number of coins to make `i` would be `dp[i - coin] + 1`. We take the minimum of all such possibilities to find the optimal `dp[i]`. Finally, if `dp[amount]` is still our sentinel value, it's impossible, so we return -1; otherwise, we return `dp[amount]`.",
        "timeComplexity": "O(amount * n)",
        "spaceComplexity": "O(amount)"
      }
    ],
    "acceptanceRate": 38.9,
    "totalSubmissions": 16000,
    "correctSubmissions": 6224,
    "averageTime": 28
  },
  {
    "title": "Find Minimum in Rotated Sorted Array",
    "description": "Suppose an array of length `n` sorted in ascending order is rotated between 1 and `n` times. For example, the array `nums = [0,1,2,4,5,6,7]` might become:\n- `[4,5,6,7,0,1,2]` if it was rotated 4 times.\n- `[0,1,2,4,5,6,7]` if it was rotated 7 times.\n\nNotice that rotating an array `[a[0], a[1], ..., a[n-1]]` 1 time results in `[a[n-1], a[0], ..., a[n-2]]`.\n\nGiven the sorted rotated array `nums` of **unique** elements, return the minimum element of this array.\n\nYou must write an algorithm that runs in O(log n) time.\n\n**Example 1:**\nInput: nums = [3,4,5,1,2]\nOutput: 1\nExplanation: The original array was [1,2,3,4,5] rotated 3 times.\n\n**Example 2:**\nInput: nums = [4,5,6,7,0,1,2]\nOutput: 0\nExplanation: The original array was [0,1,2,4,5,6,7] and it was rotated 4 times.\n\n**Constraints:**\n- n == nums.length\n- 1 <= n <= 5000\n- -5000 <= nums[i] <= 5000\n- All the integers of `nums` are **unique**.\n- `nums` is sorted and rotated between 1 and `n` times.",
    "difficulty": "medium",
    "topics": [
      "Array",
      "Binary Search"
    ],
    "companies": [
      "Amazon",
      "Microsoft",
      "Facebook",
      "Google"
    ],
    "constraints": [
      "n == nums.length",
      "1 <= n <= 5000",
      "-5000 <= nums[i] <= 5000",
      "All integers are unique.",
      "nums is sorted and rotated."
    ],
    "examples": [
      {
        "input": "nums = [3,4,5,1,2]",
        "output": "1",
        "explanation": "The minimum element is 1, which is the 'pivot' point."
      },
      {
        "input": "nums = [4,5,6,7,0,1,2]",
        "output": "0",
        "explanation": "The minimum element is 0."
      }
    ],
    "testCases": [
      {
        "input": "[3,4,5,1,2]",
        "expectedOutput": "1",
        "isHidden": false
      },
      {
        "input": "[4,5,6,7,0,1,2]",
        "expectedOutput": "0",
        "isHidden": false
      },
      {
        "input": "[11,13,15,17]",
        "expectedOutput": "11",
        "isHidden": true
      },
      {
        "input": "[2,1]",
        "expectedOutput": "1",
        "isHidden": true
      }
    ],
    "hints": [
      "The O(log n) requirement strongly suggests using Binary Search.",
      "Compare the middle element with the right-most element.",
      "If `nums[mid] > nums[right]`, the minimum element must be in the right half (because the right half contains the 'drop').",
      "If `nums[mid] < nums[right]`, the minimum element must be in the left half (including `mid` itself, as it could be the minimum).",
      "The loop should continue until `left` and `right` pointers converge."
    ],
    "solutions": [
      {
        "language": "javascript",
        "code": "var findMin = function(nums) {\n    let left = 0;\n    let right = nums.length - 1;\n\n    while (left < right) {\n        let mid = Math.floor((left + right) / 2);\n\n        if (nums[mid] > nums[right]) {\n            // The minimum must be in the right half (mid + 1 to right)\n            // because mid is on the 'larger' side of the rotation\n            left = mid + 1;\n        } else {\n            // The minimum is in the left half (left to mid)\n            // It could be mid, so we include it\n            right = mid;\n        }\n    }\n\n    // When the loop terminates, left and right will be pointing\n    // to the same element, which is the minimum.\n    return nums[left];\n};",
        "explanation": "This solution uses a modified Binary Search. We maintain `left` and `right` pointers. In each step, we calculate `mid`. The key comparison is `nums[mid]` vs `nums[right]`. If `nums[mid] > nums[right]`, it means the 'pivot' or 'drop' (the minimum element) must be to the right of `mid`. So, we update `left = mid + 1`. If `nums[mid] <= nums[right]`, it means the segment from `mid` to `right` is sorted, so the minimum element must be at `mid` or to its left. We update `right = mid` (not `mid - 1`, because `mid` itself could be the minimum). The loop continues until `left` and `right` converge, at which point they both point to the minimum element.",
        "timeComplexity": "O(log n)",
        "spaceComplexity": "O(1)"
      }
    ],
    "acceptanceRate": 48.2,
    "totalSubmissions": 13000,
    "correctSubmissions": 6266,
    "averageTime": 15
  },
  {
    "title": "Clone Graph",
    "description": "Given a reference of a node in a connected undirected graph.\n\nReturn a deep copy (clone) of the graph.\n\nEach node in the graph contains a value (int) and a list (List[Node]) of its neighbors.\n\n`class Node {`\n`    public int val;`\n`    public List<Node> neighbors;`\n`}`\n\n**Test case format:**\nFor simplicity, each node's value is the same as the node's index (1-indexed). For example, the first node with val == 1, the second node with val == 2, and so on. The graph is represented in the test case using an adjacency list.\n\n**Example 1:**\nInput: adjList = [[2,4],[1,3],[2,4],[1,3]]\nOutput: [[2,4],[1,3],[2,4],[1,3]]\nExplanation: There are 4 nodes in the graph.\n1st node (val = 1)'s neighbors are 2nd node (val = 2) and 4th node (val = 4).\n2nd node (val = 2)'s neighbors are 1st node (val = 1) and 3rd node (val = 3).\n...\n\n**Constraints:**\n- The number of nodes in the graph is in the range [0, 100].\n- 1 <= Node.val <= 100\n- Node.val is unique for each node.\n- There are no repeated edges and no self-loops in the graph.\n- The graph is connected and all nodes can be visited starting from the given node.",
    "difficulty": "medium",
    "topics": [
      "Graph",
      "Depth-First Search",
      "Breadth-First Search",
      "Hash Table"
    ],
    "companies": [
      "Facebook",
      "Amazon",
      "Google",
      "Microsoft"
    ],
    "constraints": [
      "The number of nodes in the graph is in the range [0, 100].",
      "1 <= Node.val <= 100",
      "Node.val is unique for each node.",
      "The graph is connected."
    ],
    "examples": [
      {
        "input": "adjList = [[2,4],[1,3],[2,4],[1,3]]",
        "output": "[[2,4],[1,3],[2,4],[1,3]]",
        "explanation": "A deep copy of the graph is returned."
      }
    ],
    "testCases": [
      {
        "input": "[[2,4],[1,3],[2,4],[1,3]]",
        "expectedOutput": "[[2,4],[1,3],[2,4],[1,3]]",
        "isHidden": false
      },
      {
        "input": "[[]]",
        "expectedOutput": "[[]]",
        "isHidden": false
      },
      {
        "input": "[]",
        "expectedOutput": "[]",
        "isHidden": true
      }
    ],
    "hints": [
      "You need to traverse the graph and create a new node for each original node.",
      "A simple traversal (DFS or BFS) will lead to infinite loops if you're not careful. How can you keep track of nodes you've already copied?",
      "Use a hash map to store the mapping from an original node to its corresponding new (cloned) node.",
      "When you visit a node, if it's already in the map, return the cloned node from the map. If not, create a new node, store it in the map, and then recursively clone all its neighbors."
    ],
    "solutions": [
      {
        "language": "javascript",
        "code": "/**\n * // Definition for a Node.\n * function Node(val, neighbors) {\n * this.val = val === undefined ? 0 : val;\n * this.neighbors = neighbors === undefined ? [] : neighbors;\n * };\n */\n\nvar cloneGraph = function(node) {\n    // Map to store old nodes as keys and new nodes as values\n    const oldToNew = new Map();\n\n    function dfs(oldNode) {\n        if (!oldNode) {\n            return null;\n        }\n\n        // If we have already cloned this node, return the clone\n        if (oldToNew.has(oldNode)) {\n            return oldToNew.get(oldNode);\n        }\n\n        // Create the new (cloned) node\n        const newNode = new Node(oldNode.val);\n        \n        // Add to map *before* recursing to handle cycles\n        oldToNew.set(oldNode, newNode);\n\n        // Recursively clone all neighbors\n        newNode.neighbors = oldNode.neighbors.map(dfs);\n\n        return newNode;\n    }\n\n    return dfs(node);\n};",
        "explanation": "This solution uses Depth-First Search (DFS) and a hash map (`oldToNew`) to perform a deep copy. The hash map is crucial for two reasons: 1) It prevents infinite loops in graphs with cycles, and 2) It ensures that each node is only cloned once. The `dfs` function takes an `oldNode`. If the node is `null`, it returns `null`. If the node is already in our map, we return its clone. Otherwise, we create a `newNode`, add the `(oldNode, newNode)` pair to the map *immediately*, and then recursively call `dfs` on all of `oldNode.neighbors`. The results of these recursive calls are used to populate `newNode.neighbors`.",
        "timeComplexity": "O(N + E)",
        "spaceComplexity": "O(N)"
      }
    ],
    "acceptanceRate": 48.9,
    "totalSubmissions": 9000,
    "correctSubmissions": 4401,
    "averageTime": 24
  },
  {
    "title": "Word Break",
    "description": "Given a string `s` and a dictionary of strings `wordDict`, return `true` if `s` can be segmented into a space-separated sequence of one or more dictionary words.\n\nNote that the same word in the dictionary may be reused multiple times in the segmentation.\n\n**Example 1:**\nInput: s = \"leetcode\", wordDict = [\"leet\",\"code\"]\nOutput: true\nExplanation: Return true because \"leetcode\" can be segmented as \"leet code\".\n\n**Example 2:**\nInput: s = \"applepenapple\", wordDict = [\"apple\",\"pen\"]\nOutput: true\nExplanation: Return true because \"applepenapple\" can be segmented as \"apple pen apple\".\n\n**Example 3:**\nInput: s = \"catsandog\", wordDict = [\"cats\",\"dog\",\"sand\",\"and\",\"cat\"]\nOutput: false\n\n**Constraints:**\n- 1 <= s.length <= 300\n- 1 <= wordDict.length <= 1000\n- 1 <= wordDict[i].length <= 20\n- s and wordDict[i] consist of only lowercase English letters.\n- All the strings of `wordDict` are **unique**.",
    "difficulty": "medium",
    "topics": [
      "Dynamic Programming",
      "Memoization",
      "Trie"
    ],
    "companies": [
      "Amazon",
      "Facebook",
      "Google",
      "Microsoft"
    ],
    "constraints": [
      "1 <= s.length <= 300",
      "1 <= wordDict.length <= 1000",
      "1 <= wordDict[i].length <= 20",
      "All strings in wordDict are unique."
    ],
    "examples": [
      {
        "input": "s = \"leetcode\", wordDict = [\"leet\",\"code\"]",
        "output": "true",
        "explanation": "Segmented as \"leet code\"."
      },
      {
        "input": "s = \"catsandog\", wordDict = [\"cats\",\"dog\",\"sand\",\"and\",\"cat\"]",
        "output": "false",
        "explanation": "Cannot be segmented."
      }
    ],
    "testCases": [
      {
        "input": "\"leetcode\"\n[\"leet\",\"code\"]",
        "expectedOutput": "true",
        "isHidden": false
      },
      {
        "input": "\"applepenapple\"\n[\"apple\",\"pen\"]",
        "expectedOutput": "true",
        "isHidden": false
      },
      {
        "input": "\"catsandog\"\n[\"cats\",\"dog\",\"sand\",\"and\",\"cat\"]",
        "expectedOutput": "false",
        "isHidden": false
      },
      {
        "input": "\"aaaaaaa\"\n[\"aaaa\",\"aaa\"]",
        "expectedOutput": "true",
        "isHidden": true
      }
    ],
    "hints": [
      "This problem has optimal substructure and overlapping subproblems, pointing to Dynamic Programming.",
      "Let `dp[i]` be a boolean value indicating whether the substring `s[0...i-1]` (of length `i`) can be segmented.",
      "`dp[0]` is true (an empty string can be segmented).",
      "To calculate `dp[i]`, we need to find an index `j` (where `0 <= j < i`) such that `dp[j]` is true AND the substring `s[j...i-1]` is in the word dictionary.",
      "The final answer will be `dp[s.length]`."
    ],
    "solutions": [
      {
        "language": "javascript",
        "code": "var wordBreak = function(s, wordDict) {\n    const n = s.length;\n    // dp[i] = true if s.substring(0, i) can be segmented\n    const dp = new Array(n + 1).fill(false);\n    const wordSet = new Set(wordDict);\n\n    // Base case: empty string\n    dp[0] = true;\n\n    for (let i = 1; i <= n; i++) {\n        for (let j = 0; j < i; j++) {\n            // Check if dp[j] is true (s[0...j] is breakable)\n            // AND if the remaining part s[j...i] is in the dictionary\n            if (dp[j] && wordSet.has(s.substring(j, i))) {\n                dp[i] = true;\n                break; // Found a valid break, no need to check other j's for this i\n            }\n        }\n    }\n\n    return dp[n];\n};",
        "explanation": "This solution uses 1D Dynamic Programming. We create a boolean array `dp` of size `n+1`, where `n` is the string length. `dp[i]` will be `true` if the first `i` characters of `s` (i.e., `s.substring(0, i)`) can be broken down into words from the dictionary. `dp[0]` is `true` as a base case. We then iterate from `i = 1` to `n`. For each `i`, we check every possible 'split point' `j` from `0` to `i-1`. If `dp[j]` is `true` (meaning the string up to `j` is valid) AND the substring from `j` to `i` (`s.substring(j, i)`) is in our `wordSet`, then we know `dp[i]` can be `true`. We use a `Set` for the dictionary to get O(1) average time lookups.",
        "timeComplexity": "O(n^2)",
        "spaceComplexity": "O(n + m)"
      }
    ],
    "acceptanceRate": 41.3,
    "totalSubmissions": 12000,
    "correctSubmissions": 4956,
    "averageTime": 26
  },
  {
    "title": "Merge k Sorted Lists",
    "description": "You are given an array of `k` linked-lists `lists`, each linked-list is sorted in ascending order.\n\nMerge all the linked-lists into one sorted linked-list and return it.\n\n**Example 1:**\nInput: lists = [[1,4,5],[1,3,4],[2,6]]\nOutput: [1,1,2,3,4,4,5,6]\nExplanation: The linked-lists are:\n[\n  1->4->5,\n  1->3->4,\n  2->6\n]\nmerging them into one sorted list:\n1->1->2->3->4->4->5->6\n\n**Example 2:**\nInput: lists = []\nOutput: []\n\n**Example 3:**\nInput: lists = [[]]\nOutput: []\n\n**Constraints:**\n- k == lists.length\n- 0 <= k <= 10^4\n- 0 <= lists[i].length <= 500\n- -10^4 <= lists[i][j] <= 10^4\n- lists[i] is sorted in ascending order.\n- The sum of lists[i].length will not exceed 10^4.",
    "difficulty": "hard",
    "topics": [
      "Linked List",
      "Heap (Priority Queue)",
      "Divide and Conquer"
    ],
    "companies": [
      "Amazon",
      "Facebook",
      "Google",
      "Microsoft"
    ],
    "constraints": [
      "k == lists.length",
      "0 <= k <= 10^4",
      "0 <= lists[i].length <= 500",
      "lists[i] is sorted in ascending order."
    ],
    "examples": [
      {
        "input": "lists = [[1,4,5],[1,3,4],[2,6]]",
        "output": "[1,1,2,3,4,4,5,6]",
        "explanation": "All lists are merged into one sorted list."
      }
    ],
    "testCases": [
      {
        "input": "[[1,4,5],[1,3,4],[2,6]]",
        "expectedOutput": "[1,1,2,3,4,4,5,6]",
        "isHidden": false
      },
      {
        "input": "[]",
        "expectedOutput": "[]",
        "isHidden": false
      },
      {
        "input": "[[]]",
        "expectedOutput": "[]",
        "isHidden": false
      }
    ],
    "hints": [
      "A simple approach is to collect all nodes into an array, sort it, and rebuild a linked list. This is O(N log N) where N is the total number of nodes.",
      "A better approach is to use a Min-Heap (Priority Queue). Add the head of every list to the heap. Then, extract the smallest node from the heap, add it to your result list, and add its `next` node to the heap.",
      "Another good approach is Divide and Conquer. Pair up the `k` lists and merge them (like in 'Merge Two Sorted Lists'). Repeat this process until only one list remains. This is similar to how merge sort works."
    ],
    "solutions": [
      {
        "language": "javascript",
        "code": "/**\n * Definition for singly-linked list.\n * function ListNode(val, next) {\n * this.val = (val===undefined ? 0 : val)\n * this.next = (next===undefined ? null : next)\n * }\n */\nvar mergeKLists = function(lists) {\n    if (!lists || lists.length === 0) {\n        return null;\n    }\n    \n    // Helper function to merge two sorted lists\n    function mergeTwoLists(l1, l2) {\n        let dummy = new ListNode();\n        let current = dummy;\n        while (l1 && l2) {\n            if (l1.val < l2.val) {\n                current.next = l1;\n                l1 = l1.next;\n            } else {\n                current.next = l2;\n                l2 = l2.next;\n            }\n            current = current.next;\n        }\n        current.next = l1 || l2;\n        return dummy.next;\n    }\n\n    while (lists.length > 1) {\n        let mergedLists = [];\n        for (let i = 0; i < lists.length; i += 2) {\n            const l1 = lists[i];\n            const l2 = (i + 1 < lists.length) ? lists[i + 1] : null;\n            mergedLists.push(mergeTwoLists(l1, l2));\n        }\n        lists = mergedLists;\n    }\n\n    return lists[0];\n};",
        "explanation": "This solution uses a Divide and Conquer approach, similar to merge sort. We repeatedly merge pairs of lists from the `lists` array. We start with `k` lists. In the first pass, we merge `lists[0]` with `lists[1]`, `lists[2]` with `lists[3]`, and so on. This leaves us with `k/2` lists. We repeat this process, adding the new merged lists to a temporary array (`mergedLists`) and then replacing `lists` with this new array. The loop continues as long as `lists.length > 1`. Finally, the array will contain just one list, which is the fully merged and sorted result. This is more efficient than merging one-by-one.",
        "timeComplexity": "O(N log k)",
        "spaceComplexity": "O(1) or O(log k)"
      }
    ],
    "acceptanceRate": 44.9,
    "totalSubmissions": 11000,
    "correctSubmissions": 4939,
    "averageTime": 32
  },
  {
    "title": "Reverse Linked List",
    "description": "Given the `head` of a singly linked list, reverse the list, and return the new head.\n\n(Note: Definition for singly-linked list is assumed)\n`function ListNode(val, next) {`\n`    this.val = (val===undefined ? 0 : val)`\n`    this.next = (next===undefined ? null : next)`\n`}`\n\n**Example 1:**\nInput: head = [1,2,3,4,5]\nOutput: [5,4,3,2,1]\n\n**Example 2:**\nInput: head = [1,2]\nOutput: [2,1]\n\n**Example 3:**\nInput: head = []\nOutput: []\n\n**Constraints:**\n- The number of nodes in the list is in the range [0, 5000].\n- -5000 <= Node.val <= 5000",
    "difficulty": "easy",
    "topics": [
      "Linked List",
      "Recursion"
    ],
    "companies": [
      "Amazon",
      "Microsoft",
      "Apple",
      "Facebook"
    ],
    "constraints": [
      "The number of nodes in the list is in the range [0, 5000].",
      "-5000 <= Node.val <= 5000"
    ],
    "examples": [
      {
        "input": "head = [1,2,3,4,5]",
        "output": "[5,4,3,2,1]",
        "explanation": "The list is reversed node by node."
      },
      {
        "input": "head = [1,2]",
        "output": "[2,1]",
        "explanation": "The list is reversed node by node."
      }
    ],
    "testCases": [
      {
        "input": "[1,2,3,4,5]",
        "expectedOutput": "[5,4,3,2,1]",
        "isHidden": false
      },
      {
        "input": "[]",
        "expectedOutput": "[]",
        "isHidden": true
      },
      {
        "input": "[1]",
        "expectedOutput": "[1]",
        "isHidden": true
      }
    ],
    "hints": [
      "You can reverse the list iteratively.",
      "Maintain three pointers: `prev`, `current`, and `next`. `prev` starts as null.",
      "In each step, save `current.next` to `next`, point `current.next` to `prev`, and then move `prev` and `current` one step forward."
    ],
    "solutions": [
      {
        "language": "javascript",
        "code": "/**\n * Definition for singly-linked list.\n * function ListNode(val, next) {\n * this.val = (val===undefined ? 0 : val)\n * this.next = (next===undefined ? null : next)\n * }\n */\nvar reverseList = function(head) {\n    let prev = null;\n    let curr = head;\n    while (curr !== null) {\n        const nextTemp = curr.next;\n        curr.next = prev;\n        prev = curr;\n        curr = nextTemp;\n    }\n    return prev;\n};",
        "explanation": "This iterative solution uses three pointers. `prev` tracks the new head of the reversed portion. `curr` is the current node being processed. `nextTemp` stores the next node before we overwrite `curr.next`. In each loop, we point `curr.next` backwards to `prev`, then advance `prev` to `curr` and `curr` to `nextTemp`.",
        "timeComplexity": "O(n)",
        "spaceComplexity": "O(1)"
      }
    ],
    "acceptanceRate": 68.4,
    "totalSubmissions": 19000,
    "correctSubmissions": 13000,
    "averageTime": 9
  },
  {
    "title": "Linked List Cycle",
    "description": "Given `head`, the head of a linked list, determine if the linked list has a cycle in it.\n\nThere is a cycle in a linked list if there is some node in the list that can be reached again by continuously following the `next` pointer. Internally, `pos` is used to denote the index of the node that tail's `next` pointer is connected to. Note that `pos` is not passed as a parameter.\n\nReturn `true` if there is a cycle in the linked list. Otherwise, return `false`.\n\n**Example 1:**\nInput: head = [3,2,0,-4], pos = 1\nOutput: true\nExplanation: There is a cycle in the linked list, where the tail connects to the 1st node (0-indexed).\n\n**Example 2:**\nInput: head = [1,2], pos = 0\nOutput: true\n\n**Example 3:**\nInput: head = [1], pos = -1\nOutput: false\n\n**Constraints:**\n- The number of nodes in the list is in the range [0, 10^4].\n- -10^5 <= Node.val <= 10^5\n- `pos` is -1 or a valid index in the linked-list.",
    "difficulty": "easy",
    "topics": [
      "Linked List",
      "Two Pointers",
      "Hash Table"
    ],
    "companies": [
      "Amazon",
      "Microsoft",
      "Apple"
    ],
    "constraints": [
      "The number of nodes in the list is in the range [0, 10^4].",
      "-10^5 <= Node.val <= 10^5",
      "pos is -1 or a valid index in the linked-list."
    ],
    "examples": [
      {
        "input": "head = [3,2,0,-4], pos = 1",
        "output": "true",
        "explanation": "The tail connects to the node with value 2."
      },
      {
        "input": "head = [1], pos = -1",
        "output": "false",
        "explanation": "There is no cycle."
      }
    ],
    "testCases": [
      {
        "input": "[3,2,0,-4]\n1",
        "expectedOutput": "true",
        "isHidden": false
      },
      {
        "input": "[1,2]\n0",
        "expectedOutput": "true",
        "isHidden": false
      },
      {
        "input": "[1]\n-1",
        "expectedOutput": "false",
        "isHidden": true
      }
    ],
    "hints": [
      "Can you solve this using O(n) memory with a Hash Set?",
      "To solve it in O(1) memory, think about 'Floyd's Tortoise and Hare' algorithm.",
      "Use two pointers, one 'slow' (moves one step at a time) and one 'fast' (moves two steps at a time).",
      "If there is a cycle, the fast pointer will eventually catch up to the slow pointer."
    ],
    "solutions": [
      {
        "language": "javascript",
        "code": "/**\n * Definition for singly-linked list.\n * function ListNode(val) {\n * this.val = val;\n * this.next = null;\n * }\n */\nvar hasCycle = function(head) {\n    let slow = head;\n    let fast = head;\n\n    while (fast !== null && fast.next !== null) {\n        slow = slow.next;\n        fast = fast.next.next;\n\n        if (slow === fast) {\n            return true;\n        }\n    }\n\n    return false;\n};",
        "explanation": "This solution uses Floyd's Cycle-Finding Algorithm. We use two pointers, `slow` and `fast`. `slow` moves one node at a time, while `fast` moves two nodes at a time. If the list has no cycle, the `fast` pointer will eventually reach `null`. If there is a cycle, the `fast` pointer will eventually lap the `slow` pointer, and they will meet at the same node. We check for this collision inside the loop.",
        "timeComplexity": "O(n)",
        "spaceComplexity": "O(1)"
      }
    ],
    "acceptanceRate": 44.5,
    "totalSubmissions": 20000,
    "correctSubmissions": 8900,
    "averageTime": 11
  },
  {
    "title": "Maximum Depth of Binary Tree",
    "description": "Given the `root` of a binary tree, return its maximum depth.\n\nA binary tree's maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.\n\n**Example 1:**\nInput: root = [3,9,20,null,null,15,7]\nOutput: 3\n\n**Example 2:**\nInput: root = [1,null,2]\nOutput: 2\n\n**Constraints:**\n- The number of nodes in the tree is in the range [0, 10^4].\n- -100 <= Node.val <= 100",
    "difficulty": "easy",
    "topics": [
      "Tree",
      "Depth-First Search",
      "Breadth-First Search",
      "Recursion"
    ],
    "companies": [
      "LinkedIn",
      "Amazon",
      "Google",
      "Apple"
    ],
    "constraints": [
      "The number of nodes in the tree is in the range [0, 10^4].",
      "-100 <= Node.val <= 100"
    ],
    "examples": [
      {
        "input": "root = [3,9,20,null,null,15,7]",
        "output": "3",
        "explanation": "The longest path is 3 -> 20 -> 15 (or 7), which has 3 nodes."
      }
    ],
    "testCases": [
      {
        "input": "[3,9,20,null,null,15,7]",
        "expectedOutput": "3",
        "isHidden": false
      },
      {
        "input": "[1,null,2]",
        "expectedOutput": "2",
        "isHidden": false
      },
      {
        "input": "[]",
        "expectedOutput": "0",
        "isHidden": true
      }
    ],
    "hints": [
      "This problem is a classic application of recursion.",
      "The base case is an empty tree (null root), which has a depth of 0.",
      "For a non-empty tree, the depth is 1 (for the current node) plus the maximum of the depths of the left and right subtrees.",
      "Recursively find the depth of the left child and the right child, then return `1 + max(left_depth, right_depth)`."
    ],
    "solutions": [
      {
        "language": "javascript",
        "code": "/**\n * Definition for a binary tree node.\n * function TreeNode(val, left, right) {\n * this.val = (val===undefined ? 0 : val)\n * this.left = (left===undefined ? null : left)\n * this.right = (right===undefined ? null : right)\n * }\n */\nvar maxDepth = function(root) {\n    if (root === null) {\n        return 0;\n    }\n    \n    const leftDepth = maxDepth(root.left);\n    const rightDepth = maxDepth(root.right);\n    \n    return Math.max(leftDepth, rightDepth) + 1;\n};",
        "explanation": "This solution uses a simple recursive Depth-First Search (DFS). The base case for the recursion is when a node is `null`, at which point it returns 0 (a null tree has zero depth). For any other node, it recursively calls `maxDepth` on its left and right children to find their respective depths. It then returns the greater of those two depths, plus 1 (to count the current node itself).",
        "timeComplexity": "O(n)",
        "spaceComplexity": "O(h)"
      }
    ],
    "acceptanceRate": 70.1,
    "totalSubmissions": 16000,
    "correctSubmissions": 11216,
    "averageTime": 8
  },
  {
    "title": "Same Tree",
    "description": "Given the roots of two binary trees, `p` and `q`, write a function to check if they are the same or not.\n\nTwo binary trees are considered the same if they are structurally identical, and the nodes have the same value.\n\n**Example 1:**\nInput: p = [1,2,3], q = [1,2,3]\nOutput: true\n\n**Example 2:**\nInput: p = [1,2], q = [1,null,2]\nOutput: false\n\n**Example 3:**\nInput: p = [1,2,1], q = [1,1,2]\nOutput: false\n\n**Constraints:**\n- The number of nodes in both trees is in the range [0, 100].\n- -10^4 <= Node.val <= 10^4",
    "difficulty": "easy",
    "topics": [
      "Tree",
      "Depth-First Search",
      "Recursion"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Microsoft"
    ],
    "constraints": [
      "The number of nodes in both trees is in the range [0, 100].",
      "-10^4 <= Node.val <= 10^4"
    ],
    "examples": [
      {
        "input": "p = [1,2,3], q = [1,2,3]",
        "output": "true",
        "explanation": "The trees are structurally identical and have the same node values."
      },
      {
        "input": "p = [1,2], q = [1,null,2]",
        "output": "false",
        "explanation": "The trees are structurally different."
      }
    ],
    "testCases": [
      {
        "input": "[1,2,3]\n[1,2,3]",
        "expectedOutput": "true",
        "isHidden": false
      },
      {
        "input": "[1,2]\n[1,null,2]",
        "expectedOutput": "false",
        "isHidden": false
      },
      {
        "input": "[]\n[]",
        "expectedOutput": "true",
        "isHidden": true
      }
    ],
    "hints": [
      "Use recursion. What are the base cases?",
      "If both nodes are `null`, they are the same (return true).",
      "If one node is `null` and the other is not, they are different (return false).",
      "If both nodes are non-null, check if their values are equal. If not, return false.",
      "If their values are equal, recursively check if the left subtrees are the same AND the right subtrees are the same."
    ],
    "solutions": [
      {
        "language": "javascript",
        "code": "/**\n * Definition for a binary tree node.\n * function TreeNode(val, left, right) {\n * this.val = (val===undefined ? 0 : val)\n * this.left = (left===undefined ? null : left)\n * this.right = (right===undefined ? null : right)\n * }\n */\nvar isSameTree = function(p, q) {\n    // 1. Both are null (base case)\n    if (!p && !q) {\n        return true;\n    }\n    \n    // 2. One is null or values are different\n    if (!p || !q || p.val !== q.val) {\n        return false;\n    }\n    \n    // 3. Recursively check children\n    return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);\n};",
        "explanation": "This solution uses recursion. It checks for three conditions. First, if both nodes `p` and `q` are `null`, the subtrees are identical, so it returns `true`. Second, if one of the nodes is `null` OR their values are not equal, they are different, so it returns `false`. If neither of these conditions is met, it means both nodes exist and have the same value. The function then returns the result of recursively checking the left subtrees (`isSameTree(p.left, q.left)`) AND the right subtrees (`isSameTree(p.right, q.right)`).",
        "timeComplexity": "O(n)",
        "spaceComplexity": "O(h)"
      }
    ],
    "acceptanceRate": 54.3,
    "totalSubmissions": 14000,
    "correctSubmissions": 7602,
    "averageTime": 8
  },
  {
    "title": "Subtree of Another Tree",
    "description": "Given the roots of two binary trees, `root` and `subRoot`, return `true` if there is a subtree of `root` with the same structure and node values of `subRoot` and `false` otherwise.\n\nA subtree of a binary tree `tree` is a tree that consists of a node in `tree` and all of this node's descendants. The tree `tree` could also be considered as a subtree of itself.\n\n**Example 1:**\nInput: root = [3,4,5,1,2], subRoot = [4,1,2]\nOutput: true\n\n**Example 2:**\nInput: root = [3,4,5,1,2,null,null,null,null,0], subRoot = [4,1,2]\nOutput: false\n\n**Constraints:**\n- The number of nodes in the `root` tree is in the range [1, 2000].\n- The number of nodes in the `subRoot` tree is in the range [1, 1000].\n- -10^4 <= root.val, subRoot.val <= 10^4",
    "difficulty": "easy",
    "topics": [
      "Tree",
      "Depth-First Search",
      "Recursion"
    ],
    "companies": [
      "Amazon",
      "Facebook",
      "Microsoft"
    ],
    "constraints": [
      "The number of nodes in the root tree is in the range [1, 2000].",
      "The number of nodes in the subRoot tree is in the range [1, 1000].",
      "-10^4 <= root.val, subRoot.val <= 10^4"
    ],
    "examples": [
      {
        "input": "root = [3,4,5,1,2], subRoot = [4,1,2]",
        "output": "true",
        "explanation": "The subtree starting at node 4 in `root` is identical to `subRoot`."
      }
    ],
    "testCases": [
      {
        "input": "[3,4,5,1,2]\n[4,1,2]",
        "expectedOutput": "true",
        "isHidden": false
      },
      {
        "input": "[3,4,5,1,2,null,null,null,null,0]\n[4,1,2]",
        "expectedOutput": "false",
        "isHidden": false
      }
    ],
    "hints": [
      "You will need a helper function. Consider the 'Same Tree' problem.",
      "Create a helper function `isSameTree(p, q)` that checks if two trees are identical.",
      "In your main function, traverse the `root` tree.",
      "At each node in `root`, check if `isSameTree(node, subRoot)` is true. If it is, return true.",
      "If not, recursively check the left and right children: `isSubtree(root.left, subRoot)` OR `isSubtree(root.right, subRoot)`."
    ],
    "solutions": [
      {
        "language": "javascript",
        "code": "/**\n * Definition for a binary tree node.\n * function TreeNode(val, left, right) {\n * this.val = (val===undefined ? 0 : val)\n * this.left = (left===undefined ? null : left)\n * this.right = (right===undefined ? null : right)\n * }\n */\n\n// Helper function from 'Same Tree' problem \nfunction isSameTree(p, q) {\n    if (!p && !q) return true;\n    if (!p || !q || p.val !== q.val) return false;\n    return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);\n}\n\nvar isSubtree = function(root, subRoot) {\n    if (!root) return false;\n    if (isSameTree(root, subRoot)) return true;\n    return isSubtree(root.left, subRoot) || isSubtree(root.right, subRoot);\n};",
        "explanation": "This solution uses a helper function `isSameTree` which is the standard solution for checking if two trees are identical. The main function `isSubtree` performs a preorder traversal of the `root` tree. At each node, it checks two things: 1. Is the tree starting at the current `root` node identical to `subRoot`? (using `isSameTree`). If yes, return `true`. 2. If not, is `subRoot` a subtree of the `root`'s left child OR the `root`'s right child? This is checked by recursively calling `isSubtree` on `root.left` and `root.right`.",
        "timeComplexity": "O(m * n)",
        "spaceComplexity": "O(h)"
      }
    ],
    "acceptanceRate": 44.7,
    "totalSubmissions": 10000,
    "correctSubmissions": 4470,
    "averageTime": 20
  },
  {
    "title": "Longest Palindromic Substring",
    "description": "Given a string `s`, return the longest palindromic substring in `s`.\n\n**Example 1:**\nInput: s = \"babad\"\nOutput: \"bab\"\nExplanation: \"aba\" is also a valid answer.\n\n**Example 2:**\nInput: s = \"cbbd\"\nOutput: \"bb\"\n\n**Constraints:**\n- 1 <= s.length <= 1000\n- s consist of only digits and English letters.",
    "difficulty": "medium",
    "topics": [
      "String",
      "Dynamic Programming",
      "Expand Around Center"
    ],
    "companies": [
      "Amazon",
      "Microsoft",
      "Google",
      "Adobe"
    ],
    "constraints": [
      "1 <= s.length <= 1000",
      "s consist of only digits and English letters."
    ],
    "examples": [
      {
        "input": "s = \"babad\"",
        "output": "\"bab\"",
        "explanation": "\"aba\" is also a valid answer."
      },
      {
        "input": "s = \"cbbd\"",
        "output": "\"bb\"",
        "explanation": "The longest palindromic substring is \"bb\"."
      }
    ],
    "testCases": [
      {
        "input": "\"babad\"",
        "expectedOutput": "\"bab\"",
        "isHidden": false
      },
      {
        "input": "\"cbbd\"",
        "expectedOutput": "\"bb\"",
        "isHidden": false
      },
      {
        "input": "\"a\"",
        "expectedOutput": "\"a\"",
        "isHidden": true
      },
      {
        "input": "\"racecar\"",
        "expectedOutput": "\"racecar\"",
        "isHidden": true
      }
    ],
    "hints": [
      "A common O(n^2) DP solution exists. Let `dp[i][j]` be true if `s[i...j]` is a palindrome.",
      "A simpler O(n^2) solution is 'Expand Around Center'.",
      "A palindrome is symmetric around its center. The center can be a single character or the space between two characters.",
      "Iterate through all 2n-1 possible centers. For each center, expand outwards (one pointer left, one right) as long as the characters match and you are within bounds.",
      "Keep track of the longest palindrome found."
    ],
    "solutions": [
      {
        "language": "javascript",
        "code": "var longestPalindrome = function(s) {\n    if (!s || s.length < 1) return \"\";\n\n    let start = 0;\n    let end = 0;\n\n    function expandAroundCenter(left, right) {\n        while (left >= 0 && right < s.length && s[left] === s[right]) {\n            left--;\n            right++;\n        }\n        // Return the length of the palindrome\n        return right - left - 1;\n    }\n\n    for (let i = 0; i < s.length; i++) {\n        // Odd length palindromes (center is at i)\n        let len1 = expandAroundCenter(i, i);\n        // Even length palindromes (center is between i and i+1)\n        let len2 = expandAroundCenter(i, i + 1);\n        \n        let len = Math.max(len1, len2);\n\n        if (len > end - start) {\n            // Update start and end of the longest palindrome found\n            start = i - Math.floor((len - 1) / 2);\n            end = i + Math.floor(len / 2);\n        }\n    }\n\n    return s.substring(start, end + 1);\n};",
        "explanation": "This solution uses the 'Expand Around Center' method. We iterate through every character `i` in the string. For each character, we consider it as the potential center of a palindrome. Since a palindrome's center can be one character (like 'racecar') or two (like 'aabbaa'), we check both cases: one expanding from `(i, i)` (odd length) and one expanding from `(i, i+1)` (even length). The `expandAroundCenter` helper function returns the length of the palindrome found for a given center. We keep track of the `start` and `end` indices of the longest palindrome found so far and return the corresponding substring at the end.",
        "timeComplexity": "O(n^2)",
        "spaceComplexity": "O(1)"
      }
    ],
    "acceptanceRate": 31.2,
    "totalSubmissions": 25000,
    "correctSubmissions": 7800,
    "averageTime": 30
  },
  {
    "title": "Palindromic Substrings",
    "description": "Given a string `s`, return the number of palindromic substrings in it.\n\nA string is a palindrome when it reads the same backward as forward.\n\nA substring is a contiguous sequence of characters within the string.\n\n**Example 1:**\nInput: s = \"abc\"\nOutput: 3\nExplanation: Three palindromic substrings: \"a\", \"b\", \"c\".\n\n**Example 2:**\nInput: s = \"aaa\"\nOutput: 6\nExplanation: Six palindromic substrings: \"a\", \"a\", \"a\", \"aa\", \"aa\", \"aaa\".\n\n**Constraints:**\n- 1 <= s.length <= 1000\n- s consists of lowercase English letters.",
    "difficulty": "medium",
    "topics": [
      "String",
      "Dynamic Programming",
      "Expand Around Center"
    ],
    "companies": [
      "Facebook",
      "Amazon",
      "LinkedIn",
      "Google"
    ],
    "constraints": [
      "1 <= s.length <= 1000",
      "s consists of lowercase English letters."
    ],
    "examples": [
      {
        "input": "s = \"abc\"",
        "output": "3",
        "explanation": "The palindromic substrings are \"a\", \"b\", \"c\"."
      },
      {
        "input": "s = \"aaa\"",
        "output": "6",
        "explanation": "The palindromic substrings are \"a\", \"a\", \"a\", \"aa\", \"aa\", \"aaa\"."
      }
    ],
    "testCases": [
      {
        "input": "\"abc\"",
        "expectedOutput": "3",
        "isHidden": false
      },
      {
        "input": "\"aaa\"",
        "expectedOutput": "6",
        "isHidden": false
      },
      {
        "input": "\"racecar\"",
        "expectedOutput": "10",
        "isHidden": true
      }
    ],
    "hints": [
      "This is very similar to the 'Longest Palindromic Substring' problem.",
      "Use the 'Expand Around Center' approach.",
      "Iterate through all 2n-1 possible centers (single characters and spaces between characters).",
      "For each center, expand outwards and count how many valid palindromes are formed. Each step of the expansion that matches (e.g., s[l] == s[r]) forms one new palindrome.",
      "Sum up the counts from all centers."
    ],
    "solutions": [
      {
        "language": "javascript",
        "code": "var countSubstrings = function(s) {\n    let count = 0;\n\n    function expandAndCount(left, right) {\n        while (left >= 0 && right < s.length && s[left] === s[right]) {\n            // Each time we find a match, it's a new palindrome\n            count++;\n            left--;\n            right++;\n        }\n    }\n\n    for (let i = 0; i < s.length; i++) {\n        // Odd length palindromes (center is at i)\n        expandAndCount(i, i);\n        \n        // Even length palindromes (center is between i and i+1)\n        expandAndCount(i, i + 1);\n    }\n\n    return count;\n};",
        "explanation": "This solution also uses the 'Expand Around Center' method. We initialize a `count` to 0. We iterate through the string, treating each index `i` as a potential center. We call a helper function `expandAndCount` twice: once for an odd-length palindrome centered at `(i, i)` and once for an even-length palindrome centered at `(i, i + 1)`. The helper function expands outwards as long as the characters match. For every matching pair it finds, it increments the global `count`, as each expansion step represents one valid palindromic substring.",
        "timeComplexity": "O(n^2)",
        "spaceComplexity": "O(1)"
      }
    ],
    "acceptanceRate": 64.9,
    "totalSubmissions": 9000,
    "correctSubmissions": 5841,
    "averageTime": 18
  },
  {
    "title": "Climbing Stairs",
    "description": "You are climbing a staircase. It takes `n` steps to reach the top.\n\nEach time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?\n\n**Example 1:**\nInput: n = 2\nOutput: 2\nExplanation: There are two ways to climb to the top.\n1. 1 step + 1 step\n2. 2 steps\n\n**Example 2:**\nInput: n = 3\nOutput: 3\nExplanation: There are three ways to climb to the top.\n1. 1 step + 1 step + 1 step\n2. 1 step + 2 steps\n3. 2 steps + 1 step\n\n**Constraints:**\n- 1 <= n <= 45",
    "difficulty": "easy",
    "topics": [
      "Dynamic Programming",
      "Memoization",
      "Math"
    ],
    "companies": [
      "Apple",
      "Amazon",
      "Adobe",
      "Google"
    ],
    "constraints": [
      "1 <= n <= 45"
    ],
    "examples": [
      {
        "input": "n = 2",
        "output": "2",
        "explanation": "1. 1 step + 1 step\n2. 2 steps"
      },
      {
        "input": "n = 3",
        "output": "3",
        "explanation": "1. 1 step + 1 step + 1 step\n2. 1 step + 2 steps\n3. 2 steps + 1 step"
      }
    ],
    "testCases": [
      {
        "input": "2",
        "expectedOutput": "2",
        "isHidden": false
      },
      {
        "input": "3",
        "expectedOutput": "3",
        "isHidden": false
      },
      {
        "input": "5",
        "expectedOutput": "8",
        "isHidden": true
      }
    ],
    "hints": [
      "This is a classic Dynamic Programming problem.",
      "Think about the last step you took to reach step `n`. You must have come from either step `n-1` or step `n-2`.",
      "The number of ways to reach step `n` is `ways(n-1) + ways(n-2)`.",
      "This is the Fibonacci sequence!",
      "What are the base cases? `ways(1) = 1` and `ways(2) = 2`."
    ],
    "solutions": [
      {
        "language": "javascript",
        "code": "var climbStairs = function(n) {\n    if (n <= 2) {\n        return n;\n    }\n\n    // Use an array to store the results (DP table)\n    let dp = new Array(n + 1);\n\n    // Base cases\n    dp[1] = 1;\n    dp[2] = 2;\n\n    // Fill the DP table using the recurrence relation\n    for (let i = 3; i <= n; i++) {\n        dp[i] = dp[i - 1] + dp[i - 2];\n    }\n\n    return dp[n];\n};",
        "explanation": "This solution uses bottom-up Dynamic Programming. We recognize that the number of ways to reach step `i`, let's call it `dp[i]`, is the sum of the ways to reach step `i-1` (and taking one step) and the ways to reach step `i-2` (and taking two steps). This gives the recurrence `dp[i] = dp[i-1] + dp[i-2]`, which is the Fibonacci sequence. We establish the base cases `dp[1] = 1` and `dp[2] = 2`. Then, we build our `dp` array up to `n` and return `dp[n]`.",
        "timeComplexity": "O(n)",
        "spaceComplexity": "O(n)"
      }
    ],
    "acceptanceRate": 50.3,
    "totalSubmissions": 18000,
    "correctSubmissions": 9054,
    "averageTime": 7
  },
  {
    "title": "Longest Increasing Subsequence",
    "description": "Given an integer array `nums`, return the length of the longest strictly increasing subsequence.\n\nA subsequence is a sequence that can be derived from an array by deleting some or no elements without changing the order of the remaining elements. For example, `[3,6,2,7]` is a subsequence of the array `[0,3,1,6,2,2,7]`.\n\n**Example 1:**\nInput: nums = [10,9,2,5,3,7,101,18]\nOutput: 4\nExplanation: The longest increasing subsequence is [2,3,7,101], therefore the length is 4.\n\n**Example 2:**\nInput: nums = [0,1,0,3,2,3]\nOutput: 4\n\n**Example 3:**\nInput: nums = [7,7,7,7,7,7,7]\nOutput: 1\n\n**Constraints:**\n- 1 <= nums.length <= 2500\n- -10^4 <= nums[i] <= 10^4",
    "difficulty": "medium",
    "topics": [
      "Dynamic Programming",
      "Binary Search"
    ],
    "companies": [
      "Amazon",
      "Microsoft",
      "Google"
    ],
    "constraints": [
      "1 <= nums.length <= 2500",
      "-10^4 <= nums[i] <= 10^4"
    ],
    "examples": [
      {
        "input": "nums = [10,9,2,5,3,7,101,18]",
        "output": "4",
        "explanation": "The LIS is [2,3,7,101], length is 4."
      },
      {
        "input": "nums = [0,1,0,3,2,3]",
        "output": "4",
        "explanation": "The LIS is [0,1,2,3], length is 4."
      }
    ],
    "testCases": [
      {
        "input": "[10,9,2,5,3,7,101,18]",
        "expectedOutput": "4",
        "isHidden": false
      },
      {
        "input": "[7,7,7,7,7,7,7]",
        "expectedOutput": "1",
        "isHidden": false
      },
      {
        "input": "[1,3,6,7,9,4,10,5,6]",
        "expectedOutput": "6",
        "isHidden": true
      }
    ],
    "hints": [
      "A classic O(n^2) Dynamic Programming solution exists.",
      "Let `dp[i]` be the length of the longest increasing subsequence that *ends* at index `i`.",
      "To compute `dp[i]`, you need to look at all `j` from 0 to `i-1`. If `nums[i] > nums[j]`, then you can potentially extend the subsequence ending at `j`. `dp[i] = max(dp[j] + 1)` for all such `j`.",
      "The final answer is the maximum value in the `dp` array.",
      "Can you do this in O(n log n) time? Think about maintaining an array of the smallest ending numbers for all LIS lengths."
    ],
    "solutions": [
      {
        "language": "javascript",
        "code": "var lengthOfLIS = function(nums) {\n    if (nums.length === 0) {\n        return 0;\n    }\n\n    // dp[i] = length of the LIS ending at index i\n    const dp = new Array(nums.length).fill(1);\n    let maxLen = 1;\n\n    for (let i = 1; i < nums.length; i++) {\n        for (let j = 0; j < i; j++) {\n            if (nums[i] > nums[j]) {\n                // We can extend the subsequence ending at j\n                dp[i] = Math.max(dp[i], dp[j] + 1);\n            }\n        }\n        maxLen = Math.max(maxLen, dp[i]);\n    }\n\n    return maxLen;\n};",
        "explanation": "This solution uses O(n^2) Dynamic Programming. We create a `dp` array where `dp[i]` represents the length of the LIS (Longest Increasing Subsequence) ending at index `i`. We initialize all `dp` values to 1, since any element by itself is an LIS of length 1. We then use nested loops. The outer loop `i` iterates from 1 to `n-1`. The inner loop `j` iterates from 0 to `i-1`. Inside the inner loop, if we find that `nums[i] > nums[j]`, it means we can append `nums[i]` to the LIS that ends at `j`. We update `dp[i]` to be the maximum of its current value and `dp[j] + 1`. We also keep track of the overall `maxLen` found and return it.",
        "timeComplexity": "O(n^2)",
        "spaceComplexity": "O(n)"
      }
    ],
    "acceptanceRate": 47.5,
    "totalSubmissions": 11000,
    "correctSubmissions": 5225,
    "averageTime": 27
  },
  {
    "title": "Number of Islands",
    "description": "Given an `m x n` 2D binary grid `grid` which represents a map of '1's (land) and '0's (water), return the number of islands.\n\nAn island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. You may assume all four edges of the grid are all surrounded by water.\n\n**Example 1:**\nInput: grid = [\n  [\"1\",\"1\",\"1\",\"1\",\"0\"],\n  [\"1\",\"1\",\"0\",\"1\",\"0\"],\n  [\"1\",\"1\",\"0\",\"0\",\"0\"],\n  [\"0\",\"0\",\"0\",\"0\",\"0\"]\n]\nOutput: 1\n\n**Example 2:**\nInput: grid = [\n  [\"1\",\"1\",\"0\",\"0\",\"0\"],\n  [\"1\",\"1\",\"0\",\"0\",\"0\"],\n  [\"0\",\"0\",\"1\",\"0\",\"0\"],\n  [\"0\",\"0\",\"0\",\"1\",\"1\"]\n]\nOutput: 3\n\n**Constraints:**\n- m == grid.length\n- n == grid[i].length\n- 1 <= m, n <= 300\n- grid[i][j] is '0' or '1'.",
    "difficulty": "medium",
    "topics": [
      "Graph",
      "Depth-First Search",
      "Breadth-First Search",
      "Union Find"
    ],
    "companies": [
      "Amazon",
      "Microsoft",
      "Google",
      "Facebook"
    ],
    "constraints": [
      "m == grid.length",
      "n == grid[i].length",
      "1 <= m, n <= 300",
      "grid[i][j] is '0' or '1'."
    ],
    "examples": [
      {
        "input": "grid = [[\"1\",\"1\",\"1\",\"1\",\"0\"],[\"1\",\"1\",\"0\",\"1\",\"0\"],[\"1\",\"1\",\"0\",\"0\",\"0\"],[\"0\",\"0\",\"0\",\"0\",\"0\"]]",
        "output": "1",
        "explanation": "All '1's are connected, forming one island."
      },
      {
        "input": "grid = [[\"1\",\"1\",\"0\",\"0\",\"0\"],[\"1\",\"1\",\"0\",\"0\",\"0\"],[\"0\",\"0\",\"1\",\"0\",\"0\"],[\"0\",\"0\",\"0\",\"1\",\"1\"]]",
        "output": "3",
        "explanation": "There are three separate islands."
      }
    ],
    "testCases": [
      {
        "input": "[[\"1\",\"1\",\"1\",\"1\",\"0\"],[\"1\",\"1\",\"0\",\"1\",\"0\"],[\"1\",\"1\",\"0\",\"0\",\"0\"],[\"0\",\"0\",\"0\",\"0\",\"0\"]]",
        "expectedOutput": "1",
        "isHidden": false
      },
      {
        "input": "[[\"1\",\"1\",\"0\",\"0\",\"0\"],[\"1\",\"1\",\"0\",\"0\",\"0\"],[\"0\",\"0\",\"1\",\"0\",\"0\"],[\"0\",\"0\",\"0\",\"1\",\"1\"]]",
        "expectedOutput": "3",
        "isHidden": false
      }
    ],
    "hints": [
      "This is a classic graph traversal problem, where the '1's are nodes and adjacent '1's have an edge.",
      "Iterate through every cell of the grid.",
      "If you find a '1' (land) that you haven't visited, increment an `islandCount`.",
      "Then, start a traversal (either DFS or BFS) from that cell to find all connected land ('1's).",
      "To mark a cell as 'visited' and prevent re-counting, you can either use a separate `visited` grid or modify the input grid by changing '1's to '0's (or another marker like '#') as you visit them."
    ],
    "solutions": [
      {
        "language": "javascript",
        "code": "var numIslands = function(grid) {\n    if (!grid || grid.length === 0) {\n        return 0;\n    }\n\n    let islandCount = 0;\n    const rows = grid.length;\n    const cols = grid[0].length;\n\n    // DFS helper function\n    function dfs(r, c) {\n        // Check boundaries and if it's water or already visited\n        if (r < 0 || c < 0 || r >= rows || c >= cols || grid[r][c] === '0') {\n            return;\n        }\n\n        // Mark as visited by sinking the island\n        grid[r][c] = '0';\n\n        // Visit neighbors\n        dfs(r + 1, c);\n        dfs(r - 1, c);\n        dfs(r, c + 1);\n        dfs(r, c - 1);\n    }\n\n    // Main loop to find islands\n    for (let r = 0; r < rows; r++) {\n        for (let c = 0; c < cols; c++) {\n            if (grid[r][c] === '1') {\n                // Found the start of a new island\n                islandCount++;\n                // Sink the entire connected island\n                dfs(r, c);\n            }\n        }\n    }\n\n    return islandCount;\n};",
        "explanation": "This solution iterates through each cell of the grid. When it finds a '1' (land), it increments `islandCount` and then calls a Depth-First Search (DFS) helper function `dfs` on that cell. The `dfs` function recursively visits all adjacent (horizontal/vertical) land cells. To mark cells as visited and prevent them from being counted as part of a new island later, it 'sinks' the land by changing the '1' to a '0'. This ensures that each connected component of '1's is counted exactly once.",
        "timeComplexity": "O(m * n)",
        "spaceComplexity": "O(m * n)"
      }
    ],
    "acceptanceRate": 51.7,
    "totalSubmissions": 19000,
    "correctSubmissions": 9823,
    "averageTime": 21
  },
  {
    "title": "Course Schedule",
    "description": "There are a total of `numCourses` courses you have to take, labeled from `0` to `numCourses - 1`. You are given an array `prerequisites` where `prerequisites[i] = [ai, bi]` indicates that you must take course `bi` first if you want to take course `ai`.\n\nFor example, the pair `[0, 1]` indicates that to take course `0` you have to first take course `1`.\nReturn `true` if you can finish all courses. Otherwise, return `false`.\n\n**Example 1:**\nInput: numCourses = 2, prerequisites = [[1,0]]\nOutput: true\nExplanation: There are a total of 2 courses to take. To take course 1 you should have finished course 0. So it is possible.\n\n**Example 2:**\nInput: numCourses = 2, prerequisites = [[1,0],[0,1]]\nOutput: false\nExplanation: There are a total of 2 courses to take. To take course 1 you should have finished course 0, and to take course 0 you should also have finished course 1. So it is impossible.\n\n**Constraints:**\n- 1 <= numCourses <= 2000\n- 0 <= prerequisites.length <= 5000\n- prerequisites[i].length == 2\n- 0 <= ai, bi < numCourses\n- All the pairs `prerequisites[i]` are **unique**.",
    "difficulty": "medium",
    "topics": [
      "Graph",
      "Topological Sort",
      "Depth-First Search",
      "Breadth-First Search"
    ],
    "companies": [
      "Amazon",
      "Facebook",
      "Google",
      "Uber"
    ],
    "constraints": [
      "1 <= numCourses <= 2000",
      "0 <= prerequisites.length <= 5000",
      "All prerequisite pairs are unique."
    ],
    "examples": [
      {
        "input": "numCourses = 2, prerequisites = [[1,0]]",
        "output": "true",
        "explanation": "You must take course 0 before course 1. This is possible."
      },
      {
        "input": "numCourses = 2, prerequisites = [[1,0],[0,1]]",
        "output": "false",
        "explanation": "This is a cycle (0 -> 1 -> 0). It's impossible."
      }
    ],
    "testCases": [
      {
        "input": "2\n[[1,0]]",
        "expectedOutput": "true",
        "isHidden": false
      },
      {
        "input": "2\n[[1,0],[0,1]]",
        "expectedOutput": "false",
        "isHidden": false
      },
      {
        "input": "5\n[[1,4],[2,4],[3,1],[3,2]]",
        "expectedOutput": "true",
        "isHidden": true
      }
    ],
    "hints": [
      "This problem is equivalent to finding if a directed graph has a cycle.",
      "The courses are nodes, and a prerequisite `[a, b]` is a directed edge from `b` to `a`.",
      "You can use Topological Sort (e.g., Kahn's algorithm using BFS and in-degrees) or DFS.",
      "For DFS, you need to keep track of visited nodes. To detect a cycle, you need two 'visited' states: one for the current recursion path (`visiting`) and one for nodes that have been fully processed (`visited`).",
      "If a DFS traversal encounters a node that is already in the `visiting` set, you have found a cycle."
    ],
    "solutions": [
      {
        "language": "javascript",
        "code": "var canFinish = function(numCourses, prerequisites) {\n    // 1. Build Adjacency List and In-Degree Array\n    const adj = new Array(numCourses).fill(0).map(() => []);\n    const inDegree = new Array(numCourses).fill(0);\n\n    for (const [course, pre] of prerequisites) {\n        adj[pre].push(course);\n        inDegree[course]++;\n    }\n\n    // 2. Initialize Queue with courses that have 0 in-degree\n    const queue = [];\n    for (let i = 0; i < numCourses; i++) {\n        if (inDegree[i] === 0) {\n            queue.push(i);\n        }\n    }\n\n    let coursesTaken = 0;\n\n    // 3. Process the queue (Kahn's Algorithm)\n    while (queue.length > 0) {\n        const course = queue.shift();\n        coursesTaken++;\n\n        // For each neighbor, 'remove' the edge by decrementing in-degree\n        for (const neighbor of adj[course]) {\n            inDegree[neighbor]--;\n            // If neighbor now has 0 in-degree, add it to the queue\n            if (inDegree[neighbor] === 0) {\n                queue.push(neighbor);\n            }\n        }\n    }\n\n    // 4. Check if we were able to take all courses\n    return coursesTaken === numCourses;\n};",
        "explanation": "This solution uses Topological Sort (specifically, Kahn's algorithm). First, we build an adjacency list `adj` representing the graph and an `inDegree` array to store the number of prerequisites for each course. Second, we initialize a `queue` with all courses that have an in-degree of 0 (no prerequisites). Third, we process the queue. We 'take' a course by dequeueing it and incrementing `coursesTaken`. For each neighbor of the 'taken' course, we decrement its in-degree (as we've satisfied one of its prerequisites). If a neighbor's in-degree drops to 0, we enqueue it. Finally, if the number of `coursesTaken` equals `numCourses`, it means we successfully processed all courses without a cycle. Otherwise, a cycle exists.",
        "timeComplexity": "O(V + E)",
        "spaceComplexity": "O(V + E)"
      }
    ],
    "acceptanceRate": 44.8,
    "totalSubmissions": 15000,
    "correctSubmissions": 6720,
    "averageTime": 23
  },
  {
    "title": "Find Median from Data Stream",
    "description": "The median is the middle value in an ordered integer list. If the size of the list is even, there is no middle value, and the median is the mean of the two middle values.\n\nImplement the `MedianFinder` class:\n- `MedianFinder()` initializes the `MedianFinder` object.\n- `void addNum(int num)` adds the integer `num` from the data stream to the data structure.\n- `double findMedian()` returns the median of all elements added so far.\n\n**Example 1:**\n`MedianFinder medianFinder = new MedianFinder();`\n`medianFinder.addNum(1);`    // arr = [1]\n`medianFinder.addNum(2);`    // arr = [1, 2]\n`medianFinder.findMedian();` // return 1.5 ( (1 + 2) / 2 )\n`medianFinder.addNum(3);`    // arr = [1, 2, 3]\n`medianFinder.findMedian();` // return 2.0\n\n**Constraints:**\n- -10^5 <= num <= 10^5\n- There will be at least one element in the data structure before calling `findMedian`.\n- At most 5 * 10^4 calls will be made to `addNum` and `findMedian`.",
    "difficulty": "hard",
    "topics": [
      "Heap (Priority Queue)",
      "Two Heaps",
      "Data Stream"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Facebook",
      "Microsoft"
    ],
    "constraints": [
      "-10^5 <= num <= 10^5",
      "At most 5 * 10^4 calls will be made to addNum and findMedian."
    ],
    "examples": [
      {
        "input": "[\"MedianFinder\", \"addNum\", \"addNum\", \"findMedian\", \"addNum\", \"findMedian\"] \n[[], [1], [2], [], [3], []]",
        "output": "[null, null, null, 1.5, null, 2.0]",
        "explanation": "See problem description."
      }
    ],
    "testCases": [
      {
        "input": "[\"MedianFinder\", \"addNum\", \"addNum\", \"findMedian\", \"addNum\", \"findMedian\"]\n[[], [1], [2], [], [3], []]",
        "expectedOutput": "[null, null, null, 1.5, null, 2.0]",
        "isHidden": false
      },
      {
        "input": "[\"MedianFinder\", \"addNum\", \"findMedian\", \"addNum\", \"findMedian\"]\n[[], [6], [], [10], []]",
        "expectedOutput": "[null, null, 6.0, null, 8.0]",
        "isHidden": true
      }
    ],
    "hints": [
      "A simple solution is to keep the numbers in a sorted array, but `addNum` would be O(n). We need a faster `addNum`.",
      "What if we divide the stream into two halves? A lower half and an upper half.",
      "Use two heaps: a Max-Heap for the lower half and a Min-Heap for the upper half.",
      "The Max-Heap stores the smallest `n/2` numbers, and the Min-Heap stores the largest `n/2` numbers.",
      "This keeps the median (or the two middle elements) at the top of the heaps.",
      "Make sure to balance the heaps so their sizes differ by at most 1."
    ],
    "solutions": [
      {
        "language": "javascript",
        "code": "// Note: JavaScript doesn't have native Heaps. A library (like 'collections/heap') is needed.\nconst Heap = require('collections/heap'); // Min-Heap by default\n\nclass MedianFinder {\n    constructor() {\n        // Max-Heap for the lower half\n        this.low = new Heap([], null, (a, b) => b - a);\n        // Min-Heap for the upper half\n        this.high = new Heap();\n    }\n\n    addNum(num) {\n        // Add to max-heap (lower half)\n        this.low.push(num);\n\n        // Ensure every number in low is <= every number in high\n        this.high.push(this.low.pop());\n\n        // Balance sizes: low can have one extra element\n        if (this.high.length > this.low.length) {\n            this.low.push(this.high.pop());\n        }\n    }\n\n    findMedian() {\n        if (this.low.length > this.high.length) {\n            return this.low.peek();\n        } else {\n            return (this.low.peek() + this.high.peek()) / 2;\n        }\n    }\n}",
        "explanation": "This solution uses two heaps: a Max-Heap (`low`) to store the smaller half of the numbers and a Min-Heap (`high`) to store the larger half. The `addNum` function maintains two invariants: 1. All numbers in `low` are less than or equal to all numbers in `high`. 2. The sizes of the heaps differ by at most 1 (`low` is allowed to have one extra element). To add a `num`, we add it to `low`, then move the largest element from `low` to `high` (to maintain invariant 1). Then, if `high` becomes larger than `low`, we move the smallest from `high` to `low` (to maintain invariant 2). `findMedian` is then simple: if the sizes are different, the median is the top of `low`. If they are the same, it's the average of the tops of both heaps.",
        "timeComplexity": "O(log n) for addNum, O(1) for findMedian",
        "spaceComplexity": "O(n)"
      }
    ],
    "acceptanceRate": 49.6,
    "totalSubmissions": 7000,
    "correctSubmissions": 3472,
    "averageTime": 40
  },
  {
    "title": "Top K Frequent Elements",
    "description": "Given an integer array `nums` and an integer `k`, return the `k` most frequent elements. You may return the answer in any order.\n\n**Example 1:**\nInput: nums = [1,1,1,2,2,3], k = 2\nOutput: [1,2]\n\n**Example 2:**\nInput: nums = [1], k = 1\nOutput: [1]\n\n**Constraints:**\n- 1 <= nums.length <= 10^5\n- -10^4 <= nums[i] <= 10^4\n- `k` is in the range [1, the number of unique elements in the array].\n- It is guaranteed that the answer is unique.\n- Follow up: Your algorithm's time complexity must be better than O(n log n).",
    "difficulty": "medium",
    "topics": [
      "Array",
      "Hash Table",
      "Heap (Priority Queue)",
      "Bucket Sort"
    ],
    "companies": [
      "Amazon",
      "Facebook",
      "Microsoft",
      "Uber"
    ],
    "constraints": [
      "1 <= nums.length <= 10^5",
      "k is in the range [1, the number of unique elements].",
      "The answer is unique.",
      "Time complexity must be better than O(n log n)."
    ],
    "examples": [
      {
        "input": "nums = [1,1,1,2,2,3], k = 2",
        "output": "[1,2]",
        "explanation": "1 appears 3 times, 2 appears 2 times, 3 appears 1 time. The 2 most frequent are 1 and 2."
      }
    ],
    "testCases": [
      {
        "input": "[1,1,1,2,2,3]\n2",
        "expectedOutput": "[1,2]",
        "isHidden": false
      },
      {
        "input": "[1]\n1",
        "expectedOutput": "[1]",
        "isHidden": false
      },
      {
        "input": "[4,1,-1,2,-1,2,3]\n2",
        "expectedOutput": "[-1,2]",
        "isHidden": true
      }
    ],
    "hints": [
      "First, build a frequency map (Hash Map) of all numbers. This is O(n).",
      "The 'Follow up' (better than O(n log n)) rules out sorting the map entries (which would be O(n log n)).",
      "One option is to use a Min-Heap of size `k`. Iterate through the map. For each `(num, freq)` pair, add it to the heap. If the heap size exceeds `k`, remove the minimum element. This is O(n log k).",
      "Another option is 'Bucket Sort'. Create an array of 'buckets' (lists) of size `n+1`. `bucket[i]` will store all numbers that have a frequency of `i`.",
      "Populate the buckets from your frequency map. Then, iterate backwards from `bucket[n]` down, adding elements to your result until you have `k` elements. This is O(n)."
    ],
    "solutions": [
      {
        "language": "javascript",
        "code": "var topKFrequent = function(nums, k) {\n    // 1. Build frequency map\n    const freqMap = new Map();\n    for (const num of nums) {\n        freqMap.set(num, (freqMap.get(num) || 0) + 1);\n    }\n\n    // 2. Create buckets. The index is the frequency.\n    // The size is nums.length + 1 because a num could appear n times.\n    const buckets = new Array(nums.length + 1).fill(0).map(() => []);\n\n    // 3. Populate buckets\n    for (const [num, freq] of freqMap.entries()) {\n        buckets[freq].push(num);\n    }\n\n    // 4. Extract top k elements by iterating buckets from the end\n    const result = [];\n    for (let i = buckets.length - 1; i >= 0 && result.length < k; i--) {\n        if (buckets[i].length > 0) {\n            // Add all numbers from this bucket (or as many as needed to reach k)\n            for (const num of buckets[i]) {\n                if (result.length < k) {\n                    result.push(num);\n                } else {\n                    break;\n                }\n            }\n        }\n    }\n\n    return result;\n};",
        "explanation": "This solution uses Bucket Sort, which achieves O(n) time complexity. First, we create a frequency map (`freqMap`) in O(n) time. Second, we create an array of `buckets`, where the index `i` of the array will store a list of all numbers that appear `i` times. We populate these buckets by iterating through our `freqMap` (O(m), where m is unique elements, m <= n). Finally, we create our `result` array by iterating *backwards* from the end of the `buckets` array (from highest frequency to lowest). We add elements from the buckets to `result` until `result.length` equals `k`.",
        "timeComplexity": "O(n)",
        "spaceComplexity": "O(n)"
      }
    ],
    "acceptanceRate": 63.1,
    "totalSubmissions": 12000,
    "correctSubmissions": 7572,
    "averageTime": 19
  },
  {
    "title": "Group Anagrams",
    "description": "Given an array of strings `strs`, group the anagrams together. You can return the answer in any order.\n\nAn Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.\n\n**Example 1:**\nInput: strs = [\"eat\",\"tea\",\"tan\",\"ate\",\"nat\",\"bat\"]\nOutput: [[\"bat\"],[\"nat\",\"tan\"],[\"ate\",\"eat\",\"tea\"]]\n\n**Example 2:**\nInput: strs = [\"\"]\nOutput: [[\"\"]]\n\n**Example 3:**\nInput: strs = [\"a\"]\nOutput: [[\"a\"]]\n\n**Constraints:**\n- 1 <= strs.length <= 10^4\n- 0 <= strs[i].length <= 100\n- strs[i] consists of lowercase English letters.",
    "difficulty": "medium",
    "topics": [
      "Array",
      "String",
      "Hash Table"
    ],
    "companies": [
      "Amazon",
      "Facebook",
      "Uber",
      "Google"
    ],
    "constraints": [
      "1 <= strs.length <= 10^4",
      "0 <= strs[i].length <= 100",
      "strs[i] consists of lowercase English letters."
    ],
    "examples": [
      {
        "input": "strs = [\"eat\",\"tea\",\"tan\",\"ate\",\"nat\",\"bat\"]",
        "output": "[[\"bat\"],[\"nat\",\"tan\"],[\"ate\",\"eat\",\"tea\"]]",
        "explanation": "Anagrams are grouped together."
      }
    ],
    "testCases": [
      {
        "input": "[\"eat\",\"tea\",\"tan\",\"ate\",\"nat\",\"bat\"]",
        "expectedOutput": "[[\"eat\",\"tea\",\"ate\"],[\"tan\",\"nat\"],[\"bat\"]]",
        "isHidden": false
      },
      {
        "input": "[\"\"]",
        "expectedOutput": "[[\"\"]]",
        "isHidden": false
      },
      {
        "input": "[\"a\"]",
        "expectedOutput": "[[\"a\"]]",
        "isHidden": true
      }
    ],
    "hints": [
      "How can you generate a unique 'key' for each group of anagrams?",
      "Two strings are anagrams if and only if their sorted character representations are identical.",
      "Iterate through the `strs` array. For each string, sort its characters to create a key (e.g., 'eat' -> 'aet').",
      "Use a hash map where the key is the sorted string and the value is a list of its anagrams.",
      "After populating the map, return the `values()` of the map."
    ],
    "solutions": [
      {
        "language": "javascript",
        "code": "var groupAnagrams = function(strs) {\n    const map = new Map();\n\n    for (const str of strs) {\n        // Create the key by sorting the string\n        // 'eat' -> ['e','a','t'] -> ['a','e','t'] -> 'aet'\n        const key = str.split('').sort().join('');\n\n        if (!map.has(key)) {\n            map.set(key, []);\n        }\n        \n        map.get(key).push(str);\n    }\n\n    // Return an array of the map's values\n    return Array.from(map.values());\n};",
        "explanation": "This solution uses a hash map to group the anagrams. The core idea is that all anagrams, when sorted, will produce the *same* string. We use this sorted string as the 'key' in our map. We iterate through each `str` in the input `strs`. For each `str`, we create its `key` by splitting it into characters, sorting them, and joining them back into a string. We then use this `key` to store the original `str` in our map. If the `key` doesn't exist, we initialize it with an empty array. Finally, we return an array containing all the values (which are the lists of anagrams) from the map.",
        "timeComplexity": "O(n * k log k)",
        "spaceComplexity": "O(n * k)"
      }
    ],
    "acceptanceRate": 64.2,
    "totalSubmissions": 13000,
    "correctSubmissions": 8346,
    "averageTime": 24
  },
  {
    "title": "Search in Rotated Sorted Array",
    "description": "There is an integer array `nums` sorted in ascending order (with distinct values).\n\nPrior to being passed to your function, `nums` is possibly rotated at an unknown pivot index `k` (1 <= k < nums.length).\n\nFor example, `[0,1,2,4,5,6,7]` might be rotated at pivot index 3 and become `[4,5,6,7,0,1,2]`.\n\nGiven the array `nums` after the possible rotation and an integer `target`, return the index of `target` if it is in `nums`, or -1 if it is not in `nums`.\n\nYou must write an algorithm with O(log n) runtime complexity.\n\n**Example 1:**\nInput: nums = [4,5,6,7,0,1,2], target = 0\nOutput: 4\n\n**Example 2:**\nInput: nums = [4,5,6,7,0,1,2], target = 3\nOutput: -1\n\n**Example 3:**\nInput: nums = [1], target = 0\nOutput: -1\n\n**Constraints:**\n- 1 <= nums.length <= 5000\n- -10^4 <= nums[i] <= 10^4\n- All values of `nums` are **unique**.\n- `nums` is an ascending array that is possibly rotated.\n- -10^4 <= target <= 10^4",
    "difficulty": "medium",
    "topics": [
      "Array",
      "Binary Search"
    ],
    "companies": [
      "Amazon",
      "Facebook",
      "Microsoft",
      "LinkedIn"
    ],
    "constraints": [
      "1 <= nums.length <= 5000",
      "All values are unique.",
      "Must run in O(log n) time."
    ],
    "examples": [
      {
        "input": "nums = [4,5,6,7,0,1,2], target = 0",
        "output": "4",
        "explanation": "The target 0 is found at index 4."
      },
      {
        "input": "nums = [4,5,6,7,0,1,2], target = 3",
        "output": "-1",
        "explanation": "The target 3 is not in the array."
      }
    ],
    "testCases": [
      {
        "input": "[4,5,6,7,0,1,2]\n0",
        "expectedOutput": "4",
        "isHidden": false
      },
      {
        "input": "[4,5,6,7,0,1,2]\n3",
        "expectedOutput": "-1",
        "isHidden": false
      },
      {
        "input": "[1,3]\n3",
        "expectedOutput": "1",
        "isHidden": true
      }
    ],
    "hints": [
      "This requires a modified Binary Search. The O(log n) complexity is the key.",
      "In a normal binary search, you compare `target` with `nums[mid]` and go left or right.",
      "Here, you have a rotated array. At any `mid`, one half (left or right) *must* be sorted.",
      "First, check if the left half (`nums[left]` to `nums[mid]`) is the sorted portion.",
      "If it is, check if the `target` lies within this sorted range. If yes, search left (`right = mid - 1`). If no, search right (`left = mid + 1`).",
      "If the left half is not sorted, then the right half (`nums[mid]` to `nums[right]`) must be sorted. Perform a similar check for the target in the right half."
    ],
    "solutions": [
      {
        "language": "javascript",
        "code": "var search = function(nums, target) {\n    let left = 0;\n    let right = nums.length - 1;\n\n    while (left <= right) {\n        let mid = Math.floor((left + right) / 2);\n\n        if (nums[mid] === target) {\n            return mid;\n        }\n\n        // Case 1: Left half (from left to mid) is sorted\n        if (nums[left] <= nums[mid]) {\n            // Check if target is in the left, sorted half\n            if (target >= nums[left] && target < nums[mid]) {\n                right = mid - 1; // Search left\n            } else {\n                left = mid + 1; // Search right\n            }\n        } \n        // Case 2: Right half (from mid to right) is sorted\n        else {\n            // Check if target is in the right, sorted half\n            if (target > nums[mid] && target <= nums[right]) {\n                left = mid + 1; // Search right\n            } else {\n                right = mid - 1; // Search left\n            }\n        }\n    }\n\n    return -1; // Target not found\n};",
        "explanation": "This is a modified Binary Search. In each step, we find the middle element `mid`. We know that at least one half of the array (from `left` to `mid` or from `mid` to `right`) must be sorted. We first check if the left half is sorted by comparing `nums[left]` and `nums[mid]`. If `nums[left] <= nums[mid]`, the left half is sorted. We then check if our `target` falls within this sorted range. If it does, we search the left half; otherwise, we search the right half. If the left half is *not* sorted, we know the right half *must* be, and we perform the same logic on the right half.",
        "timeComplexity": "O(log n)",
        "spaceComplexity": "O(1)"
      }
    ],
    "acceptanceRate": 37.1,
    "totalSubmissions": 22000,
    "correctSubmissions": 8162,
    "averageTime": 18
  },
  {
    "title": "Maximum Subarray",
    "description": "Given an integer array `nums`, find the contiguous subarray (containing at least one number) which has the largest sum and return its sum.\n\n**Example 1:**\nInput: nums = [-2,1,-3,4,-1,2,1,-5,4]\nOutput: 6\nExplanation: [4,-1,2,1] has the largest sum = 6.\n\n**Example 2:**\nInput: nums = [1]\nOutput: 1\n\n**Example 3:**\nInput: nums = [5,4,-1,7,8]\nOutput: 23\n\n**Constraints:**\n- 1 <= nums.length <= 10^5\n- -10^4 <= nums[i] <= 10^4",
    "difficulty": "easy",
    "topics": [
      "Array",
      "Dynamic Programming",
      "Divide and Conquer"
    ],
    "companies": [
      "Amazon",
      "Microsoft",
      "Google",
      "Facebook"
    ],
    "constraints": [
      "1 <= nums.length <= 10^5",
      "-10^4 <= nums[i] <= 10^4"
    ],
    "examples": [
      {
        "input": "nums = [-2,1,-3,4,-1,2,1,-5,4]",
        "output": "6",
        "explanation": "The contiguous subarray [4,-1,2,1] has the largest sum, 6."
      },
      {
        "input": "nums = [5,4,-1,7,8]",
        "output": "23",
        "explanation": "The entire array has the largest sum, 23."
      }
    ],
    "testCases": [
      {
        "input": "[-2,1,-3,4,-1,2,1,-5,4]",
        "expectedOutput": "6",
        "isHidden": false
      },
      {
        "input": "[1]",
        "expectedOutput": "1",
        "isHidden": false
      },
      {
        "input": "[-1]",
        "expectedOutput": "-1",
        "isHidden": true
      }
    ],
    "hints": [
      "This is a famous problem that can be solved with Dynamic Programming.",
      "The algorithm is known as 'Kadane's Algorithm'.",
      "Iterate through the array, keeping track of two variables: `currentSum` and `maxSum`.",
      "`currentSum` is the sum of the subarray ending at the current position.",
      "At each element `num`, `currentSum` becomes `max(num, currentSum + num)`. This is the key: you either start a *new* subarray at `num` (if `currentSum` was negative) or you *extend* the current subarray.",
      "Update `maxSum` with `currentSum` in each step: `maxSum = max(maxSum, currentSum)`."
    ],
    "solutions": [
      {
        "language": "javascript",
        "code": "var maxSubArray = function(nums) {\n    // Initialize with the first element's value\n    let maxSum = nums[0];\n    let currentSum = nums[0];\n\n    for (let i = 1; i < nums.length; i++) {\n        const num = nums[i];\n        \n        // Decide whether to start a new subarray or extend the current one\n        currentSum = Math.max(num, currentSum + num);\n        \n        // Update the overall maximum sum found so far\n        maxSum = Math.max(maxSum, currentSum);\n    }\n\n    return maxSum;\n};",
        "explanation": "This solution implements Kadane's Algorithm. We maintain two variables: `maxSum` (the maximum sum found so far) and `currentSum` (the maximum sum of a subarray ending at the current position). We initialize both to `nums[0]`. Then, we iterate from the second element. At each element `num`, we update `currentSum` by deciding whether it's better to start a new subarray (just `num`) or to extend the previous subarray (`currentSum + num`). This is done with `Math.max(num, currentSum + num)`. After updating `currentSum`, we update `maxSum` to be the maximum of its current value and the `currentSum`. This ensures `maxSum` always holds the largest contiguous sum found.",
        "timeComplexity": "O(n)",
        "spaceComplexity": "O(1)"
      }
    ],
    "acceptanceRate": 48.7,
    "totalSubmissions": 26000,
    "correctSubmissions": 12662,
    "averageTime": 14
  },
  {
    "title": "House Robber",
    "description": "You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed, the only constraint stopping you from robbing each of them is that adjacent houses have security systems connected and **it will automatically contact the police if two adjacent houses were broken into on the same night**.\n\nGiven an integer array `nums` representing the amount of money of each house, return the maximum amount of money you can rob tonight **without alerting the police**.\n\n**Example 1:**\nInput: nums = [1,2,3,1]\nOutput: 4\nExplanation: Rob house 1 (money = 1) and then rob house 3 (money = 3). Total amount you can rob = 1 + 3 = 4.\n\n**Example 2:**\nInput: nums = [2,7,9,3,1]\nOutput: 12\nExplanation: Rob house 1 (money = 2), house 3 (money = 9) and house 5 (money = 1). Total amount you can rob = 2 + 9 + 1 = 12.\n\n**Constraints:**\n- 1 <= nums.length <= 100\n- 0 <= nums[i] <= 400",
    "difficulty": "medium",
    "topics": [
      "Dynamic Programming",
      "Array"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Facebook",
      "LinkedIn"
    ],
    "constraints": [
      "1 <= nums.length <= 100",
      "0 <= nums[i] <= 400"
    ],
    "examples": [
      {
        "input": "nums = [1,2,3,1]",
        "output": "4",
        "explanation": "Rob houses 1 and 3. Total = 1 + 3 = 4."
      },
      {
        "input": "nums = [2,7,9,3,1]",
        "output": "12",
        "explanation": "Rob houses 1, 3, and 5. Total = 2 + 9 + 1 = 12."
      }
    ],
    "testCases": [
      {
        "input": "[1,2,3,1]",
        "expectedOutput": "4",
        "isHidden": false
      },
      {
        "input": "[2,7,9,3,1]",
        "expectedOutput": "12",
        "isHidden": false
      },
      {
        "input": "[2,1,1,2]",
        "expectedOutput": "4",
        "isHidden": true
      }
    ],
    "hints": [
      "This is a Dynamic Programming problem.",
      "Think about the decision you have to make at each house `i`.",
      "You have two choices: 1. Rob house `i`. 2. Don't rob house `i`.",
      "If you rob house `i`, you cannot rob house `i-1`. The max money you can have is `nums[i] + max_money_up_to(i-2)`.",
      "If you don't rob house `i`, the max money you can have is `max_money_up_to(i-1)`.",
      "So, `dp[i] = max(nums[i] + dp[i-2], dp[i-1])`.",
      "Can you optimize the space from O(n) to O(1)?"
    ],
    "solutions": [
      {
        "language": "javascript",
        "code": "var rob = function(nums) {\n    if (nums.length === 0) return 0;\n    if (nums.length === 1) return nums[0];\n\n    // We only need to know the 'robbed' amount from two houses ago and one house ago.\n    // 'robPrevOne' = max money robbing up to house i-1\n    // 'robPrevTwo' = max money robbing up to house i-2\n    \n    let robPrevOne = 0;\n    let robPrevTwo = 0;\n\n    for (const num of nums) {\n        // At the current house (num), we have two choices:\n        // 1. Rob this house: num + robPrevTwo (since we can't rob i-1)\n        // 2. Don't rob this house: robPrevOne (the max from the previous house)\n        const temp = Math.max(num + robPrevTwo, robPrevOne);\n        \n        // Shift the pointers for the next iteration\n        robPrevTwo = robPrevOne;\n        robPrevOne = temp;\n    }\n\n    // The final answer is the max money we could have after the last house\n    return robPrevOne;\n};",
        "explanation": "This is a space-optimized Dynamic Programming solution. Instead of building a full `dp` array, we only need to keep track of the last two maximums: the max money we could have robbed up to house `i-1` (`robPrevOne`) and the max money up to house `i-2` (`robPrevTwo`). When we are at the current house `num`, we have two choices: 1. Rob this house (`num`), which means we must add it to `robPrevTwo` (since we skipped `i-1`). 2. Don't rob this house, in which case our total is just `robPrevOne`. We take the max of these two choices (`temp`). Then, we update our pointers: `robPrevTwo` becomes the old `robPrevOne`, and `robPrevOne` becomes our new `temp`. The final answer is `robPrevOne`.",
        "timeComplexity": "O(n)",
        "spaceComplexity": "O(1)"
      }
    ],
    "acceptanceRate": 44.1,
    "totalSubmissions": 14000,
    "correctSubmissions": 6174,
    "averageTime": 16
  },
  {
    "title": "Valid Palindrome",
    "description": "A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward. Alphanumeric characters include letters and numbers.\n\nGiven a string `s`, return `true` if it is a palindrome, or `false` otherwise.\n\n**Example 1:**\nInput: s = \"A man, a plan, a canal: Panama\"\nOutput: true\nExplanation: \"amanaplanacanalpanama\" is a palindrome.\n\n**Example 2:**\nInput: s = \"race a car\"\nOutput: false\nExplanation: \"raceacar\" is not a palindrome.\n\n**Example 3:**\nInput: s = \" \"\nOutput: true\nExplanation: s is an empty string \"\" after removing non-alphanumeric characters. Since an empty string reads the same forward and backward, it is a palindrome.\n\n**Constraints:**\n- 1 <= s.length <= 2 * 10^5\n- s consists only of printable ASCII characters.",
    "difficulty": "easy",
    "topics": [
      "String",
      "Two Pointers"
    ],
    "companies": [
      "Facebook",
      "Microsoft",
      "Uber",
      "Amazon"
    ],
    "constraints": [
      "1 <= s.length <= 2 * 10^5",
      "s consists only of printable ASCII characters."
    ],
    "examples": [
      {
        "input": "s = \"A man, a plan, a canal: Panama\"",
        "output": "true",
        "explanation": "After processing, the string is \"amanaplanacanalpanama\", which is a palindrome."
      },
      {
        "input": "s = \"race a car\"",
        "output": "false",
        "explanation": "After processing, the string is \"raceacar\", which is not a palindrome."
      }
    ],
    "testCases": [
      {
        "input": "\"A man, a plan, a canal: Panama\"",
        "expectedOutput": "true",
        "isHidden": false
      },
      {
        "input": "\"race a car\"",
        "expectedOutput": "false",
        "isHidden": false
      },
      {
        "input": "\" \"",
        "expectedOutput": "true",
        "isHidden": true
      },
      {
        "input": "\"0P\"",
        "expectedOutput": "false",
        "isHidden": true
      }
    ],
    "hints": [
      "A simple approach is to first 'clean' the string: convert to lowercase and remove all non-alphanumeric characters. Then, check if the cleaned string is equal to its reverse.",
      "A more efficient, in-place approach is to use Two Pointers.",
      "Use one pointer `left` starting at the beginning and `right` at the end.",
      "Move `left` forward until it points to an alphanumeric character.",
      "Move `right` backward until it points to an alphanumeric character.",
      "Compare the lowercase versions of the characters at `left` and `right`. If they don't match, return `false`.",
      "If they do match, move both pointers (`left++`, `right--`) and repeat until `left >= right`."
    ],
    "solutions": [
      {
        "language": "javascript",
        "code": "var isPalindrome = function(s) {\n    let left = 0;\n    let right = s.length - 1;\n\n    // Helper to check if a char is alphanumeric\n    function isAlphaNumeric(char) {\n        const code = char.charCodeAt(0);\n        return (code >= 48 && code <= 57) || // 0-9\n               (code >= 65 && code <= 90) || // A-Z\n               (code >= 97 && code <= 122);  // a-z\n    }\n\n    while (left < right) {\n        // Move left pointer to the next alphanumeric char\n        while (left < right && !isAlphaNumeric(s[left])) {\n            left++;\n        }\n\n        // Move right pointer to the previous alphanumeric char\n        while (left < right && !isAlphaNumeric(s[right])) {\n            right--;\n        }\n\n        // Compare the two chars (case-insensitive)\n        if (s[left].toLowerCase() !== s[right].toLowerCase()) {\n            return false;\n        }\n\n        // Move pointers inward\n        left++;\n        right--;\n    }\n\n    return true;\n};",
        "explanation": "This solution uses the Two Pointer approach to avoid creating a new string. We set `left` to the start and `right` to the end. The `while` loop continues as long as `left < right`. Inside the loop, we first move `left` forward, skipping any non-alphanumeric characters. We do the same for `right`, moving it backward. Once both pointers are on alphanumeric characters, we compare their lowercase versions. If they are not equal, we return `false`. If they are equal, we move both pointers inward and continue the process. If the loop finishes without returning `false`, it means the string is a palindrome, so we return `true`.",
        "timeComplexity": "O(n)",
        "spaceComplexity": "O(1)"
      }
    ],
    "acceptanceRate": 40.5,
    "totalSubmissions": 21000,
    "correctSubmissions": 8505,
    "averageTime": 13
  },
  {
    "title": "Lowest Common Ancestor of a BST",
    "description": "Given a binary search tree (BST), find the lowest common ancestor (LCA) of two given nodes `p` and `q` in the BST.\n\nThe lowest common ancestor is defined between two nodes `p` and `q` as the lowest node in `T` that has both `p` and `q` as descendants (where we allow a node to be a descendant of itself).\n\n**Example 1:**\nInput: root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 8\nOutput: 6\nExplanation: The LCA of nodes 2 and 8 is 6.\n\n**Example 2:**\nInput: root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 4\nOutput: 2\nExplanation: The LCA of nodes 2 and 4 is 2, since a node can be a descendant of itself.\n\n**Constraints:**\n- The number of nodes in the tree is in the range [2, 10^5].\n- -10^9 <= Node.val <= 10^9\n- All `Node.val` are **unique**.\n- `p != q`\n- `p` and `q` will exist in the BST.",
    "difficulty": "easy",
    "topics": [
      "Tree",
      "Binary Search Tree",
      "Recursion"
    ],
    "companies": [
      "Amazon",
      "Facebook",
      "Microsoft",
      "Twitter"
    ],
    "constraints": [
      "All Node.val are unique.",
      "p != q",
      "p and q will exist in the BST."
    ],
    "examples": [
      {
        "input": "root = [6,2,8...], p = 2, q = 8",
        "output": "6",
        "explanation": "p (2) is in the left subtree, q (8) is in the right subtree. The split point is 6."
      },
      {
        "input": "root = [6,2,8...], p = 2, q = 4",
        "output": "2",
        "explanation": "Both p and q are in the left subtree of 6. At node 2, p is the node itself and q is in its right subtree."
      }
    ],
    "testCases": [
      {
        "input": "[6,2,8,0,4,7,9,null,null,3,5]\n2\n8",
        "expectedOutput": "6",
        "isHidden": false
      },
      {
        "input": "[6,2,8,0,4,7,9,null,null,3,5]\n2\n4",
        "expectedOutput": "2",
        "isHidden": false
      },
      {
        "input": "[2,1]\n2\n1",
        "expectedOutput": "2",
        "isHidden": true
      }
    ],
    "hints": [
      "Take advantage of the properties of a Binary Search Tree (BST).",
      "All nodes in the left subtree are smaller than the root, and all nodes in the right subtree are larger.",
      "Start at the `root`. Compare the values of `p` and `q` with the root's value.",
      "If both `p.val` and `q.val` are *smaller* than `root.val`, the LCA must be in the left subtree. Recurse left.",
      "If both `p.val` and `q.val` are *larger* than `root.val`, the LCA must be in the right subtree. Recurse right.",
      "If one is smaller and one is larger (or one is equal to the root), then the current `root` is the 'split point' and must be the LCA. Return the `root`."
    ],
    "solutions": [
      {
        "language": "javascript",
        "code": "/**\n * Definition for a binary tree node.\n * function TreeNode(val) {\n * this.val = val;\n * this.left = this.right = null;\n * }\n */\nvar lowestCommonAncestor = function(root, p, q) {\n    let current = root;\n\n    while (current) {\n        if (p.val > current.val && q.val > current.val) {\n            // Both p and q are in the right subtree\n            current = current.right;\n        } else if (p.val < current.val && q.val < current.val) {\n            // Both p and q are in the left subtree\n            current = current.left;\n        } else {\n            // We found the split point (or one of them is the root)\n            // This is the LCA\n            return current;\n        }\n    }\n};",
        "explanation": "This solution leverages the BST property. We start at the `root`. In a `while` loop, we check three conditions: 1. If both `p` and `q`'s values are greater than the `current` node's value, we know the LCA must be in the right subtree, so we move `current = current.right`. 2. If both `p` and `q`'s values are less than the `current` node's value, we know the LCA must be in the left subtree, so we move `current = current.left`. 3. If neither of the above is true, it means `current` is the 'split point' (one node is to the left, one is to the right) OR one of `p` or `q` *is* the `current` node. In this case, `current` is the LCA, so we return it.",
        "timeComplexity": "O(H)",
        "spaceComplexity": "O(1)"
      }
    ],
    "acceptanceRate": 85.1,
    "totalSubmissions": 11000,
    "correctSubmissions": 9361,
    "averageTime": 12
  },
  {
    "title": "Rotate Image",
    "description": "You are given an `n x n` 2D matrix representing an image. Rotate the image by 90 degrees (clockwise).\n\nYou have to rotate the image in-place, which means you have to modify the input 2D matrix directly. DO NOT allocate another 2D matrix and do the rotation.\n\n**Example 1:**\nInput: matrix = [[1,2,3],[4,5,6],[7,8,9]]\nOutput: [[7,4,1],[8,5,2],[9,6,3]]\n\n**Example 2:**\nInput: matrix = [[5,1,9,11],[2,4,8,10],[13,3,6,7],[15,14,12,16]]\nOutput: [[15,13,2,5],[14,3,4,1],[12,6,8,9],[16,7,10,11]]\n\n**Constraints:**\n- `n == matrix.length == matrix[i].length`\n- 1 <= n <= 20\n- -1000 <= matrix[i][j] <= 1000",
    "difficulty": "medium",
    "topics": [
      "Array",
      "Matrix",
      "Math"
    ],
    "companies": [
      "Amazon",
      "Microsoft",
      "Apple",
      "Adobe"
    ],
    "constraints": [
      "n == matrix.length == matrix[i].length",
      "1 <= n <= 20",
      "Must be done in-place."
    ],
    "examples": [
      {
        "input": "matrix = [[1,2,3],[4,5,6],[7,8,9]]",
        "output": "[[7,4,1],[8,5,2],[9,6,3]]",
        "explanation": "The matrix is rotated 90 degrees clockwise."
      }
    ],
    "testCases": [
      {
        "input": "[[1,2,3],[4,5,6],[7,8,9]]",
        "expectedOutput": "[[7,4,1],[8,5,2],[9,6,3]]",
        "isHidden": false
      },
      {
        "input": "[[5,1,9,11],[2,4,8,10],[13,3,6,7],[15,14,12,16]]",
        "expectedOutput": "[[15,13,2,5],[14,3,4,1],[12,6,8,9],[16,7,10,11]]",
        "isHidden": false
      }
    ],
    "hints": [
      "A 90-degree clockwise rotation can be achieved in two steps.",
      "Step 1: Transpose the matrix. (Swap `matrix[i][j]` with `matrix[j][i]`). This swaps elements across the main diagonal.",
      "Step 2: Reverse each row of the transposed matrix.",
      "For example: [1,2,3],[4,5,6],[7,8,9] -> (Transpose) -> [1,4,7],[2,5,8],[3,6,9] -> (Reverse rows) -> [7,4,1],[8,5,2],[9,6,3].",
      "This can all be done in-place."
    ],
    "solutions": [
      {
        "language": "javascript",
        "code": "var rotate = function(matrix) {\n    const n = matrix.length;\n\n    // 1. Transpose the matrix (swap across the diagonal)\n    for (let i = 0; i < n; i++) {\n        // Only need to go up to j < i\n        for (let j = 0; j < i; j++) {\n            // Swap matrix[i][j] and matrix[j][i]\n            const temp = matrix[i][j];\n            matrix[i][j] = matrix[j][i];\n            matrix[j][i] = temp;\n        }\n    }\n\n    // 2. Reverse each row\n    for (let i = 0; i < n; i++) {\n        matrix[i].reverse();\n    }\n};",
        "explanation": "This in-place solution works in two passes. First, we transpose the matrix. This means we swap `matrix[i][j]` with `matrix[j][i]` for all `j < i`. This effectively mirrors the matrix along its main diagonal (top-left to bottom-right). Second, we iterate through each row of the now-transposed matrix and simply reverse it. The combination of transposing and then reversing each row results in a 90-degree clockwise rotation.",
        "timeComplexity": "O(n^2)",
        "spaceComplexity": "O(1)"
      }
    ],
    "acceptanceRate": 66.8,
    "totalSubmissions": 9000,
    "correctSubmissions": 6012,
    "averageTime": 15
  },
  {
    "title": "Missing Number",
    "description": "Given an array `nums` containing `n` distinct numbers in the range `[0, n]`, return the only number in the range that is missing from the array.\n\n**Example 1:**\nInput: nums = [3,0,1]\nOutput: 2\nExplanation: n = 3 since there are 3 numbers, so the range is [0, 3]. 2 is the missing number in the range since it does not appear in nums.\n\n**Example 2:**\nInput: nums = [0,1]\nOutput: 2\nExplanation: n = 2 since there are 2 numbers, so the range is [0, 2]. 2 is the missing number in the range.\n\n**Example 3:**\nInput: nums = [9,6,4,2,3,5,7,0,1]\nOutput: 8\n\n**Constraints:**\n- n == nums.length\n- 1 <= n <= 10^4\n- 0 <= nums[i] <= n\n- All the numbers of `nums` are unique.",
    "difficulty": "easy",
    "topics": [
      "Array",
      "Hash Table",
      "Math",
      "Bit Manipulation"
    ],
    "companies": [
      "Amazon",
      "Microsoft",
      "Google",
      "Facebook"
    ],
    "constraints": [
      "n == nums.length",
      "1 <= n <= 10^4",
      "0 <= nums[i] <= n",
      "All the numbers of nums are unique."
    ],
    "examples": [
      {
        "input": "nums = [3,0,1]",
        "output": "2",
        "explanation": "n = 3, so the range is [0, 3]. 2 is missing."
      },
      {
        "input": "nums = [0,1]",
        "output": "2",
        "explanation": "n = 2, so the range is [0, 2]. 2 is missing."
      }
    ],
    "testCases": [
      {
        "input": "[3,0,1]",
        "expectedOutput": "2",
        "isHidden": false
      },
      {
        "input": "[9,6,4,2,3,5,7,0,1]",
        "expectedOutput": "8",
        "isHidden": false
      },
      {
        "input": "[0]",
        "expectedOutput": "1",
        "isHidden": true
      }
    ],
    "hints": [
      "One approach is to use a Hash Set to store all numbers in `nums`, then iterate from 0 to n and check which number is missing.",
      "A more efficient approach uses math. The sum of numbers from 0 to n is `n*(n+1)/2` (Gauss's formula). The missing number is this expected sum minus the actual sum of the `nums` array.",
      "An O(1) space solution using Bit Manipulation exists. You can XOR all indices from 0 to n with all numbers in the array. The remaining value will be the missing number."
    ],
    "solutions": [
      {
        "language": "javascript",
        "code": "var missingNumber = function(nums) {\n    const n = nums.length;\n    // Calculate the expected sum of the range [0, n]\n    let expectedSum = (n * (n + 1)) / 2;\n    \n    // Calculate the actual sum of the numbers in the array\n    let actualSum = 0;\n    for (const num of nums) {\n        actualSum += num;\n    }\n    \n    // The difference is the missing number\n    return expectedSum - actualSum;\n};",
        "explanation": "This solution uses Gauss's formula for the sum of an arithmetic series. The array *should* contain all numbers from 0 to `n`. We calculate the `expectedSum` of this full range. We then calculate the `actualSum` of the `nums` array. The missing number is simply the `expectedSum - actualSum`.",
        "timeComplexity": "O(n)",
        "spaceComplexity": "O(1)"
      }
    ],
    "acceptanceRate": 58.9,
    "totalSubmissions": 12000,
    "correctSubmissions": 7068,
    "averageTime": 10
  },
  {
    "title": "Find All Duplicates in an Array",
    "description": "Given an integer array `nums` of length `n` where all the integers of `nums` are in the range `[1, n]` and each integer appears **once or twice**, return an array of all the integers that appear **twice**.\n\nYou must write an algorithm that runs in O(n) time and uses only constant extra space.\n\n**Example 1:**\nInput: nums = [4,3,2,7,8,2,3,1]\nOutput: [2,3]\n\n**Example 2:**\nInput: nums = [1,1,2]\nOutput: [1]\n\n**Example 3:**\nInput: nums = [1]\nOutput: []\n\n**Constraints:**\n- n == nums.length\n- 1 <= n <= 10^5\n- 1 <= nums[i] <= n\n- Each element in `nums` appears **once or twice**.",
    "difficulty": "medium",
    "topics": [
      "Array",
      "Hash Table"
    ],
    "companies": [
      "Amazon",
      "Facebook",
      "Microsoft"
    ],
    "constraints": [
      "n == nums.length",
      "1 <= n <= 10^5",
      "1 <= nums[i] <= n",
      "Each element appears once or twice.",
      "Must be O(n) time and O(1) space."
    ],
    "examples": [
      {
        "input": "nums = [4,3,2,7,8,2,3,1]",
        "output": "[2,3]",
        "explanation": "2 and 3 both appear twice."
      },
      {
        "input": "nums = [1,1,2]",
        "output": "[1]",
        "explanation": "1 appears twice."
      }
    ],
    "testCases": [
      {
        "input": "[4,3,2,7,8,2,3,1]",
        "expectedOutput": "[2,3]",
        "isHidden": false
      },
      {
        "input": "[1,1,2]",
        "expectedOutput": "[1]",
        "isHidden": false
      },
      {
        "input": "[1]",
        "expectedOutput": "[]",
        "isHidden": true
      }
    ],
    "hints": [
      "The constraints O(n) time and O(1) space, plus the range `[1, n]`, are the key.",
      "You can't use a hash set for O(1) space.",
      "Think about using the array itself as a hash set.",
      "Iterate through the array. For each number `num`, go to the index `abs(num) - 1` (since the array is 1-indexed, but the array is 0-indexed).",
      "Use the *sign* of the number at that index as a 'visited' marker. If `nums[abs(num) - 1]` is already negative, it means you've seen `num` before. Add `abs(num)` to your result list.",
      "If it's positive, flip its sign to negative to mark it as seen."
    ],
    "solutions": [
      {
        "language": "javascript",
        "code": "var findDuplicates = function(nums) {\n    const duplicates = [];\n    \n    for (let i = 0; i < nums.length; i++) {\n        // Get the value and find the corresponding index\n        const num = Math.abs(nums[i]);\n        const index = num - 1;\n        \n        // Check the sign of the number at that index\n        if (nums[index] < 0) {\n            // If it's already negative, this is the second time\n            // we've seen 'num', so it's a duplicate.\n            duplicates.push(num);\n        } else {\n            // If it's positive, flip its sign to mark it as 'seen'.\n            nums[index] = -nums[index];\n        }\n    }\n    \n    return duplicates;\n};",
        "explanation": "This solution cleverly uses the input array itself to store 'visited' information, achieving O(1) space. We iterate through `nums`. For each number, we take its absolute value `num` (in case it was already flipped) and use it to find an `index` (`num - 1`). We then check the sign of `nums[index]`. If `nums[index]` is already negative, it means we have seen `num` before, so we add `num` to our `duplicates` list. If `nums[index]` is positive, we flip its sign to negative, marking `num` as 'seen' for the first time.",
        "timeComplexity": "O(n)",
        "spaceComplexity": "O(1)"
      }
    ],
    "acceptanceRate": 68.7,
    "totalSubmissions": 6000,
    "correctSubmissions": 4122,
    "averageTime": 19
  },
  {
    "title": "Longest Repeating Character Replacement",
    "description": "You are given a string `s` and an integer `k`. You can choose any character of the string and change it to any other uppercase English character. You can perform this operation at most `k` times.\n\nReturn the length of the longest substring containing the same letter you can get after performing the above operations.\n\n**Example 1:**\nInput: s = \"ABAB\", k = 2\nOutput: 4\nExplanation: Replace the two 'A's with 'B's or vice versa. \"BBBB\" or \"AAAA\".\n\n**Example 2:**\nInput: s = \"AABABBA\", k = 1\nOutput: 4\nExplanation: Replace the 'B' at index 2 with 'A'. Substring \"AAAA\" has length 4.\n\n**Constraints:**\n- 1 <= s.length <= 10^5\n- `s` consists of only uppercase English letters.\n- 0 <= k <= s.length",
    "difficulty": "medium",
    "topics": [
      "String",
      "Sliding Window",
      "Hash Table"
    ],
    "companies": [
      "Amazon",
      "Facebook",
      "Google",
      "Microsoft"
    ],
    "constraints": [
      "1 <= s.length <= 10^5",
      "s consists of only uppercase English letters.",
      "0 <= k <= s.length"
    ],
    "examples": [
      {
        "input": "s = \"ABAB\", k = 2",
        "output": "4",
        "explanation": "Replace two 'A's to get \"BBBB\", length 4."
      },
      {
        "input": "s = \"AABABBA\", k = 1",
        "output": "4",
        "explanation": "Replace 'B' at index 2 to get \"AAAA\", length 4."
      }
    ],
    "testCases": [
      {
        "input": "\"ABAB\"\n2",
        "expectedOutput": "4",
        "isHidden": false
      },
      {
        "input": "\"AABABBA\"\n1",
        "expectedOutput": "4",
        "isHidden": false
      },
      {
        "input": "\"ABCDE\"\n1",
        "expectedOutput": "2",
        "isHidden": true
      }
    ],
    "hints": [
      "This problem can be solved using a Sliding Window.",
      "Maintain a window (`left`, `right`) and a frequency map of characters within that window.",
      "Also, keep track of the frequency of the *most frequent character* in the window (`maxFreq`).",
      "The size of the window is `right - left + 1`. The number of 'other' characters is `windowSize - maxFreq`.",
      "This number of 'other' characters is what we need to replace. This value must be `<= k`.",
      "Expand the window by moving `right`. If `windowSize - maxFreq > k`, shrink the window by moving `left`."
    ],
    "solutions": [
      {
        "language": "javascript",
        "code": "var characterReplacement = function(s, k) {\n    let left = 0;\n    let maxLength = 0;\n    let maxFreq = 0;\n    const charCount = new Map();\n\n    for (let right = 0; right < s.length; right++) {\n        // 1. Add the new char to the window\n        const char = s[right];\n        charCount.set(char, (charCount.get(char) || 0) + 1);\n        maxFreq = Math.max(maxFreq, charCount.get(char));\n\n        // 2. Check if the window is invalid\n        // The number of chars to replace is (windowSize - maxFreq)\n        const windowSize = right - left + 1;\n        if (windowSize - maxFreq > k) {\n            // 3. Shrink the window from the left\n            const leftChar = s[left];\n            charCount.set(leftChar, charCount.get(leftChar) - 1);\n            left++;\n            // Note: We don't need to recalculate maxFreq when shrinking,\n            // because we only care about the *overall* max length.\n            // The window size will only grow again when maxFreq increases.\n        }\n\n        // 4. Update maxLength\n        // The window is always valid or has just been made valid\n        maxLength = Math.max(maxLength, right - left + 1);\n    }\n\n    return maxLength;\n};",
        "explanation": "This solution uses a sliding window. We maintain `left` and `right` pointers, a frequency map `charCount`, and `maxFreq` (the count of the most frequent character *ever* seen in a valid window). We expand the window by moving `right`. We update the `charCount` and `maxFreq`. We then check if the current window is valid. A window is valid if `(windowSize - maxFreq) <= k`. If it's *invalid* (`> k`), we must shrink the window by moving `left` and decrementing its character count. We don't need to re-calculate `maxFreq` when shrinking, as the window will only become a candidate for a new `maxLength` when `maxFreq` itself increases. In every iteration, we update `maxLength` with the size of the current (potentially valid) window.",
        "timeComplexity": "O(n)",
        "spaceComplexity": "O(1)"
      }
    ],
    "acceptanceRate": 51.3,
    "totalSubmissions": 7000,
    "correctSubmissions": 3591,
    "averageTime": 25
  },
  {
    "title": "String to Integer (atoi)",
    "description": "Implement the `myAtoi(string s)` function, which converts a string to a 32-bit signed integer (similar to C/C++'s `atoi` function).\n\nThe algorithm is as follows:\n1. Read in and ignore any leading whitespace.\n2. Check if the next character is '-' or '+'. Read this character in if it is either. This determines if the final result is negative or positive.\n3. Read in next the characters as long as they are digits.\n4. Convert these digits into an integer. If no digits were read, the integer is 0.\n5. If the integer is out of the 32-bit signed integer range `[-2^31, 2^31 - 1]`, then clamp the integer so that it remains in the range.\n\n**Example 1:**\nInput: s = \"42\"\nOutput: 42\n\n**Example 2:**\nInput: s = \"   -42\"\nOutput: -42\n\n**Example 3:**\nInput: s = \"4193 with words\"\nOutput: 4193\n\n**Constraints:**\n- 0 <= s.length <= 200\n- `s` consists of English letters (lower-case and upper-case), digits (0-9), ' ', '+', '-', and '.'.",
    "difficulty": "medium",
    "topics": [
      "String"
    ],
    "companies": [
      "Amazon",
      "Microsoft",
      "Facebook",
      "Uber"
    ],
    "constraints": [
      "0 <= s.length <= 200",
      "s consists of English letters, digits, ' ', '+', '-', and '.'."
    ],
    "examples": [
      {
        "input": "s = \"   -42\"",
        "output": -42,
        "explanation": "Leading whitespace is skipped. '-' is read. \"42\" is read and converted."
      },
      {
        "input": "s = \"4193 with words\"",
        "output": 4193,
        "explanation": "Reads \"4193\" and stops at 'w'."
      },
      {
        "input": "s = \"-91283472332\"",
        "output": -2147483648,
        "explanation": "The number is outside the 32-bit range, so it is clamped to the minimum value."
      }
    ],
    "testCases": [
      {
        "input": "\"42\"",
        "expectedOutput": "42",
        "isHidden": false
      },
      {
        "input": "\"   -42\"",
        "expectedOutput": -42,
        "isHidden": false
      },
      {
        "input": "\"4193 with words\"",
        "expectedOutput": "4193",
        "isHidden": false
      },
      {
        "input": "\"words and 987\"",
        "expectedOutput": "0",
        "isHidden": true
      },
      {
        "input": "\"-91283472332\"",
        "expectedOutput": -2147483648,
        "isHidden": true
      }
    ],
    "hints": [
      "This is a simulation problem. You must follow the steps precisely.",
      "Use an index `i` to iterate through the string.",
      "Handle the 5 states: 1. Skipping whitespace. 2. Checking for sign. 3. Reading digits. 4. Handling overflow/clamping. 5. Returning the result.",
      "Be very careful about overflow *before* it happens. When building the number `result`, check if `result > MAX_INT / 10` or if `result == MAX_INT / 10` and the next digit is `> 7`."
    ],
    "solutions": [
      {
        "language": "javascript",
        "code": "var myAtoi = function(s) {\n    const MIN_INT = -2147483648; // -2^31\n    const MAX_INT = 2147483647;  // 2^31 - 1\n\n    let i = 0;\n    let sign = 1;\n    let result = 0;\n\n    // 1. Ignore leading whitespace\n    while (i < s.length && s[i] === ' ') {\n        i++;\n    }\n\n    // 2. Check for sign\n    if (i < s.length && (s[i] === '+' || s[i] === '-')) {\n        sign = (s[i] === '-') ? -1 : 1;\n        i++;\n    }\n\n    // 3. Read digits and handle overflow\n    while (i < s.length && s[i] >= '0' && s[i] <= '9') {\n        const digit = s[i] - '0';\n\n        // Check for overflow BEFORE it happens\n        if (result > Math.floor(MAX_INT / 10) || (result === Math.floor(MAX_INT / 10) && digit > 7)) {\n            return (sign === 1) ? MAX_INT : MIN_INT;\n        }\n\n        result = result * 10 + digit;\n        i++;\n    }\n\n    // 4. Apply sign\n    return result * sign;\n};",
        "explanation": "This solution carefully follows the problem's rules. It uses a pointer `i` to scan the string. It first skips whitespace, then checks for a single '+' or '-' sign to set `sign`. Then, it enters a loop that continues as long as the character is a digit. Inside this loop, it performs a crucial overflow check *before* appending the next digit. It checks if `result` is already greater than `MAX_INT / 10`, or if it's equal and the new `digit` is greater than 7 (since `MAX_INT` ends in 7). If overflow would occur, it returns the clamped value. Otherwise, it updates `result`. Finally, it returns `result * sign`.",
        "timeComplexity": "O(n)",
        "spaceComplexity": "O(1)"
      }
    ],
    "acceptanceRate": 16.5,
    "totalSubmissions": 30000,
    "correctSubmissions": 4950,
    "averageTime": 22
  },
  {
    "title": "Minimum Window Substring",
    "description": "Given two strings `s` and `t` of lengths `m` and `n` respectively, return the minimum window substring of `s` such that every character in `t` (including duplicates) is included in the window.\n\nIf there is no such substring, return the empty string `\"\"`.\n\n**Example 1:**\nInput: s = \"ADOBECODEBANC\", t = \"ABC\"\nOutput: \"BANC\"\nExplanation: The minimum window is \"BANC\" which includes 'A', 'B', and 'C'.\n\n**Example 2:**\nInput: s = \"a\", t = \"a\"\nOutput: \"a\"\n\n**Example 3:**\nInput: s = \"a\", t = \"aa\"\nOutput: \"\"\nExplanation: Both 'a's from t must be included. Since s only has one, it's impossible.\n\n**Constraints:**\n- m == s.length\n- n == t.length\n- 1 <= m, n <= 10^5\n- `s` and `t` consist of uppercase and lowercase English letters.",
    "difficulty": "hard",
    "topics": [
      "String",
      "Sliding Window",
      "Hash Table"
    ],
    "companies": [
      "Amazon",
      "Facebook",
      "Microsoft",
      "LinkedIn"
    ],
    "constraints": [
      "m == s.length",
      "n == t.length",
      "1 <= m, n <= 10^5",
      "s and t consist of uppercase and lowercase English letters."
    ],
    "examples": [
      {
        "input": "s = \"ADOBECODEBANC\", t = \"ABC\"",
        "output": "\"BANC\"",
        "explanation": "The minimum window containing 'A', 'B', and 'C' is \"BANC\"."
      },
      {
        "input": "s = \"a\", t = \"aa\"",
        "output": "\"\"",
        "explanation": "Not possible to find two 'a's."
      }
    ],
    "testCases": [
      {
        "input": "\"ADOBECODEBANC\"\n\"ABC\"",
        "expectedOutput": "\"BANC\"",
        "isHidden": false
      },
      {
        "input": "\"a\"\n\"a\"",
        "expectedOutput": "\"a\"",
        "isHidden": false
      },
      {
        "input": "\"a\"\n\"aa\"",
        "expectedOutput": "\"\"",
        "isHidden": true
      },
      {
        "input": "\"bba\"\n\"ab\"",
        "expectedOutput": "\"ba\"",
        "isHidden": true
      }
    ],
    "hints": [
      "This is a classic Sliding Window problem.",
      "First, create a frequency map (`tMap`) for all characters in `t`.",
      "Use two pointers, `left` and `right`, to define the window. Also maintain a `windowMap` for character counts within the window.",
      "Use two counters: `needed` (the number of unique chars from `t` we need) and `have` (the number of unique chars from `t` we have fully matched in the window). `needed` is `tMap.size`.",
      "Expand the window by moving `right`. Update `windowMap`. If a character is in `tMap` and its count in `windowMap` matches its count in `tMap`, increment `have`.",
      "Once `have == needed`, the window is 'valid'. Now, try to *shrink* the window from the `left` as much as possible while keeping `have == needed`. Record the minimum window found.",
      "When shrinking, if you remove a character that was part of the requirement and its count drops below the required count, decrement `have`."
    ],
    "solutions": [
      {
        "language": "javascript",
        "code": "var minWindow = function(s, t) {\n    if (t.length > s.length) {\n        return \"\";\n    }\n\n    const tMap = new Map();\n    for (const char of t) {\n        tMap.set(char, (tMap.get(char) || 0) + 1);\n    }\n\n    const windowMap = new Map();\n    let left = 0;\n    let minLength = Infinity;\n    let minStart = 0;\n    let have = 0;\n    let needed = tMap.size;\n\n    for (let right = 0; right < s.length; right++) {\n        const char = s[right];\n        windowMap.set(char, (windowMap.get(char) || 0) + 1);\n\n        if (tMap.has(char) && windowMap.get(char) === tMap.get(char)) {\n            have++;\n        }\n\n        // Try to contract the window\n        while (have === needed) {\n            // Update our minimum window found\n            const windowSize = right - left + 1;\n            if (windowSize < minLength) {\n                minLength = windowSize;\n                minStart = left;\n            }\n\n            // Remove from the left\n            const leftChar = s[left];\n            windowMap.set(leftChar, windowMap.get(leftChar) - 1);\n            if (tMap.has(leftChar) && windowMap.get(leftChar) < tMap.get(leftChar)) {\n                have--;\n            }\n            left++;\n        }\n    }\n\n    return minLength === Infinity ? \"\" : s.substring(minStart, minStart + minLength);\n};",
        "explanation": "This solution uses a sliding window with two hash maps. `tMap` stores the required character counts from string `t`. `windowMap` stores the character counts in our current window. `needed` is the number of unique characters from `t`, and `have` is how many of those unique characters we have satisfied the count for. We expand the window with `right`. When `have === needed`, we have a valid window. We then enter a `while` loop to contract the window from the `left`, updating `minLength` each time, until the window is no longer valid (`have < needed`). We continue this process until `right` reaches the end.",
        "timeComplexity": "O(m + n)",
        "spaceComplexity": "O(m + n)"
      }
    ],
    "acceptanceRate": 37.9,
    "totalSubmissions": 10000,
    "correctSubmissions": 3790,
    "averageTime": 45
  },
  {
    "title": "Remove Nth Node From End of List",
    "description": "Given the `head` of a linked list, remove the `n`-th node from the end of the list and return its head.\n\n**Example 1:**\nInput: head = [1,2,3,4,5], n = 2\nOutput: [1,2,3,5]\n\n**Example 2:**\nInput: head = [1], n = 1\nOutput: []\n\n**Example 3:**\nInput: head = [1,2], n = 1\nOutput: [1]\n\n**Constraints:**\n- The number of nodes in the list is `sz`.\n- 1 <= sz <= 30\n- 0 <= Node.val <= 100\n- 1 <= n <= sz",
    "difficulty": "medium",
    "topics": [
      "Linked List",
      "Two Pointers"
    ],
    "companies": [
      "Amazon",
      "Facebook",
      "Microsoft",
      "Apple"
    ],
    "constraints": [
      "The number of nodes in the list is sz.",
      "1 <= sz <= 30",
      "0 <= Node.val <= 100",
      "1 <= n <= sz"
    ],
    "examples": [
      {
        "input": "head = [1,2,3,4,5], n = 2",
        "output": "[1,2,3,5]",
        "explanation": "The 2nd node from the end (value 4) is removed."
      },
      {
        "input": "head = [1], n = 1",
        "output": "[]",
        "explanation": "The 1st node from the end (the head) is removed."
      }
    ],
    "testCases": [
      {
        "input": "[1,2,3,4,5]\n2",
        "expectedOutput": "[1,2,3,5]",
        "isHidden": false
      },
      {
        "input": "[1]\n1",
        "expectedOutput": "[]",
        "isHidden": false
      },
      {
        "input": "[1,2]\n1",
        "expectedOutput": "[1]",
        "isHidden": false
      },
      {
        "input": "[1,2]\n2",
        "expectedOutput": "[2]",
        "isHidden": true
      }
    ],
    "hints": [
      "A simple solution is to make two passes. First pass to find the length `L` of the list. Second pass to go to the `(L - n)`-th node and remove the next one.",
      "Can you do it in one pass? Use two pointers.",
      "Use a 'fast' and 'slow' pointer. To handle the edge case of removing the head, use a `dummy` node that points to the `head`.",
      "Start both `fast` and `slow` at the `dummy` node.",
      "First, advance the `fast` pointer `n + 1` steps.",
      "Now, advance both `fast` and `slow` together, one step at a time, until `fast` reaches `null`.",
      "At this point, `slow` will be pointing to the node *just before* the node to be removed.",
      "Perform the deletion: `slow.next = slow.next.next`."
    ],
    "solutions": [
      {
        "language": "javascript",
        "code": "/**\n * Definition for singly-linked list.\n * function ListNode(val, next) {\n * this.val = (val===undefined ? 0 : val)\n * this.next = (next===undefined ? null : next)\n * }\n */\nvar removeNthFromEnd = function(head, n) {\n    // Create a dummy node to handle edge case of removing the head\n    let dummy = new ListNode(0, head);\n    let slow = dummy;\n    let fast = dummy;\n\n    // 1. Advance 'fast' pointer n+1 steps\n    // (n steps to create the gap, +1 so 'slow' ends up *before* the target)\n    for (let i = 0; i <= n; i++) {\n        fast = fast.next;\n    }\n\n    // 2. Move both pointers together until 'fast' reaches the end\n    while (fast !== null) {\n        slow = slow.next;\n        fast = fast.next;\n    }\n\n    // 3. 'slow' is now at the node just before the one to be removed\n    // Remove the target node\n    slow.next = slow.next.next;\n\n    // Return the head of the modified list (dummy.next)\n    return dummy.next;\n};",
        "explanation": "This solution uses a one-pass, two-pointer approach. A `dummy` node is created to simplify the edge case where the head itself is removed. Both `slow` and `fast` pointers start at `dummy`. The `fast` pointer is first advanced `n + 1` steps. This creates a gap of `n` nodes between `slow` and `fast`. Then, both pointers are advanced one step at a time until `fast` reaches the end of the list (`null`). Because of the initial gap, `slow` will now be positioned at the node directly *before* the `n`-th node from the end. We can then remove the target node by setting `slow.next = slow.next.next`. Finally, we return `dummy.next`, which is the correct head.",
        "timeComplexity": "O(L)",
        "spaceComplexity": "O(1)"
      }
    ],
    "acceptanceRate": 38.6,
    "totalSubmissions": 18000,
    "correctSubmissions": 6948,
    "averageTime": 15
  },
  {
    "title": "Reorder List",
    "description": "You are given the head of a singly linked-list. The list can be represented as:\n`L0 -> L1 -> ... -> Ln-1 -> Ln`\n\nReorder the list to be in the following form:\n`L0 -> Ln -> L1 -> Ln-1 -> L2 -> Ln-2 -> ...`\n\nYou may not modify the values in the list's nodes. Only nodes themselves may be changed.\n\n**Example 1:**\nInput: head = [1,2,3,4]\nOutput: [1,4,2,3]\n\n**Example 2:**\nInput: head = [1,2,3,4,5]\nOutput: [1,5,2,4,3]\n\n**Constraints:**\n- The number of nodes in the list is in the range [1, 5 * 10^4].\n- 1 <= Node.val <= 1000",
    "difficulty": "medium",
    "topics": [
      "Linked List",
      "Two Pointers"
    ],
    "companies": [
      "Amazon",
      "Facebook",
      "Microsoft",
      "Google"
    ],
    "constraints": [
      "The number of nodes in the list is in the range [1, 5 * 10^4].",
      "1 <= Node.val <= 1000"
    ],
    "examples": [
      {
        "input": "head = [1,2,3,4]",
        "output": "[1,4,2,3]",
        "explanation": "L0=1, L1=2, L2=3, L3=4. Reordered: L0->L3->L1->L2."
      },
      {
        "input": "head = [1,2,3,4,5]",
        "output": "[1,5,2,4,3]",
        "explanation": "L0=1, L1=2, L2=3, L3=4, L4=5. Reordered: L0->L4->L1->L3->L2."
      }
    ],
    "testCases": [
      {
        "input": "[1,2,3,4]",
        "expectedOutput": "[1,4,2,3]",
        "isHidden": false
      },
      {
        "input": "[1,2,3,4,5]",
        "expectedOutput": "[1,5,2,4,3]",
        "isHidden": false
      },
      {
        "input": "[1]",
        "expectedOutput": "[1]",
        "isHidden": true
      }
    ],
    "hints": [
      "This problem can be solved in three steps.",
      "Step 1: Find the middle of the linked list. Use a 'slow' and 'fast' pointer.",
      "Step 2: Reverse the second half of the linked list (from `slow.next` onwards).",
      "Step 3: 'Weave' or 'merge' the first half and the reversed second half. Use two pointers, one at the head (`first`) and one at the head of the reversed second half (`second`).",
      "In the merge step, be careful to store `first.next` and `second.next` in temporary variables before re-wiring the pointers."
    ],
    "solutions": [
      {
        "language": "javascript",
        "code": "/**\n * Definition for singly-linked list.\n * function ListNode(val, next) {\n * this.val = (val===undefined ? 0 : val)\n * this.next = (next===undefined ? null : next)\n * }\n */\nvar reorderList = function(head) {\n    if (!head || !head.next) return;\n\n    // 1. Find the middle of the list\n    let slow = head, fast = head.next;\n    while (fast && fast.next) {\n        slow = slow.next;\n        fast = fast.next.next;\n    }\n\n    // 2. Reverse the second half of the list\n    let secondHead = slow.next;\n    slow.next = null; // Split the list\n    let prev = null;\n    while (secondHead) {\n        let nextNode = secondHead.next;\n        secondHead.next = prev;\n        prev = secondHead;\n        secondHead = nextNode;\n    }\n    // 'prev' is now the head of the reversed second half\n\n    // 3. Weave the two halves\n    let first = head, second = prev;\n    while (second) {\n        let temp1 = first.next;\n        let temp2 = second.next;\n\n        first.next = second;\n        second.next = temp1;\n\n        first = temp1;\n        second = temp2;\n    }\n};",
        "explanation": "This solution follows a 3-step approach. First, we find the middle of the list using a `slow` and `fast` pointer. `slow` will end up at the node just before the midpoint. Second, we reverse the entire second half of the list (starting from `slow.next`). We also split the list by setting `slow.next = null`. Third, we 'weave' the two lists together. We use `first` to point to the head of the first half and `second` to point to the head of the reversed second half. We interleave the nodes by re-wiring their `next` pointers, using temporary variables to hold the original `next` pointers before they are overwritten.",
        "timeComplexity": "O(n)",
        "spaceComplexity": "O(1)"
      }
    ],
    "acceptanceRate": 47.2,
    "totalSubmissions": 8000,
    "correctSubmissions": 3776,
    "averageTime": 24
  },
  {
    "title": "Reverse Nodes in k-Group",
    "description": "Given the `head` of a linked list, reverse the nodes of the list `k` at a time, and return the modified list.\n\n`k` is a positive integer and is less than or equal to the length of the linked list. If the number of nodes is not a multiple of `k` then left-out nodes, in the end, should remain as they are.\n\nYou may not alter the values in the list's nodes, only nodes themselves may be changed.\n\n**Example 1:**\nInput: head = [1,2,3,4,5], k = 2\nOutput: [2,1,4,3,5]\n\n**Example 2:**\nInput: head = [1,2,3,4,5], k = 3\nOutput: [3,2,1,4,5]\n\n**Constraints:**\n- The number of nodes in the list is `n`.\n- 1 <= k <= n <= 5000\n- 0 <= Node.val <= 1000",
    "difficulty": "hard",
    "topics": [
      "Linked List",
      "Recursion"
    ],
    "companies": [
      "Amazon",
      "Microsoft",
      "Facebook",
      "Google"
    ],
    "constraints": [
      "The number of nodes in the list is n.",
      "1 <= k <= n <= 5000",
      "0 <= Node.val <= 1000"
    ],
    "examples": [
      {
        "input": "head = [1,2,3,4,5], k = 2",
        "output": "[2,1,4,3,5]",
        "explanation": "Nodes [1,2] are reversed. Nodes [3,4] are reversed. Node [5] is left alone."
      },
      {
        "input": "head = [1,2,3,4,5], k = 3",
        "output": "[3,2,1,4,5]",
        "explanation": "Nodes [1,2,3] are reversed. Nodes [4,5] are left alone."
      }
    ],
    "testCases": [
      {
        "input": "[1,2,3,4,5]\n2",
        "expectedOutput": "[2,1,4,3,5]",
        "isHidden": false
      },
      {
        "input": "[1,2,3,4,5]\n3",
        "expectedOutput": "[3,2,1,4,5]",
        "isHidden": false
      },
      {
        "input": "[1,2,3,4,5]\n1",
        "expectedOutput": "[1,2,3,4,5]",
        "isHidden": true
      },
      {
        "input": "[1]\n1",
        "expectedOutput": "[1]",
        "isHidden": true
      }
    ],
    "hints": [
      "This is a complex linked list manipulation problem.",
      "A recursive approach is often cleaner to think about.",
      "First, check if there are at least `k` nodes left. Iterate `k` steps. If you hit `null`, there aren't enough nodes, so just return the `head` as-is (this is the base case).",
      "If there are `k` nodes, you need to reverse them. This is the standard 'reverse linked list' algorithm, but only for `k` nodes.",
      "While reversing, keep track of the `newHead` of this `k`-group (which will be the `k`-th node).",
      "The original `head` of this group (which is now the *tail* of the reversed group) needs to point to the result of the *recursive call* on the rest of the list (`k+1`-th node).",
      "Return the `newHead` of the reversed group."
    ],
    "solutions": [
      {
        "language": "javascript",
        "code": "/**\n * Definition for singly-linked list.\n * function ListNode(val, next) {\n * this.val = (val===undefined ? 0 : val)\n * this.next = (next===undefined ? null : next)\n * }\n */\nvar reverseKGroup = function(head, k) {\n    // 1. Check if we have at least k nodes\n    let curr = head;\n    for (let i = 0; i < k; i++) {\n        if (!curr) {\n            // Not enough nodes, return head as-is\n            return head;\n        }\n        curr = curr.next;\n    }\n\n    // 2. We have k nodes, so reverse them\n    let prev = null;\n    let current = head;\n    let nextNode = null;\n\n    for (let i = 0; i < k; i++) {\n        nextNode = current.next;\n        current.next = prev;\n        prev = current;\n        current = nextNode;\n    }\n\n    // 3. After the loop, 'prev' is the new head of this reversed group\n    // 'head' is now the tail of this reversed group\n    // 'current' is the head of the *next* k-group (or null)\n\n    // 4. Recursively call for the rest of the list and connect it\n    if (head) {\n        // 'head' (the original head) is now the tail of the reversed group\n        head.next = reverseKGroup(current, k);\n    }\n\n    // 'prev' is the new head of this group\n    return prev;\n};",
        "explanation": "This solution uses recursion. First, it checks if there are at least `k` nodes remaining. It does this by advancing a pointer `curr` `k` times. If `curr` becomes `null`, it means we don't have `k` nodes, so we hit our base case and return `head` unchanged. If we *do* have `k` nodes, we proceed to reverse them using a standard iterative reversal for `k` steps. After the reversal, `prev` points to the new head of the reversed group, `current` points to the start of the *next* group, and `head` (the original head of *this* group) is now the tail. We then recursively call `reverseKGroup` on `current` (the rest of the list) and link the result to `head.next` (our new tail). Finally, we return `prev`, which is the new head of this processed group.",
        "timeComplexity": "O(n)",
        "spaceComplexity": "O(n/k)"
      }
    ],
    "acceptanceRate": 48.1,
    "totalSubmissions": 7000,
    "correctSubmissions": 3367,
    "averageTime": 35
  },
  {
    "title": "Balanced Binary Tree",
    "description": "Given a binary tree, determine if it is height-balanced.\n\nA height-balanced binary tree is a binary tree in which the depth of the two subtrees of every node never differs by more than one.\n\n**Example 1:**\nInput: root = [3,9,20,null,null,15,7]\nOutput: true\n\n**Example 2:**\nInput: root = [1,2,2,3,3,null,null,4,4]\nOutput: false\n\n**Example 3:**\nInput: root = []\nOutput: true\n\n**Constraints:**\n- The number of nodes in the tree is in the range [0, 5000].\n- -10^4 <= Node.val <= 10^4",
    "difficulty": "easy",
    "topics": [
      "Tree",
      "Depth-First Search",
      "Recursion"
    ],
    "companies": [
      "Amazon",
      "Microsoft",
      "Google"
    ],
    "constraints": [
      "The number of nodes in the tree is in the range [0, 5000].",
      "-10^4 <= Node.val <= 10^4"
    ],
    "examples": [
      {
        "input": "root = [3,9,20,null,null,15,7]",
        "output": "true",
        "explanation": "Left depth is 1, right depth is 2. Difference is 1. All subtrees are balanced."
      },
      {
        "input": "root = [1,2,2,3,3,null,null,4,4]",
        "output": "false",
        "explanation": "The subtree rooted at 2 (left child) has sub-subtrees with depths 2 and 0. Difference is 2."
      }
    ],
    "testCases": [
      {
        "input": "[3,9,20,null,null,15,7]",
        "expectedOutput": "true",
        "isHidden": false
      },
      {
        "input": "[1,2,2,3,3,null,null,4,4]",
        "expectedOutput": "false",
        "isHidden": false
      },
      {
        "input": "[]",
        "expectedOutput": "true",
        "isHidden": true
      }
    ],
    "hints": [
      "A naive top-down recursion will be O(n^2) because you'd recalculate the height of subtrees repeatedly.",
      "A more efficient approach is bottom-up (Postorder) DFS.",
      "Create a recursive helper function `getHeight(node)`.",
      "The base case: if `node` is null, return 0 (height of an empty tree).",
      "Recursively find the height of the left and right subtrees.",
      "If either subtree is unbalanced, we need a way to propagate this 'unbalanced' signal up. We can use a special value like -1.",
      "If `leftHeight == -1` or `rightHeight == -1`, return -1.",
      "Check the balance condition: `if (abs(leftHeight - rightHeight) > 1)`, return -1.",
      "If balanced, return `1 + max(leftHeight, rightHeight)`."
    ],
    "solutions": [
      {
        "language": "javascript",
        "code": "/**\n * Definition for a binary tree node.\n * function TreeNode(val, left, right) {\n * this.val = (val===undefined ? 0 : val)\n * this.left = (left===undefined ? null : left)\n * this.right = (right===undefined ? null : right)\n * }\n */\nvar isBalanced = function(root) {\n    \n    // Helper function to get height. \n    // Returns -1 if unbalanced, or the height if balanced.\n    function checkHeight(node) {\n        if (node === null) {\n            return 0;\n        }\n\n        // Check left subtree\n        const leftHeight = checkHeight(node.left);\n        if (leftHeight === -1) {\n            return -1;\n        }\n\n        // Check right subtree\n        const rightHeight = checkHeight(node.right);\n        if (rightHeight === -1) {\n            return -1;\n        }\n\n        // Check balance at the current node\n        if (Math.abs(leftHeight - rightHeight) > 1) {\n            return -1;\n        }\n\n        // Return the actual height\n        return Math.max(leftHeight, rightHeight) + 1;\n    }\n\n    return checkHeight(root) !== -1;\n};",
        "explanation": "This solution uses a modified Depth-First Search. We create a helper function `checkHeight` that does two things: 1. It calculates the height of a node. 2. It signals if an unbalance is found. It returns the height of the node if its subtrees are balanced, but returns `-1` if an unbalance is detected at any point (either in its children or at the node itself). The main `isBalanced` function simply calls `checkHeight(root)` and checks if the result is `-1` (unbalanced) or not (balanced).",
        "timeComplexity": "O(n)",
        "spaceComplexity": "O(h)"
      }
    ],
    "acceptanceRate": 46.8,
    "totalSubmissions": 13000,
    "correctSubmissions": 6084,
    "averageTime": 14
  },
  {
    "title": "Binary Tree Right Side View",
    "description": "Given the `root` of a binary tree, imagine yourself standing on the **right side** of it, return the values of the nodes you can see ordered from top to bottom.\n\n**Example 1:**\nInput: root = [1,2,3,null,5,null,4]\nOutput: [1,3,4]\n\n**Example 2:**\nInput: root = [1,null,3]\nOutput: [1,3]\n\n**Example 3:**\nInput: root = []\nOutput: []\n\n**Constraints:**\n- The number of nodes in the tree is in the range [0, 100].\n- -100 <= Node.val <= 100",
    "difficulty": "medium",
    "topics": [
      "Tree",
      "Breadth-First Search (BFS)",
      "Depth-First Search (DFS)"
    ],
    "companies": [
      "Amazon",
      "Facebook",
      "Google",
      "Microsoft"
    ],
    "constraints": [
      "The number of nodes in the tree is in the range [0, 100].",
      "-100 <= Node.val <= 100"
    ],
    "examples": [
      {
        "input": "root = [1,2,3,null,5,null,4]",
        "output": "[1,3,4]",
        "explanation": "From the right, you see 1, then 3, then 4."
      },
      {
        "input": "root = [1,null,3]",
        "output": "[1,3]",
        "explanation": "From the right, you see 1, then 3."
      }
    ],
    "testCases": [
      {
        "input": "[1,2,3,null,5,null,4]",
        "expectedOutput": "[1,3,4]",
        "isHidden": false
      },
      {
        "input": "[1,null,3]",
        "expectedOutput": "[1,3]",
        "isHidden": false
      },
      {
        "input": "[]",
        "expectedOutput": "[]",
        "isHidden": true
      }
    ],
    "hints": [
      "This problem can be solved with BFS (Level Order Traversal).",
      "Perform a standard level order traversal using a queue.",
      "In each level, you will process all nodes at that level. The *last node* you process in each level is the one visible from the right side.",
      "Keep track of the `levelSize`. In your inner loop that runs `levelSize` times, check if `i == levelSize - 1`. If it is, this is the last node, so add its value to your result list."
    ],
    "solutions": [
      {
        "language": "javascript",
        "code": "/**\n * Definition for a binary tree node.\n * function TreeNode(val, left, right) {\n * this.val = (val===undefined ? 0 : val)\n * this.left = (left===undefined ? null : left)\n * this.right = (right===undefined ? null : right)\n * }\n */\nvar rightSideView = function(root) {\n    if (!root) {\n        return [];\n    }\n\n    const result = [];\n    const queue = [root];\n\n    while (queue.length > 0) {\n        const levelSize = queue.length;\n\n        for (let i = 0; i < levelSize; i++) {\n            const node = queue.shift();\n\n            // If this is the last node in the current level, add it\n            if (i === levelSize - 1) {\n                result.push(node.val);\n            }\n\n            // Add children for the next level\n            if (node.left) {\n                queue.push(node.left);\n            }\n            if (node.right) {\n                queue.push(node.right);\n            }\n        }\n    }\n\n    return result;\n};",
        "explanation": "This solution uses Breadth-First Search (BFS), also known as level order traversal. We use a `queue` to process nodes level by level. The `while` loop runs as long as the queue is not empty. Inside, we first get the `levelSize`, which is the number of nodes at the current level. We then loop `levelSize` times. The key insight is that the node visible from the right is simply the *last node* processed at each level. We check this with `if (i === levelSize - 1)`. If it's the last node, we add its value to `result`. We also add any left or right children to the queue to be processed in the next level.",
        "timeComplexity": "O(n)",
        "spaceComplexity": "O(w)"
      }
    ],
    "acceptanceRate": 59.4,
    "totalSubmissions": 10000,
    "correctSubmissions": 5940,
    "averageTime": 17
  },
  {
    "title": "Construct Binary Tree from Preorder and Inorder Traversal",
    "description": "Given two integer arrays `preorder` and `inorder` where `preorder` is the preorder traversal of a binary tree and `inorder` is the inorder traversal of the same tree, construct and return the binary tree.\n\n**Example 1:**\nInput: preorder = [3,9,20,15,7], inorder = [9,3,15,20,7]\nOutput: [3,9,20,null,null,15,7]\n\n**Example 2:**\nInput: preorder = [-1], inorder = [-1]\nOutput: [-1]\n\n**Constraints:**\n- 1 <= preorder.length <= 3000\n- inorder.length == preorder.length\n- -3000 <= preorder[i], inorder[i] <= 3000\n- `preorder` and `inorder` consist of **unique** values.\n- Each value of `inorder` also appears in `preorder`.\n- `preorder` is guaranteed to be the preorder traversal of the tree.\n- `inorder` is guaranteed to be the inorder traversal of the tree.",
    "difficulty": "medium",
    "topics": [
      "Tree",
      "Recursion",
      "Hash Table"
    ],
    "companies": [
      "Amazon",
      "Microsoft",
      "Facebook",
      "Google"
    ],
    "constraints": [
      "1 <= preorder.length <= 3000",
      "inorder.length == preorder.length",
      "-3000 <= preorder[i], inorder[i] <= 3000",
      "preorder and inorder consist of unique values."
    ],
    "examples": [
      {
        "input": "preorder = [3,9,20,15,7], inorder = [9,3,15,20,7]",
        "output": "[3,9,20,null,null,15,7]",
        "explanation": "See tree structure in problem."
      }
    ],
    "testCases": [
      {
        "input": "[3,9,20,15,7]\n[9,3,15,20,7]",
        "expectedOutput": "[3,9,20,null,null,15,7]",
        "isHidden": false
      },
      {
        "input": "[-1]\n[-1]",
        "expectedOutput": "[-1]",
        "isHidden": false
      }
    ],
    "hints": [
      "The first element in `preorder` is always the root of the (sub)tree.",
      "Find this root value in the `inorder` array. This `inorder` index splits the `inorder` array into the left subtree (all elements to its left) and the right subtree (all elements to its right).",
      "Knowing the *size* of the left subtree (from the `inorder` split) tells you how many elements from the `preorder` array belong to the left subtree (they are the elements immediately after the root).",
      "Use this information to recursively build the left and right subtrees.",
      "To quickly find the index in `inorder`, pre-process it into a hash map mapping `value -> index`."
    ],
    "solutions": [
      {
        "language": "javascript",
        "code": "/**\n * Definition for a binary tree node.\n * function TreeNode(val, left, right) {\n * this.val = (val===undefined ? 0 : val)\n * this.left = (left===undefined ? null : left)\n * this.right = (right===undefined ? null : right)\n * }\n */\nvar buildTree = function(preorder, inorder) {\n    // 1. Create a map for quick inorder index lookup\n    const inorderMap = new Map();\n    for (let i = 0; i < inorder.length; i++) {\n        inorderMap.set(inorder[i], i);\n    }\n\n    let preorderIndex = 0;\n\n    // 2. Recursive helper function\n    function build(inLeft, inRight) {\n        // Base case: no elements to build\n        if (inLeft > inRight) {\n            return null;\n        }\n\n        // a. Get root value from preorder\n        const rootVal = preorder[preorderIndex];\n        preorderIndex++;\n        const root = new TreeNode(rootVal);\n\n        // b. Find root's index in inorder to split\n        const inIndex = inorderMap.get(rootVal);\n\n        // c. Recursively build subtrees\n        // Must build left subtree first!\n        root.left = build(inLeft, inIndex - 1);\n        root.right = build(inIndex + 1, inRight);\n\n        return root;\n    }\n\n    return build(0, inorder.length - 1);\n};",
        "explanation": "This solution uses recursion and a hash map. First, we store the `value -> index` mappings of the `inorder` array in `inorderMap` for O(1) lookup. We use a global `preorderIndex` to keep track of which element in `preorder` is the current root. The recursive `build` function takes the `left` and `right` boundaries of the *inorder* array. The base case is when `inLeft > inRight`. In the recursive step, we pop the next root value from `preorder` (by incrementing `preorderIndex`), find its index `inIndex` in the `inorderMap`, and then recursively call `build` for the left subtree (from `inLeft` to `inIndex - 1`) and the right subtree (from `inIndex + 1` to `inRight`).",
        "timeComplexity": "O(n)",
        "spaceComplexity": "O(n)"
      }
    ],
    "acceptanceRate": 58.3,
    "totalSubmissions": 11000,
    "correctSubmissions": 6413,
    "averageTime": 26
  },
  {
    "title": "Serialize and Deserialize Binary Tree",
    "description": "Serialization is the process of converting a data structure or object into a sequence of bits so that it can be stored in a file or memory buffer, or transmitted across a network. Deserialization is the reverse process.\n\nDesign an algorithm to serialize and deserialize a binary tree. There is no restriction on how your serialization/deserialization algorithm should work. You just need to ensure that a binary tree can be serialized to a string and this string can be deserialized to the original tree structure.\n\n**Example 1:**\nInput: root = [1,2,3,null,null,4,5]\nOutput: [1,2,3,null,null,4,5]\n\n**Example 2:**\nInput: root = []\nOutput: []\n\n**Constraints:**\n- The number of nodes in the tree is in the range [0, 10^4].\n- -1000 <= Node.val <= 1000",
    "difficulty": "hard",
    "topics": [
      "Tree",
      "Depth-First Search",
      "Breadth-First Search",
      "String"
    ],
    "companies": [
      "Amazon",
      "Facebook",
      "Google",
      "Microsoft"
    ],
    "constraints": [
      "The number of nodes in the tree is in the range [0, 10^4].",
      "-1000 <= Node.val <= 1000"
    ],
    "examples": [
      {
        "input": "root = [1,2,3,null,null,4,5]",
        "output": "[1,2,3,null,null,4,5]",
        "explanation": "The output is the same as the input, but this is just one possible format."
      }
    ],
    "testCases": [
      {
        "input": "[1,2,3,null,null,4,5]",
        "expectedOutput": "[1,2,3,null,null,4,5]",
        "isHidden": false
      },
      {
        "input": "[]",
        "expectedOutput": "[]",
        "isHidden": false
      },
      {
        "input": "[1,2]",
        "expectedOutput": "[1,2]",
        "isHidden": true
      }
    ],
    "hints": [
      "You can use a Preorder Traversal (DFS) for serialization.",
      "When serializing, visit each node. Append its value to the string. If a node is `null`, append a special marker (like 'N' or 'null').",
      "For deserialization, split the string into a list/queue of values.",
      "Write a recursive `build` function. Pop a value from the queue. If it's the null marker, return `null`. Otherwise, create a new node with that value, and recursively call `build` to create its left and right children.",
      "BFS (Level Order) can also work but is often more complex to handle `null` markers."
    ],
    "solutions": [
      {
        "language": "javascript",
        "code": "/**\n * Definition for a binary tree node.\n * function TreeNode(val) {\n * this.val = val;\n * this.left = this.right = null;\n * }\n */\n\n/**\n * Encodes a tree to a single string.\n * @param {TreeNode} root\n * @return {string}\n */\nvar serialize = function(root) {\n    const values = [];\n    \n    // Preorder DFS helper\n    function dfs(node) {\n        if (!node) {\n            values.push(\"N\"); // Null marker\n            return;\n        }\n        values.push(node.val.toString());\n        dfs(node.left);\n        dfs(node.right);\n    }\n    \n    dfs(root);\n    return values.join(\",\"); // e.g., \"1,2,N,N,3,4,N,N,5,N,N\"\n};\n\n/**\n * Decodes your encoded data to tree.\n * @param {string} data\n * @return {TreeNode}\n */\nvar deserialize = function(data) {\n    const values = data.split(\",\");\n    let i = 0; // Use a global index for the values array\n\n    // Recursive build function (Preorder)\n    function build() {\n        const val = values[i];\n        i++;\n\n        if (val === \"N\") {\n            return null;\n        }\n\n        const node = new TreeNode(parseInt(val));\n        node.left = build();\n        node.right = build();\n        return node;\n    }\n\n    return build();\n};",
        "explanation": "This solution uses Preorder Traversal (DFS). The `serialize` function performs a DFS, appending the node's value to an array. Crucially, it appends a special 'N' marker for any `null` child. This `values` array is then joined into a string. The `deserialize` function first splits the string back into an array. It then uses a recursive `build` function, which also follows a preorder pattern. It takes the next value from the array. If it's 'N', it returns `null`. Otherwise, it creates a new `TreeNode` and recursively calls `build` to create its `left` child and then its `right` child. A global index `i` is used to track the position in the `values` array.",
        "timeComplexity": "O(n)",
        "spaceComplexity": "O(n)"
      }
    ],
    "acceptanceRate": 53.6,
    "totalSubmissions": 9000,
    "correctSubmissions": 4824,
    "averageTime": 38
  },
  {
    "title": "Pacific Atlantic Water Flow",
    "description": "There is an `m x n` rectangular island that borders both the **Pacific Ocean** and the **Atlantic Ocean**. The **Pacific Ocean** touches the island's left and top edges, and the **Atlantic Ocean** touches the island's right and bottom edges.\n\nThe island is partitioned into a grid of cells. You are given an `m x n` integer matrix `heights` where `heights[r][c]` represents the height of the cell at coordinate `(r, c)`.\n\nWater can flow from any cell to an adjacent cell with a height **less than or equal to** the current cell's height. Water can flow from any cell adjacent to an ocean into the ocean.\n\nReturn a 2D list of grid coordinates `result[i] = [ri, ci]` where water can flow from `(ri, ci)` to **both** the Pacific and Atlantic oceans.\n\n**Example 1:**\nInput: heights = [[1,2,2,3,5],[3,2,3,4,4],[2,4,5,3,1],[6,7,1,4,5],[5,1,1,2,4]]\nOutput: [[0,4],[1,3],[1,4],[2,2],[3,0],[3,1],[4,0],[4,3],[4,4]]\n\n**Constraints:**\n- m == heights.length\n- n == heights[i].length\n- 1 <= m, n <= 200\n- 0 <= heights[r][c] <= 10^5",
    "difficulty": "medium",
    "topics": [
      "Graph",
      "Depth-First Search",
      "Breadth-First Search",
      "Matrix"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Facebook",
      "Microsoft"
    ],
    "constraints": [
      "m == heights.length",
      "n == heights[i].length",
      "1 <= m, n <= 200",
      "0 <= heights[r][c] <= 10^5"
    ],
    "examples": [
      {
        "input": "heights = [[1,2,2,3,5],[3,2,3,4,4],[2,4,5,3,1],[6,7,1,4,5],[5,1,1,2,4]]",
        "output": "[[0,4],[1,3],[1,4],[2,2],[3,0],[3,1],[4,0],[4,3],[4,4]]",
        "explanation": "Water from these cells can flow to both oceans."
      }
    ],
    "testCases": [
      {
        "input": "[[1,2,2,3,5],[3,2,3,4,4],[2,4,5,3,1],[6,7,1,4,5],[5,1,1,2,4]]",
        "expectedOutput": "[[0,4],[1,3],[1,4],[2,2],[3,0],[3,1],[4,0],[4,3],[4,4]]",
        "isHidden": false
      },
      {
        "input": "[[1]]",
        "expectedOutput": "[[0,0]]",
        "isHidden": true
      }
    ],
    "hints": [
      "Thinking about flowing *from* a cell *to* the ocean is difficult. Instead, think about flowing *from* the ocean *inland*.",
      "Create two 'visited' sets (or boolean matrices): `canReachPacific` and `canReachAtlantic`.",
      "Start a DFS (or BFS) from *all* cells on the Pacific border (top and left edges). Mark all reachable cells in `canReachPacific`. The rule is reversed: you can flow from a cell to a neighbor if the neighbor's height is *greater than or equal to* the current cell's height.",
      "Do the same thing for the Atlantic border (bottom and right edges), marking `canReachAtlantic`.",
      "Finally, iterate through the entire grid. Any cell `(r, c)` that is `true` in *both* `canReachPacific` and `canReachAtlantic` is part of the result."
    ],
    "solutions": [
      {
        "language": "javascript",
        "code": "var pacificAtlantic = function(heights) {\n    const ROWS = heights.length, COLS = heights[0].length;\n    const pacific = new Array(ROWS).fill(0).map(() => new Array(COLS).fill(false));\n    const atlantic = new Array(ROWS).fill(0).map(() => new Array(COLS).fill(false));\n    const result = [];\n\n    function dfs(r, c, visited, prevHeight) {\n        if (r < 0 || c < 0 || r >= ROWS || c >= COLS || visited[r][c] || heights[r][c] < prevHeight) {\n            return;\n        }\n\n        visited[r][c] = true;\n        const currentHeight = heights[r][c];\n\n        dfs(r + 1, c, visited, currentHeight);\n        dfs(r - 1, c, visited, currentHeight);\n        dfs(r, c + 1, visited, currentHeight);\n        dfs(r, c - 1, visited, currentHeight);\n    }\n\n    // Start DFS from all border cells\n    for (let c = 0; c < COLS; c++) {\n        dfs(0, c, pacific, -1);      // Top (Pacific)\n        dfs(ROWS - 1, c, atlantic, -1); // Bottom (Atlantic)\n    }\n    for (let r = 0; r < ROWS; r++) {\n        dfs(r, 0, pacific, -1);      // Left (Pacific)\n        dfs(r, COLS - 1, atlantic, -1); // Right (Atlantic)\n    }\n\n    // Find the intersection of the two sets\n    for (let r = 0; r < ROWS; r++) {\n        for (let c = 0; c < COLS; c++) {\n            if (pacific[r][c] && atlantic[r][c]) {\n                result.push([r, c]);\n            }\n        }\n    }\n\n    return result;\n};",
        "explanation": "This solution starts a DFS from the 'shores' of each ocean and flows 'inland'. We create two boolean matrices, `pacific` and `atlantic`, to store which cells can be reached from each ocean. The `dfs` function explores inland as long as the next cell's height is *greater than or equal to* the previous cell's height (`prevHeight`). We run this `dfs` for all cells on the top and left edges (for `pacific`) and all cells on the bottom and right edges (for `atlantic`). Finally, we iterate through the grid one more time and add any cell `(r, c)` to our `result` if it is marked `true` in *both* `pacific` and `atlantic`.",
        "timeComplexity": "O(m * n)",
        "spaceComplexity": "O(m * n)"
      }
    ],
    "acceptanceRate": 48.2,
    "totalSubmissions": 7000,
    "correctSubmissions": 3374,
    "averageTime": 33
  },
  {
    "title": "Word Search",
    "description": "Given an `m x n` grid of characters `board` and a string `word`, return `true` if `word` exists in the grid.\n\nThe word can be constructed from letters of sequentially adjacent cells, where adjacent cells are horizontally or vertically neighboring. The same letter cell may not be used more than once.\n\n**Example 1:**\nInput: board = [[\"A\",\"B\",\"C\",\"E\"],[\"S\",\"F\",\"C\",\"S\"],[\"A\",\"D\",\"E\",\"E\"]], word = \"ABCCED\"\nOutput: true\n\n**Example 2:**\nInput: board = [[\"A\",\"B\",\"C\",\"E\"],[\"S\",\"F\",\"C\",\"S\"],[\"A\",\"D\",\"E\",\"E\"]], word = \"SEE\"\nOutput: true\n\n**Example 3:**\nInput: board = [[\"A\",\"B\",\"C\",\"E\"],[\"S\",\"F\",\"C\",\"S\"],[\"A\",\"D\",\"E\",\"E\"]], word = \"ABCB\"\nOutput: false\n\n**Constraints:**\n- m == board.length\n- n = board[i].length\n- 1 <= m, n <= 6\n- 1 <= word.length <= 15\n- `board` and `word` consist of only lowercase and uppercase English letters.",
    "difficulty": "medium",
    "topics": [
      "Matrix",
      "Depth-First Search",
      "Backtracking"
    ],
    "companies": [
      "Amazon",
      "Microsoft",
      "Facebook",
      "Google"
    ],
    "constraints": [
      "m == board.length",
      "n = board[i].length",
      "1 <= m, n <= 6",
      "1 <= word.length <= 15"
    ],
    "examples": [
      {
        "input": "board = [[\"A\",\"B\",\"C\",\"E\"],[\"S\",\"F\",\"C\",\"S\"],[\"A\",\"D\",\"E\",\"E\"]], word = \"ABCCED\"",
        "output": "true",
        "explanation": "The path is (0,0)->(0,1)->(0,2)->(1,2)->(2,2)->(2,1)."
      },
      {
        "input": "board = [[\"A\",\"B\",\"C\",\"E\"],[\"S\",\"F\",\"C\",\"S\"],[\"A\",\"D\",\"E\",\"E\"]], word = \"ABCB\"",
        "output": "false",
        "explanation": "Cannot reuse 'B' at (0,1)."
      }
    ],
    "testCases": [
      {
        "input": "[[\"A\",\"B\",\"C\",\"E\"],[\"S\",\"F\",\"C\",\"S\"],[\"A\",\"D\",\"E\",\"E\"]]\n\"ABCCED\"",
        "expectedOutput": "true",
        "isHidden": false
      },
      {
        "input": "[[\"A\",\"B\",\"C\",\"E\"],[\"S\",\"F\",\"C\",\"S\"],[\"A\",\"D\",\"E\",\"E\"]]\n\"SEE\"",
        "expectedOutput": "true",
        "isHidden": false
      },
      {
        "input": "[[\"A\",\"B\",\"C\",\"E\"],[\"S\",\"F\",\"C\",\"S\"],[\"A\",\"D\",\"E\",\"E\"]]\n\"ABCB\"",
        "expectedOutput": "false",
        "isHidden": true
      }
    ],
    "hints": [
      "This is a classic Backtracking problem, which is a form of DFS.",
      "Iterate through every cell `(r, c)` in the `board`.",
      "If `board[r][c]` matches the first letter of `word`, start a DFS/backtracking search from this cell.",
      "The DFS function should take the current `(r, c)` and the current index `k` of the `word` we are looking for.",
      "The base case for the DFS: if `k == word.length`, we found the word, return `true`.",
      "Check for out-of-bounds or if `board[r][c] != word[k]`. If so, return `false`.",
      "To prevent re-using a cell, you must 'mark' it as visited. A common trick is to temporarily change the cell's value (e.g., `board[r][c] = '#'`).",
      "Recursively call the DFS for all 4 neighbors (up, down, left, right), passing `k + 1`.",
      "If *any* of the recursive calls return `true`, then `return true`.",
      "**Crucially**, after the recursive calls return, you must *backtrack* by restoring the cell's original value (e.g., `board[r][c] = word[k]`). This 'un-marks' it for other paths."
    ],
    "solutions": [
      {
        "language": "javascript",
        "code": "var exist = function(board, word) {\n    const ROWS = board.length, COLS = board[0].length;\n\n    function backtrack(r, c, k) {\n        // 1. Base case: Word found\n        if (k === word.length) {\n            return true;\n        }\n\n        // 2. Check boundaries and character match\n        if (r < 0 || c < 0 || r >= ROWS || c >= COLS || board[r][c] !== word[k]) {\n            return false;\n        }\n\n        // 3. Mark as visited\n        const temp = board[r][c];\n        board[r][c] = '#'; // Mark with a special character\n\n        // 4. Explore neighbors\n        const found = backtrack(r + 1, c, k + 1) ||\n                      backtrack(r - 1, c, k + 1) ||\n                      backtrack(r, c + 1, k + 1) ||\n                      backtrack(r, c - 1, k + 1);\n\n        // 5. Backtrack (un-mark)\n        board[r][c] = temp;\n\n        return found;\n    }\n\n    // Start the search from every cell\n    for (let r = 0; r < ROWS; r++) {\n        for (let c = 0; c < COLS; c++) {\n            if (backtrack(r, c, 0)) {\n                return true;\n            }\n        }\n    }\n\n    return false;\n};",
        "explanation": "This solution uses backtracking. We iterate through every cell in the `board` as a potential starting point. For each cell, we call a `backtrack` helper function. This function checks if the current index `k` has reached the end of the `word` (success). It also checks for boundary violations or character mismatches (failure). If the current cell is valid, we 'visit' it by temporarily changing its value to '#'. Then, we recursively call `backtrack` on all 4 neighbors, looking for the next character (`k + 1`). If any of these recursive calls return `true`, we propagate `true` up. Finally, and most importantly, we *restore* the cell's original value (`board[r][c] = temp`). This 'backtracking' step is essential so that the cell can be used in other potential paths.",
        "timeComplexity": "O(m * n * 3^L)",
        "spaceComplexity": "O(L)"
      }
    ],
    "acceptanceRate": 37.4,
    "totalSubmissions": 18000,
    "correctSubmissions": 6732,
    "averageTime": 31
  },
  {
    "title": "Spiral Matrix",
    "description": "Given an `m x n` `matrix`, return all elements of the `matrix` in spiral order.\n\n**Example 1:**\nInput: matrix = [[1,2,3],[4,5,6],[7,8,9]]\nOutput: [1,2,3,6,9,8,7,4,5]\n\n**Example 2:**\nInput: matrix = [[1,2,3,4],[5,6,7,8],[9,10,11,12]]\nOutput: [1,2,3,4,8,12,11,10,9,5,6,7]\n\n**Constraints:**\n- m == matrix.length\n- n == matrix[i].length\n- 1 <= m, n <= 10\n- -100 <= matrix[i][j] <= 100",
    "difficulty": "medium",
    "topics": [
      "Array",
      "Matrix",
      "Simulation"
    ],
    "companies": [
      "Amazon",
      "Microsoft",
      "Apple",
      "Google"
    ],
    "constraints": [
      "m == matrix.length",
      "n == matrix[i].length",
      "1 <= m, n <= 10",
      "-100 <= matrix[i][j] <= 100"
    ],
    "examples": [
      {
        "input": "matrix = [[1,2,3],[4,5,6],[7,8,9]]",
        "output": "[1,2,3,6,9,8,7,4,5]",
        "explanation": "Follows the spiral path shown in the image."
      },
      {
        "input": "matrix = [[1,2,3,4],[5,6,7,8],[9,10,11,12]]",
        "output": "[1,2,3,4,8,12,11,10,9,5,6,7]",
        "explanation": "Follows the spiral path."
      }
    ],
    "testCases": [
      {
        "input": "[[1,2,3],[4,5,6],[7,8,9]]",
        "expectedOutput": "[1,2,3,6,9,8,7,4,5]",
        "isHidden": false
      },
      {
        "input": "[[1,2,3,4],[5,6,7,8],[9,10,11,12]]",
        "expectedOutput": "[1,2,3,4,8,12,11,10,9,5,6,7]",
        "isHidden": false
      }
    ],
    "hints": [
      "This is a simulation problem. You need to 'peel' the matrix like an onion, layer by layer.",
      "Maintain four boundary variables: `top`, `bottom`, `left`, `right`.",
      "Initialize `top = 0`, `bottom = m - 1`, `left = 0`, `right = n - 1`.",
      "Loop as long as `left <= right` and `top <= bottom`.",
      "Inside the loop, perform 4 'passes':\n  1. Traverse Right: from `left` to `right` at row `top`. Increment `top`.\n  2. Traverse Down: from `top` to `bottom` at column `right`. Decrement `right`.\n  3. Traverse Left: from `right` to `left` at row `bottom`. Decrement `bottom`.\n  4. Traverse Up: from `bottom` to `top` at column `left`. Increment `left`.",
      "Be careful to check the boundary conditions (`left <= right` and `top <= bottom`) *after* the first two passes, in case you have a single row or single column matrix."
    ],
    "solutions": [
      {
        "language": "javascript",
        "code": "var spiralOrder = function(matrix) {\n    if (matrix.length === 0) {\n        return [];\n    }\n\n    const result = [];\n    let top = 0, bottom = matrix.length - 1;\n    let left = 0, right = matrix[0].length - 1;\n\n    while (left <= right && top <= bottom) {\n        // 1. Traverse Right\n        for (let i = left; i <= right; i++) {\n            result.push(matrix[top][i]);\n        }\n        top++;\n\n        // 2. Traverse Down\n        for (let i = top; i <= bottom; i++) {\n            result.push(matrix[i][right]);\n        }\n        right--;\n\n        // Check boundary conditions before traversing back\n        if (top <= bottom) {\n            // 3. Traverse Left\n            for (let i = right; i >= left; i--) {\n                result.push(matrix[bottom][i]);\n            }\n            bottom--;\n        }\n\n        if (left <= right) {\n            // 4. Traverse Up\n            for (let i = bottom; i >= top; i--) {\n                result.push(matrix[i][left]);\n            }\n            left++;\n        }\n    }\n\n    return result;\n};",
        "explanation": "This solution simulates the spiral path by maintaining four boundary pointers: `top`, `bottom`, `left`, and `right`. The main `while` loop continues as long as the boundaries have not crossed (`left <= right` and `top <= bottom`). Inside the loop, it performs four for-loops to traverse one 'layer' of the matrix: first right, then down, then left, then up. After each pass, it updates the corresponding boundary pointer (e.g., after traversing right, it increments `top`). Crucially, it checks the boundary conditions again before the 'left' and 'up' passes to correctly handle matrices that are just a single row or column.",
        "timeComplexity": "O(m * n)",
        "spaceComplexity": "O(1)"
      }
    ],
    "acceptanceRate": 41.3,
    "totalSubmissions": 10000,
    "correctSubmissions": 4130,
    "averageTime": 16
  },
  {
    "title": "Unique Paths",
    "description": "There is a robot on an `m x n` grid. The robot is initially located at the top-left corner (`grid[0][0]`). The robot tries to move to the bottom-right corner (`grid[m-1][n-1]`). The robot can only move either **down** or **right** at any point in time.\n\nGiven the two integers `m` and `n`, return the number of possible unique paths that the robot can take to reach the bottom-right corner.\n\n**Example 1:**\nInput: m = 3, n = 7\nOutput: 28\n\n**Example 2:**\nInput: m = 3, n = 2\nOutput: 3\nExplanation:\nFrom the top-left corner, there are a total of 3 ways to reach the bottom-right corner:\n1. Right -> Down -> Down\n2. Down -> Down -> Right\n3. Down -> Right -> Down\n\n**Constraints:**\n- 1 <= m, n <= 100",
    "difficulty": "medium",
    "topics": [
      "Dynamic Programming",
      "Math",
      "Combinatorics"
    ],
    "companies": [
      "Amazon",
      "Microsoft",
      "Google",
      "Apple"
    ],
    "constraints": [
      "1 <= m, n <= 100"
    ],
    "examples": [
      {
        "input": "m = 3, n = 7",
        "output": "28",
        "explanation": "There are 28 unique paths."
      },
      {
        "input": "m = 3, n = 2",
        "output": "3",
        "explanation": "Right->Down->Down, Down->Down->Right, Down->Right->Down"
      }
    ],
    "testCases": [
      {
        "input": "3\n7",
        "expectedOutput": "28",
        "isHidden": false
      },
      {
        "input": "3\n2",
        "expectedOutput": "3",
        "isHidden": false
      },
      {
        "input": "1\n1",
        "expectedOutput": "1",
        "isHidden": true
      }
    ],
    "hints": [
      "This is a classic Dynamic Programming problem.",
      "Create a 2D DP grid `dp[m][n]` where `dp[i][j]` stores the number of unique paths to reach cell `(i, j)`.",
      "What is the base case? All cells in the first row (`dp[0][j]`) and first column (`dp[i][0]`) have only 1 path to reach them.",
      "For any other cell `dp[i][j]`, you can only arrive from the cell above (`dp[i-1][j]`) or the cell to the left (`dp[i][j-1]`).",
      "Therefore, the recurrence relation is `dp[i][j] = dp[i-1][j] + dp[i][j-1]`.",
      "The final answer is `dp[m-1][n-1]`.",
      "Can you optimize the space to O(n)?"
    ],
    "solutions": [
      {
        "language": "javascript",
        "code": "var uniquePaths = function(m, n) {\n    // Create a DP grid (or just one row for space optimization)\n    // Let's use O(n) space optimization.\n    let row = new Array(n).fill(1);\n\n    // We skip the first row since it's already all 1s\n    for (let i = 1; i < m; i++) {\n        // Create a new row for the current state\n        let newRow = new Array(n).fill(1);\n        for (let j = 1; j < n; j++) {\n            // dp[i][j] = dp[i-1][j] + dp[i][j-1]\n            // newRow[j] = row[j] + newRow[j-1]\n            newRow[j] = row[j] + newRow[j - 1];\n        }\n        // The 'newRow' becomes the 'previous row' for the next iteration\n        row = newRow;\n    }\n\n    // The last element of the final row is our answer\n    return row[n - 1];\n};",
        "explanation": "This solution uses Dynamic Programming with space optimization. Instead of storing the entire `m x n` grid, we only need the previous row to calculate the current row. We initialize a `row` array of size `n` with all `1`s (representing the base case for the first row). Then, we iterate from `i = 1` to `m-1` (for each remaining row). Inside, we create a `newRow`. We calculate `newRow[j]` (paths to cell `(i, j)`) by summing the paths from the cell above (`row[j]`) and the cell to the left (`newRow[j-1]`). After filling `newRow`, we set `row = newRow` and repeat. The final answer is the last element of the `row` array.",
        "timeComplexity": "O(m * n)",
        "spaceComplexity": "O(n)"
      }
    ],
    "acceptanceRate": 59.8,
    "totalSubmissions": 12000,
    "correctSubmissions": 7176,
    "averageTime": 14
  },
  {
    "title": "Jump Game",
    "description": "You are given an integer array `nums`. You are initially positioned at the array's **first index**, and each element in the array represents your maximum jump length at that position.\n\nReturn `true` if you can reach the last index, or `false` otherwise.\n\n**Example 1:**\nInput: nums = [2,3,1,1,4]\nOutput: true\nExplanation: Jump 1 step from index 0 to 1, then 3 steps to the last index.\n\n**Example 2:**\nInput: nums = [3,2,1,0,4]\nOutput: false\nExplanation: You will always arrive at index 3. Its maximum jump length is 0, which makes it impossible to reach the last index.\n\n**Constraints:**\n- 1 <= nums.length <= 10^4\n- 0 <= nums[i] <= 10^5",
    "difficulty": "medium",
    "topics": [
      "Array",
      "Dynamic Programming",
      "Greedy"
    ],
    "companies": [
      "Amazon",
      "Microsoft",
      "Facebook",
      "Google"
    ],
    "constraints": [
      "1 <= nums.length <= 10^4",
      "0 <= nums[i] <= 10^5"
    ],
    "examples": [
      {
        "input": "nums = [2,3,1,1,4]",
        "output": "true",
        "explanation": "Can jump from 0 to 1 (1 step), then 1 to 4 (3 steps)."
      },
      {
        "input": "nums = [3,2,1,0,4]",
        "output": "false",
        "explanation": "Will get stuck at index 3, which has a jump length of 0."
      }
    ],
    "testCases": [
      {
        "input": "[2,3,1,1,4]",
        "expectedOutput": "true",
        "isHidden": false
      },
      {
        "input": "[3,2,1,0,4]",
        "expectedOutput": "false",
        "isHidden": false
      },
      {
        "input": "[0]",
        "expectedOutput": "true",
        "isHidden": true
      }
    ],
    "hints": [
      "A DP solution is possible, where `dp[i]` is true if you can reach index `i`.",
      "A much simpler O(n) solution is to use a Greedy approach.",
      "Think about the *farthest* index you can reach.",
      "Maintain a variable `maxReach` initialized to 0.",
      "Iterate through the array from `i = 0` to `n-1`.",
      "At each `i`, if `i > maxReach`, it means you got stuck and can't reach `i`. Return `false`.",
      "If you can reach `i`, update your `maxReach`: `maxReach = max(maxReach, i + nums[i])`.",
      "If `maxReach` ever becomes greater than or equal to the last index (`n - 1`), you can stop and return `true`."
    ],
    "solutions": [
      {
        "language": "javascript",
        "code": "var canJump = function(nums) {\n    let maxReach = 0;\n    const lastIndex = nums.length - 1;\n\n    for (let i = 0; i < nums.length; i++) {\n        // If the current index 'i' is beyond the farthest we could possibly reach,\n        // then we are stuck.\n        if (i > maxReach) {\n            return false;\n        }\n\n        // Update the farthest index we can reach\n        maxReach = Math.max(maxReach, i + nums[i]);\n\n        // If our maxReach is already at or beyond the end, we are done.\n        if (maxReach >= lastIndex) {\n            return true;\n        }\n    }\n\n    // This line is technically only reached if the loop completes,\n    // which means maxReach >= lastIndex was true.\n    return true;\n};",
        "explanation": "This solution uses a Greedy approach. We maintain one variable, `maxReach`, which stores the farthest index we can get to from the start. We iterate through the array with index `i`. In each iteration, we first check if `i` has gone *beyond* our `maxReach`. If it has, it means we got stuck at a previous index and could never reach `i`, so we return `false`. If we *can* reach `i`, we update `maxReach` to be the maximum of its current value and the farthest we can jump *from* `i` (which is `i + nums[i]`). If `maxReach` becomes greater than or equal to the `lastIndex`, we've succeeded and can return `true` early.",
        "timeComplexity": "O(n)",
        "spaceComplexity": "O(1)"
      }
    ],
    "acceptanceRate": 37.9,
    "totalSubmissions": 16000,
    "correctSubmissions": 6064,
    "averageTime": 17
  },
  {
    "title": "Edit Distance",
    "description": "Given two strings `word1` and `word2`, return the minimum number of operations required to convert `word1` to `word2`.\n\nYou have the following three operations permitted on a word:\n1. Insert a character\n2. Delete a character\n3. Replace a character\n\n**Example 1:**\nInput: word1 = \"horse\", word2 = \"ros\"\nOutput: 3\nExplanation:\nhorse -> rorse (replace 'h' with 'r')\nrorse -> rose (delete 'r')\nrose -> ros (delete 'e')\n\n**Example 2:**\nInput: word1 = \"intention\", word2 = \"execution\"\nOutput: 5\nExplanation:\nintention -> inention (delete 't')\n... (and so on)\n\n**Constraints:**\n- 0 <= word1.length, word2.length <= 500\n- `word1` and `word2` consist of lowercase English letters.",
    "difficulty": "hard",
    "topics": [
      "String",
      "Dynamic Programming"
    ],
    "companies": [
      "Google",
      "Amazon",
      "Microsoft",
      "Facebook"
    ],
    "constraints": [
      "0 <= word1.length, word2.length <= 500",
      "word1 and word2 consist of lowercase English letters."
    ],
    "examples": [
      {
        "input": "word1 = \"horse\", word2 = \"ros\"",
        "output": "3",
        "explanation": "3 operations: replace, delete, delete."
      },
      {
        "input": "word1 = \"intention\", word2 = \"execution\"",
        "output": "5",
        "explanation": "5 operations are needed."
      }
    ],
    "testCases": [
      {
        "input": "\"horse\"\n\"ros\"",
        "expectedOutput": "3",
        "isHidden": false
      },
      {
        "input": "\"intention\"\n\"execution\"",
        "expectedOutput": "5",
        "isHidden": false
      },
      {
        "input": "\"\"\n\"a\"",
        "expectedOutput": "1",
        "isHidden": true
      }
    ],
    "hints": [
      "This is a classic 2D Dynamic Programming problem (Levenshtein distance).",
      "Let `dp[i][j]` be the minimum edit distance between the first `i` characters of `word1` and the first `j` characters of `word2`.",
      "Base Cases: `dp[i][0] = i` (to convert `word1[0...i]` to an empty string requires `i` deletions). Similarly, `dp[0][j] = j` (requires `j` insertions).",
      "Now, consider `dp[i][j]`. Look at the characters `word1[i-1]` and `word2[j-1]`.",
      "If `word1[i-1] == word2[j-1]`, then no operation is needed for this character. The cost is `dp[i-1][j-1]`.",
      "If `word1[i-1] != word2[j-1]`, you have three choices:\n  1. **Replace:** `dp[i-1][j-1] + 1` (replace `word1[i-1]` with `word2[j-1]`)\n  2. **Delete:** `dp[i-1][j] + 1` (delete `word1[i-1]`)\n  3. **Insert:** `dp[i][j-1] + 1` (insert `word2[j-1]` into `word1`)\n  `dp[i][j]` is the minimum of these three choices.",
      "The final answer is `dp[word1.length][word2.length]`."
    ],
    "solutions": [
      {
        "language": "javascript",
        "code": "var minDistance = function(word1, word2) {\n    const m = word1.length;\n    const n = word2.length;\n\n    // dp[i][j] = min distance between word1[0...i] and word2[0...j]\n    const dp = new Array(m + 1).fill(0).map(() => new Array(n + 1).fill(0));\n\n    // Base cases: transforming to/from empty string\n    for (let i = 0; i <= m; i++) {\n        dp[i][0] = i; // i deletions\n    }\n    for (let j = 0; j <= n; j++) {\n        dp[0][j] = j; // j insertions\n    }\n\n    // Fill the DP table\n    for (let i = 1; i <= m; i++) {\n        for (let j = 1; j <= n; j++) {\n            if (word1[i - 1] === word2[j - 1]) {\n                // Characters match, no cost\n                dp[i][j] = dp[i - 1][j - 1];\n            } else {\n                // Characters don't match, take min of 3 operations\n                const replaceCost = dp[i - 1][j - 1];\n                const deleteCost = dp[i - 1][j];\n                const insertCost = dp[i][j - 1];\n                dp[i][j] = 1 + Math.min(replaceCost, deleteCost, insertCost);\n            }\n        }\n    }\n\n    return dp[m][n];\n};",
        "explanation": "This solution uses 2D Dynamic Programming. We create a `dp` grid of size `(m+1) x (n+1)`, where `dp[i][j]` stores the min operations to convert `word1.substring(0, i)` to `word2.substring(0, j)`. We initialize the base cases: the first row (`dp[0][j]`) is `j` (all insertions) and the first column (`dp[i][0]`) is `i` (all deletions). Then, we iterate through the grid. If the characters `word1[i-1]` and `word2[j-1]` are the same, the cost is just `dp[i-1][j-1]`. If they are different, we must perform an operation. The cost is `1 + min(replace, delete, insert)`, where `replace` is `dp[i-1][j-1]`, `delete` is `dp[i-1][j]`, and `insert` is `dp[i][j-1]`. The final answer is in the bottom-right cell, `dp[m][n]`.",
        "timeComplexity": "O(m * n)",
        "spaceComplexity": "O(m * n)"
      }
    ],
    "acceptanceRate": 51.2,
    "totalSubmissions": 7000,
    "correctSubmissions": 3584,
    "averageTime": 40
  },
  {
    "title": "Kth Largest Element in an Array",
    "description": "Given an integer array `nums` and an integer `k`, return the `k`-th largest element in the array.\n\nNote that it is the `k`-th largest element in the sorted order, not the `k`-th distinct element.\n\n**Example 1:**\nInput: nums = [3,2,1,5,6,4], k = 2\nOutput: 5\n\n**Example 2:**\nInput: nums = [3,2,3,1,2,4,5,5,6], k = 4\nOutput: 4\n\n**Constraints:**\n- 1 <= k <= nums.length <= 10^5\n- -10^4 <= nums[i] <= 10^4",
    "difficulty": "medium",
    "topics": [
      "Array",
      "Heap (Priority Queue)",
      "Quickselect"
    ],
    "companies": [
      "Amazon",
      "Facebook",
      "Microsoft",
      "Apple"
    ],
    "constraints": [
      "1 <= k <= nums.length <= 10^5",
      "-10^4 <= nums[i] <= 10^4"
    ],
    "examples": [
      {
        "input": "nums = [3,2,1,5,6,4], k = 2",
        "output": "5",
        "explanation": "Sorted array is [1,2,3,4,5,6]. The 2nd largest is 5."
      },
      {
        "input": "nums = [3,2,3,1,2,4,5,5,6], k = 4",
        "output": "4",
        "explanation": "Sorted array is [1,2,2,3,3,4,5,5,6]. The 4th largest is 4."
      }
    ],
    "testCases": [
      {
        "input": "[3,2,1,5,6,4]\n2",
        "expectedOutput": "5",
        "isHidden": false
      },
      {
        "input": "[3,2,3,1,2,4,5,5,6]\n4",
        "expectedOutput": "4",
        "isHidden": false
      }
    ],
    "hints": [
      "The simplest solution is to sort the array, which takes O(n log n) time, and return the element at index `nums.length - k`.",
      "A more optimal solution uses a Min-Heap (Priority Queue).",
      "Create a Min-Heap of size `k`.",
      "Iterate through `nums`. For each `num`, add it to the heap.",
      "If the heap's size exceeds `k`, remove the smallest element (`heap.poll()`).",
      "After iterating through all of `nums`, the heap will contain the `k` largest elements. The root of the Min-Heap (the smallest element *in the heap*) will be the `k`-th largest element overall.",
      "This approach has a time complexity of O(n log k)."
    ],
    "solutions": [
      {
        "language": "javascript",
        "code": "// Note: This solution assumes a MinPriorityQueue class is available.\n// In a real interview, you might be asked to implement one or use\n// a library like 'collections/heap'.\n\nvar findKthLargest = function(nums, k) {\n    // Create a Min-Heap\n    // In JS, a MinPriorityQueue can be used.\n    const minHeap = new MinPriorityQueue();\n\n    for (const num of nums) {\n        minHeap.enqueue(num);\n\n        // If the heap size exceeds k, remove the smallest element\n        if (minHeap.size() > k) {\n            minHeap.dequeue();\n        }\n    }\n\n    // The root of the heap is the k-th largest element\n    return minHeap.front().element;\n};",
        "explanation": "This solution uses a Min-Heap (Min Priority Queue) of size `k`. We iterate through all numbers in the `nums` array. For each `num`, we add it to the `minHeap`. Immediately after adding, we check if the heap's size has grown larger than `k`. If it has, we `dequeue` (remove) the smallest element from the heap. This ensures that the heap *always* stores only the `k` largest elements seen so far. After the loop finishes, the root of the Min-Heap (which is the smallest of the `k` largest numbers) is our answer.",
        "timeComplexity": "O(n log k)",
        "spaceComplexity": "O(k)"
      }
    ],
    "acceptanceRate": 63.8,
    "totalSubmissions": 13000,
    "correctSubmissions": 8294,
    "averageTime": 20
  },
  {
    "title": "LRU Cache",
    "description": "Design a data structure that follows the constraints of a **Least Recently Used (LRU) cache**.\n\nImplement the `LRUCache` class:\n- `LRUCache(int capacity)` Initialize the LRU cache with positive size `capacity`.\n- `int get(int key)` Return the value of the `key` if the key exists, otherwise return -1.\n- `void put(int key, int value)` Update the value of the `key` if the `key` exists. Otherwise, add the `key-value` pair to the cache. If the number of keys exceeds the `capacity` from this operation, evict the **least recently used** key.\n\nBoth `get` and `put` must be in O(1) average time complexity.\n\n**Example 1:**\n`LRUCache lRUCache = new LRUCache(2);`\n`lRUCache.put(1, 1);` // cache is {1=1}\n`lRUCache.put(2, 2);` // cache is {1=1, 2=2}\n`lRUCache.get(1);`    // return 1, {2=2, 1=1} (1 is now most recent)\n`lRUCache.put(3, 3);` // LRU key 2 was evicted, cache is {1=1, 3=3}\n`lRUCache.get(2);`    // return -1 (not found)\n`lRUCache.put(4, 4);` // LRU key 1 was evicted, cache is {3=3, 4=4}\n\n**Constraints:**\n- 1 <= capacity <= 3000\n- 0 <= key <= 10^4\n- 0 <= value <= 10^5\n- At most 2 * 10^5 calls will be made to `get` and `put`.",
    "difficulty": "medium",
    "topics": [
      "Hash Table",
      "Linked List",
      "Design",
      "Doubly-Linked List"
    ],
    "companies": [
      "Amazon",
      "Microsoft",
      "Facebook",
      "Google"
    ],
    "constraints": [
      "1 <= capacity <= 3000",
      "At most 2 * 10^5 calls will be made to get and put.",
      "O(1) time for get and put."
    ],
    "examples": [
      {
        "input": "[\"LRUCache\", \"put\", \"put\", \"get\", \"put\", \"get\", \"put\", \"get\", \"get\", \"get\"]\n[[2], [1, 1], [2, 2], [1], [3, 3], [2], [4, 4], [1], [3], [4]]",
        "output": "[null, null, null, 1, null, -1, null, -1, 3, 4]",
        "explanation": "See problem description."
      }
    ],
    "testCases": [
      {
        "input": "[\"LRUCache\",\"put\",\"put\",\"get\",\"put\",\"get\",\"put\",\"get\",\"get\",\"get\"]\n[[2],[1,1],[2,2],[1],[3,3],[2],[4,4],[1],[3],[4]]",
        "expectedOutput": "[null,null,null,1,null,-1,null,-1,3,4]",
        "isHidden": false
      }
    ],
    "hints": [
      "To achieve O(1) `get`, a Hash Map is required to store `key -> value`.",
      "But a Hash Map doesn't track usage order (LRU).",
      "To achieve O(1) `put` (add/remove/move), we need a data structure that supports O(1) insertion and deletion.",
      "A Doubly Linked List is perfect for this. We can maintain the order of usage in the list. The head will be the *most* recently used, and the tail will be the *least* recently used.",
      "The final data structure is a *combination*: a Hash Map where the `key` points to the *Node* in the Doubly Linked List (`key -> Node`).",
      "When `get(key)` is called: 1. Look up `key` in the map. 2. If it exists, get the `Node`. 3. Move this `Node` to the front of the list. 4. Return `Node.value`.",
      "When `put(key, value)` is called: 1. Check if `key` is in the map. 2. If yes, update the `Node.value` and move it to the front. 3. If no, create a new `Node`. 4. Add the `Node` to the front of the list and add `(key, Node)` to the map. 5. Check if `map.size > capacity`. If yes, remove the *tail* of the list and remove its key from the map."
    ],
    "solutions": [
      {
        "language": "javascript",
        "code": "// Helper Node class for the Doubly Linked List\nclass DLinkedNode {\n    constructor(key = 0, value = 0) {\n        this.key = key;\n        this.value = value;\n        this.prev = null;\n        this.next = null;\n    }\n}\n\nvar LRUCache = function(capacity) {\n    this.capacity = capacity;\n    this.map = new Map(); // Stores key -> Node\n    \n    // Dummy head and tail for easier list manipulation\n    this.head = new DLinkedNode();\n    this.tail = new DLinkedNode();\n    this.head.next = this.tail;\n    this.tail.prev = this.head;\n};\n\n// --- Helper methods for list --- \nLRUCache.prototype._removeNode = function(node) {\n    node.prev.next = node.next;\n    node.next.prev = node.prev;\n};\n\nLRUCache.prototype._addNodeToHead = function(node) {\n    node.next = this.head.next;\n    node.prev = this.head;\n    this.head.next.prev = node;\n    this.head.next = node;\n};\n\nLRUCache.prototype._moveToHead = function(node) {\n    this._removeNode(node);\n    this._addNodeToHead(node);\n};\n// --- End of helper methods ---\n\nLRUCache.prototype.get = function(key) {\n    if (!this.map.has(key)) {\n        return -1;\n    }\n    \n    const node = this.map.get(key);\n    // Move to front (most recently used)\n    this._moveToHead(node);\n    return node.value;\n};\n\nLRUCache.prototype.put = function(key, value) {\n    if (this.map.has(key)) {\n        // Key exists, update value and move to front\n        const node = this.map.get(key);\n        node.value = value;\n        this._moveToHead(node);\n    } else {\n        // Key doesn't exist, add new node\n        const newNode = new DLinkedNode(key, value);\n        this.map.set(key, newNode);\n        this._addNodeToHead(newNode);\n        \n        // Check capacity\n        if (this.map.size > this.capacity) {\n            // Evict the LRU element (the one before the tail)\n            const lru = this.tail.prev;\n            this._removeNode(lru);\n            this.map.delete(lru.key);\n        }\n    }\n};",
        "explanation": "This solution uses a Hash Map (`this.map`) and a Doubly Linked List. The `map` stores `key -> Node` pairs for O(1) lookup. The Doubly Linked List maintains the usage order. We use `dummy` `head` and `tail` nodes to avoid null checks. `_addNodeToHead` adds a node to the front (Most Recently Used). `_removeNode` removes a node from anywhere. `_moveToHead` combines them. `get(key)`: Looks up the `key` in the map. If found, it moves the corresponding `node` to the head and returns its value. `put(key, value)`: If the `key` exists, it updates the `node`'s value and moves it to the head. If it's a new `key`, it creates a `newNode`, adds it to the head, and puts it in the map. Finally, it checks if `map.size` exceeds `capacity`. If so, it removes the node just before the `tail` (the Least Recently Used) from both the list and the map.",
        "timeComplexity": "O(1)",
        "spaceComplexity": "O(capacity)"
      }
    ],
    "acceptanceRate": 38.4,
    "totalSubmissions": 14000,
    "correctSubmissions": 5376,
    "averageTime": 42
  },
  {
    "title": "Merge Sorted Array",
    "description": "You are given two integer arrays `nums1` and `nums2`, sorted in non-decreasing order, and two integers `m` and `n`, representing the number of elements in `nums1` and `nums2` respectively.\n\nMerge `nums1` and `nums2` into a single array sorted in non-decreasing order.\n\nThe final sorted array should not be returned by the function, but instead be stored **inside the array `nums1`**. To accommodate this, `nums1` has a length of `m + n`, where the first `m` elements denote the elements that should be merged, and the last `n` elements are set to 0 and should be ignored.\n\n**Example 1:**\nInput: nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3\nOutput: [1,2,2,3,5,6]\nExplanation: The arrays we are merging are [1,2,3] and [2,5,6]. The result of the merge is [1,2,2,3,5,6] with the underlined elements coming from nums2.\n\n**Example 2:**\nInput: nums1 = [1], m = 1, nums2 = [], n = 0\nOutput: [1]\n\n**Example 3:**\nInput: nums1 = [0], m = 0, nums2 = [1], n = 1\nOutput: [1]\n\n**Constraints:**\n- nums1.length == m + n\n- nums2.length == n\n- 0 <= m, n <= 200\n- 1 <= m + n <= 200\n- -10^9 <= nums1[i], nums2[j] <= 10^9",
    "difficulty": "easy",
    "topics": [
      "Array",
      "Two Pointers",
      "Sorting"
    ],
    "companies": [
      "Amazon",
      "Microsoft",
      "Facebook",
      "Google"
    ],
    "constraints": [
      "nums1.length == m + n",
      "nums2.length == n",
      "0 <= m, n <= 200",
      "1 <= m + n <= 200",
      "-10^9 <= nums1[i], nums2[j] <= 10^9"
    ],
    "examples": [
      {
        "input": "nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3",
        "output": "[1,2,2,3,5,6]",
        "explanation": "The merged and sorted array is stored back into nums1."
      },
      {
        "input": "nums1 = [0], m = 0, nums2 = [1], n = 1",
        "output": "[1]",
        "explanation": "nums1 is initially empty (m=0), so it becomes [1]."
      }
    ],
    "testCases": [
      {
        "input": "[1,2,3,0,0,0]\n3\n[2,5,6]\n3",
        "expectedOutput": "[1,2,2,3,5,6]",
        "isHidden": false
      },
      {
        "input": "[1]\n1\n[]\n0",
        "expectedOutput": "[1]",
        "isHidden": false
      },
      {
        "input": "[2,0]\n1\n[1]\n1",
        "expectedOutput": "[1,2]",
        "isHidden": true
      }
    ],
    "hints": [
      "A simple approach is to copy `nums2` into the end of `nums1` and then sort `nums1`. But this is not O(m+n).",
      "To do it in O(m+n), you need to merge in-place.",
      "Think about merging from the *end* of the arrays, not the beginning. This avoids overwriting elements in `nums1` that haven't been processed yet.",
      "Use three pointers: `p1` at `m-1`, `p2` at `n-1`, and `p_insert` at `(m+n)-1`. Compare the elements at `p1` and `p2` and place the larger one at `p_insert`."
    ],
    "solutions": [
      {
        "language": "javascript",
        "code": "var merge = function(nums1, m, nums2, n) {\n    // Initialize pointers for the end of nums1, nums2, and the merged array\n    let p1 = m - 1;\n    let p2 = n - 1;\n    let pInsert = m + n - 1;\n\n    // Merge from the end\n    while (p2 >= 0) {\n        if (p1 >= 0 && nums1[p1] > nums2[p2]) {\n            // Place the larger element from nums1\n            nums1[pInsert] = nums1[p1];\n            p1--;\n        } else {\n            // Place the element from nums2 (it's larger or p1 is exhausted)\n            nums1[pInsert] = nums2[p2];\n            p2--;\n        }\n        pInsert--;\n    }\n    // If p1 >= 0, those elements are already in the correct spot\n};",
        "explanation": "This solution uses a three-pointer approach to merge the arrays in-place from the end, achieving O(1) extra space. `p1` points to the last *real* element of `nums1` (index `m-1`). `p2` points to the last element of `nums2` (index `n-1`). `pInsert` points to the last index of `nums1` (index `m+n-1`), which is where we will insert the largest elements. The `while` loop continues as long as `p2` has elements. In each iteration, we compare `nums1[p1]` and `nums2[p2]` and place the larger of the two at `nums1[pInsert]`. We then decrement the appropriate pointers. If `p1` runs out first, the `else` block will handle copying the remaining `nums2` elements.",
        "timeComplexity": "O(m + n)",
        "spaceComplexity": "O(1)"
      }
    ],
    "acceptanceRate": 45.8,
    "totalSubmissions": 16000,
    "correctSubmissions": 7328,
    "averageTime": 10
  },
  {
    "title": "Ransom Note",
    "description": "Given two strings, `ransomNote` and `magazine`, return `true` if `ransomNote` can be constructed by using the letters from `magazine` and `false` otherwise.\n\nEach letter in `magazine` can only be used once in `ransomNote`.\n\n**Example 1:**\nInput: ransomNote = \"a\", magazine = \"b\"\nOutput: false\n\n**Example 2:**\nInput: ransomNote = \"aa\", magazine = \"ab\"\nOutput: false\n\n**Example 3:**\nInput: ransomNote = \"aa\", magazine = \"aab\"\nOutput: true\n\n**Constraints:**\n- 1 <= ransomNote.length, magazine.length <= 10^5\n- `ransomNote` and `magazine` consist of lowercase English letters.",
    "difficulty": "easy",
    "topics": [
      "String",
      "Hash Table",
      "Counting"
    ],
    "companies": [
      "Amazon",
      "Microsoft",
      "Facebook",
      "Google"
    ],
    "constraints": [
      "1 <= ransomNote.length, magazine.length <= 10^5",
      "ransomNote and magazine consist of lowercase English letters."
    ],
    "examples": [
      {
        "input": "ransomNote = \"a\", magazine = \"b\"",
        "output": "false",
        "explanation": "Cannot construct 'a' from 'b'."
      },
      {
        "input": "ransomNote = \"aa\", magazine = \"aab\"",
        "output": "true",
        "explanation": "Can use two 'a's from 'aab'."
      }
    ],
    "testCases": [
      {
        "input": "\"a\"\n\"b\"",
        "expectedOutput": "false",
        "isHidden": false
      },
      {
        "input": "\"aa\"\n\"aab\"",
        "expectedOutput": "true",
        "isHidden": false
      },
      {
        "input": "\"fihjjjjei\"\n\"hjibagacbhadfaefdjaeaebgi\"",
        "expectedOutput": "false",
        "isHidden": true
      }
    ],
    "hints": [
      "We need to check if the `magazine` has enough of each character to build the `ransomNote`.",
      "A hash map (or an array of size 26) can be used to store the character counts.",
      "First, iterate through the `magazine` and count the frequency of each character.",
      "Second, iterate through the `ransomNote`. For each character, decrement its count in the map. If the count is already 0 (or the character doesn't exist), return `false`."
    ],
    "solutions": [
      {
        "language": "javascript",
        "code": "var canConstruct = function(ransomNote, magazine) {\n    const magCounts = new Map();\n\n    // 1. Populate the frequency map for the magazine\n    for (const char of magazine) {\n        magCounts.set(char, (magCounts.get(char) || 0) + 1);\n    }\n\n    // 2. Check if the ransom note can be constructed\n    for (const char of ransomNote) {\n        const count = magCounts.get(char) || 0;\n\n        if (count === 0) {\n            // Not enough of this character\n            return false;\n        }\n\n        // Use up one instance of this character\n        magCounts.set(char, count - 1);\n    }\n\n    // If we got through the whole note, it's possible\n    return true;\n};",
        "explanation": "This solution uses a hash map (`magCounts`) to store the frequencies of all characters in the `magazine`. First, we iterate through the `magazine` and populate this map. Second, we iterate through the `ransomNote`. For each character in the `ransomNote`, we check its count in `magCounts`. If the count is 0 or the character isn't in the map, it means the `magazine` doesn't have this character available, so we return `false`. If the character is available, we 'use' it by decrementing its count in the map and continue. If we successfully iterate through the entire `ransomNote`, we return `true`.",
        "timeComplexity": "O(m + n)",
        "spaceComplexity": "O(1)"
      }
    ],
    "acceptanceRate": 56.1,
    "totalSubmissions": 10000,
    "correctSubmissions": 5610,
    "averageTime": 12
  },
  {
    "title": "Unique Paths II",
    "description": "You are given an `m x n` integer array `grid`. There is a robot on an `m x n` grid. The robot is initially located at the top-left corner (`grid[0][0]`). The robot tries to move to the bottom-right corner (`grid[m-1][n-1]`). The robot can only move either **down** or **right** at any point in time.\n\nAn obstacle is present in the grid if `grid[i][j] == 1`. If `grid[i][j] == 0`, it means there is an empty space.\n\nReturn the number of possible unique paths that the robot can take to reach the bottom-right corner. The testcases are generated so that the answer will be less than or equal to `2 * 10^9`.\n\n**Example 1:**\nInput: obstacleGrid = [[0,0,0],[0,1,0],[0,0,0]]\nOutput: 2\nExplanation: There is one obstacle in the middle. The two paths are: 1. Right -> Right -> Down -> Down 2. Down -> Down -> Right -> Right\n\n**Example 2:**\nInput: obstacleGrid = [[0,1],[0,0]]\nOutput: 1\n\n**Constraints:**\n- m == obstacleGrid.length\n- n == obstacleGrid[i].length\n- 1 <= m, n <= 100\n- obstacleGrid[i][j] is 0 or 1.",
    "difficulty": "medium",
    "topics": [
      "Array",
      "Dynamic Programming",
      "Matrix"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Facebook"
    ],
    "constraints": [
      "m == obstacleGrid.length",
      "n == obstacleGrid[i].length",
      "1 <= m, n <= 100",
      "obstacleGrid[i][j] is 0 or 1."
    ],
    "examples": [
      {
        "input": "obstacleGrid = [[0,0,0],[0,1,0],[0,0,0]]",
        "output": "2",
        "explanation": "The obstacle blocks the central path."
      },
      {
        "input": "obstacleGrid = [[0,1],[0,0]]",
        "output": "1",
        "explanation": "Only one path: Down -> Right."
      }
    ],
    "testCases": [
      {
        "input": "[[0,0,0],[0,1,0],[0,0,0]]",
        "expectedOutput": "2",
        "isHidden": false
      },
      {
        "input": "[[0,1],[0,0]]",
        "expectedOutput": "1",
        "isHidden": false
      },
      {
        "input": "[[0,0],[0,1]]",
        "expectedOutput": "0",
        "isHidden": true
      }
    ],
    "hints": [
      "This is a variation of the 'Unique Paths' problem.",
      "Use the same 2D DP approach: `dp[i][j]` = number of paths to cell `(i, j)`.",
      "The recurrence relation is still `dp[i][j] = dp[i-1][j] + dp[i][j-1]`.",
      "The new rule: If `obstacleGrid[i][j] == 1`, then `dp[i][j] = 0` (no paths can go *to* or *through* this cell).",
      "Be careful with the base cases (first row and column). If `obstacleGrid[0][j] == 1`, then `dp[0][j]` and all cells to its right in that row must be 0. Same for the first column."
    ],
    "solutions": [
      {
        "language": "javascript",
        "code": "var uniquePathsWithObstacles = function(obstacleGrid) {\n    const m = obstacleGrid.length;\n    const n = obstacleGrid[0].length;\n\n    // If the start or end is an obstacle, return 0\n    if (obstacleGrid[0][0] === 1 || obstacleGrid[m - 1][n - 1] === 1) {\n        return 0;\n    }\n\n    // Use O(n) space optimization\n    let row = new Array(n).fill(0);\n\n    // Initialize the first row (base case)\n    row[0] = 1; // Start cell\n    for (let j = 1; j < n; j++) {\n        if (obstacleGrid[0][j] === 1) {\n            row[j] = 0;\n        } else {\n            row[j] = row[j - 1];\n        }\n    }\n\n    // Fill the rest of the DP table (rows)\n    for (let i = 1; i < m; i++) {\n        let newRow = new Array(n).fill(0);\n        // First cell of the new row\n        if (obstacleGrid[i][0] === 1) {\n            newRow[0] = 0;\n        } else {\n            newRow[0] = row[0];\n        }\n\n        for (let j = 1; j < n; j++) {\n            if (obstacleGrid[i][j] === 1) {\n                newRow[j] = 0;\n            } else {\n                // newRow[j] = newRow[j-1] (left) + row[j] (top)\n                newRow[j] = newRow[j - 1] + row[j];\n            }\n        }\n        row = newRow;\n    }\n\n    return row[n - 1];\n};",
        "explanation": "This solution is a modified version of the 'Unique Paths' DP, optimized for O(n) space. We use a single array `row` to represent the DP state of the *previous* row. We first initialize `row` based on the first row of the grid, setting `row[j]` to 0 if an obstacle is encountered. Then, we iterate from the second row (`i=1`) to the end. In each iteration, we create a `newRow`. `newRow[j]` is set to 0 if `obstacleGrid[i][j]` is an obstacle. Otherwise, it's the sum of the paths from the left (`newRow[j-1]`) and the paths from above (`row[j]`). After each row `i` is processed, `newRow` becomes the `row` for the next iteration. The final answer is the last element of the `row` array.",
        "timeComplexity": "O(m * n)",
        "spaceComplexity": "O(n)"
      }
    ],
    "acceptanceRate": 37.5,
    "totalSubmissions": 9000,
    "correctSubmissions": 3375,
    "averageTime": 15
  },
  {
    "title": "Path Sum",
    "description": "Given the `root` of a binary tree and an integer `targetSum`, return `true` if the tree has a root-to-leaf path such that adding up all the values along the path equals `targetSum`.\n\nA leaf is a node with no children.\n\n**Example 1:**\nInput: root = [5,4,8,11,null,13,4,7,2,null,null,null,1], targetSum = 22\nOutput: true\nExplanation: The path 5 -> 4 -> 11 -> 2 has a sum of 22.\n\n**Example 2:**\nInput: root = [1,2,3], targetSum = 5\nOutput: false\n\n**Example 3:**\nInput: root = [], targetSum = 0\nOutput: false\n\n**Constraints:**\n- The number of nodes in the tree is in the range [0, 5000].\n- -1000 <= Node.val <= 1000\n- -1000 <= targetSum <= 1000",
    "difficulty": "easy",
    "topics": [
      "Tree",
      "Depth-First Search",
      "Recursion"
    ],
    "companies": [
      "Amazon",
      "Microsoft",
      "Google"
    ],
    "constraints": [
      "The number of nodes in the tree is in the range [0, 5000].",
      "-1000 <= Node.val <= 1000",
      "-1000 <= targetSum <= 1000"
    ],
    "examples": [
      {
        "input": "root = [5,4,8,11,null,13,4,7,2,null,null,null,1], targetSum = 22",
        "output": "true",
        "explanation": "The root-to-leaf path 5->4->11->2 sums to 22."
      },
      {
        "input": "root = [1,2,3], targetSum = 5",
        "output": "false",
        "explanation": "No root-to-leaf path sums to 5."
      }
    ],
    "testCases": [
      {
        "input": "[5,4,8,11,null,13,4,7,2,null,null,null,1]\n22",
        "expectedOutput": "true",
        "isHidden": false
      },
      {
        "input": "[1,2,3]\n5",
        "expectedOutput": "false",
        "isHidden": false
      },
      {
        "input": "[]\n0",
        "expectedOutput": "false",
        "isHidden": true
      },
      {
        "input": "[1,2]\n1",
        "expectedOutput": "false",
        "isHidden": true
      }
    ],
    "hints": [
      "Use recursion (DFS).",
      "The base case is if `root` is `null`. In this case, return `false`.",
      "A more specific base case: if the node is a *leaf* (no left or right child), check if its value equals the *remaining* `targetSum`.",
      "In the recursive step, subtract the current node's value from the `targetSum`.",
      "Return `true` if the recursive call on the left child OR the recursive call on the right child returns `true`."
    ],
    "solutions": [
      {
        "language": "javascript",
        "code": "/**\n * Definition for a binary tree node.\n * function TreeNode(val, left, right) {\n * this.val = (val===undefined ? 0 : val)\n * this.left = (left===undefined ? null : left)\n * this.right = (right===undefined ? null : right)\n * }\n */\nvar hasPathSum = function(root, targetSum) {\n    if (root === null) {\n        // An empty tree has no paths\n        return false;\n    }\n\n    // Check if it's a leaf node\n    if (root.left === null && root.right === null) {\n        // This is a leaf. Check if its value makes the sum.\n        return root.val === targetSum;\n    }\n\n    // It's not a leaf. Subtract current val and recurse.\n    const remainingSum = targetSum - root.val;\n\n    // Check if a path exists in the left OR right subtree\n    return hasPathSum(root.left, remainingSum) || hasPathSum(root.right, remainingSum);\n};",
        "explanation": "This solution uses a recursive Depth-First Search. The base case is an empty node (`root === null`), which always returns `false`. The second, more important base case is a *leaf node* (`root.left === null && root.right === null`). At a leaf, we check if the node's value is equal to the `targetSum` we're looking for. If it's not a leaf, we recursively call `hasPathSum` on the left and right children, passing the *remaining* sum (`targetSum - root.val`). If either the left or right subtree finds a valid path, we return `true`.",
        "timeComplexity": "O(n)",
        "spaceComplexity": "O(h)"
      }
    ],
    "acceptanceRate": 44.9,
    "totalSubmissions": 12000,
    "correctSubmissions": 5388,
    "averageTime": 14
  },
  {
    "title": "Jump Game II",
    "description": "You are given a 0-indexed array of integers `nums` of length `n`. You are initially positioned at `nums[0]`.\n\nEach element `nums[i]` represents the maximum length of a forward jump from index `i`. In other words, if you are at `nums[i]`, you can jump to any `nums[i + j]` where `0 <= j <= nums[i]` and `i + j < n`.\n\nReturn the minimum number of jumps to reach `nums[n - 1]`. The test cases are generated such that you can always reach `nums[n - 1]`.\n\n**Example 1:**\nInput: nums = [2,3,1,1,4]\nOutput: 2\nExplanation: The minimum number of jumps to reach the last index is 2. Jump 1 step from index 0 to 1, then 3 steps to the last index.\n\n**Example 2:**\nInput: nums = [2,3,0,1,4]\nOutput: 2\n\n**Constraints:**\n- 1 <= nums.length <= 10^4\n- 0 <= nums[i] <= 1000\n- It's guaranteed that you can reach `nums[n - 1]`.",
    "difficulty": "medium",
    "topics": [
      "Array",
      "Dynamic Programming",
      "Greedy"
    ],
    "companies": [
      "Amazon",
      "Microsoft",
      "Google",
      "Apple"
    ],
    "constraints": [
      "1 <= nums.length <= 10^4",
      "0 <= nums[i] <= 1000",
      "It's guaranteed that you can reach nums[n - 1]."
    ],
    "examples": [
      {
        "input": "nums = [2,3,1,1,4]",
        "output": "2",
        "explanation": "Jump 0->1 (1 step), then 1->4 (3 steps). Total 2 jumps."
      },
      {
        "input": "nums = [2,3,0,1,4]",
        "output": "2",
        "explanation": "Jump 0->1 (1 step), then 1->4 (3 steps). Total 2 jumps."
      }
    ],
    "testCases": [
      {
        "input": "[2,3,1,1,4]",
        "expectedOutput": "2",
        "isHidden": false
      },
      {
        "input": "[2,3,0,1,4]",
        "expectedOutput": "2",
        "isHidden": false
      },
      {
        "input": "[1,2,3]",
        "expectedOutput": "2",
        "isHidden": true
      }
    ],
    "hints": [
      "This can be solved with a Greedy approach, similar to 'Jump Game I', but you need to count jumps.",
      "This is like a BFS on an array. The first 'jump' (level 0) can reach indices `[1, nums[0]]`. The second 'jump' (level 1) can reach indices from all nodes in level 0.",
      "Maintain two variables: `currentReach` (the farthest index you can get to with the *current* number of jumps) and `maxReach` (the farthest index you can get to with the *next* jump).",
      "Iterate through the array. Update `maxReach = max(maxReach, i + nums[i])`.",
      "When your index `i` *reaches* `currentReach`, it means you've completed a 'jump'. Increment your `jumps` counter and set `currentReach = maxReach` (this starts the next 'jump')."
    ],
    "solutions": [
      {
        "language": "javascript",
        "code": "var jump = function(nums) {\n    let jumps = 0;\n    let currentReach = 0; // The end of the range for the current jump\n    let maxReach = 0;     // The farthest we can reach with the *next* jump\n\n    // We don't need to check the last element\n    for (let i = 0; i < nums.length - 1; i++) {\n        // Update the max reach from the current position\n        maxReach = Math.max(maxReach, i + nums[i]);\n\n        // If we've reached the end of our *current* jump's range\n        if (i === currentReach) {\n            // We must make a new jump\n            jumps++;\n            // The new jump's range ends at the maxReach we've been tracking\n            currentReach = maxReach;\n\n            // If the new range already covers the end, we can stop early\n            if (currentReach >= nums.length - 1) {\n                break;\n            }\n        }\n    }\n\n    return jumps;\n};",
        "explanation": "This is a Greedy O(n) solution. We use `jumps` to count the jumps. `currentReach` marks the farthest index we can get to with our *current* number of jumps. `maxReach` tracks the farthest index we *could* get to by jumping from any of the indices within the current range. We iterate through the array. In each step, we update `maxReach`. The key is the check `if (i === currentReach)`. This means we have reached the end of our current 'jump' and must perform another one. We increment `jumps` and set our new `currentReach` to the `maxReach` we found during the last 'jump'.",
        "timeComplexity": "O(n)",
        "spaceComplexity": "O(1)"
      }
    ],
    "acceptanceRate": 38.2,
    "totalSubmissions": 10000,
    "correctSubmissions": 3820,
    "averageTime": 18
  },
  {
    "title": "Permutation in String",
    "description": "Given two strings `s1` and `s2`, return `true` if `s2` contains a permutation of `s1`, or `false` otherwise.\n\nIn other words, return `true` if one of `s1`'s permutations is the substring of `s2`.\n\n**Example 1:**\nInput: s1 = \"ab\", s2 = \"eidbaooo\"\nOutput: true\nExplanation: s2 contains one permutation of s1 (\"ba\").\n\n**Example 2:**\nInput: s1 = \"ab\", s2 = \"eidboaoo\"\nOutput: false\n\n**Constraints:**\n- 1 <= s1.length, s2.length <= 10^4\n- `s1` and `s2` consist of lowercase English letters.",
    "difficulty": "medium",
    "topics": [
      "String",
      "Sliding Window",
      "Hash Table"
    ],
    "companies": [
      "Microsoft",
      "Amazon",
      "Facebook",
      "Google"
    ],
    "constraints": [
      "1 <= s1.length, s2.length <= 10^4",
      "s1 and s2 consist of lowercase English letters."
    ],
    "examples": [
      {
        "input": "s1 = \"ab\", s2 = \"eidbaooo\"",
        "output": "true",
        "explanation": "The substring \"ba\" in s2 is a permutation of s1."
      },
      {
        "input": "s1 = \"ab\", s2 = \"eidboaoo\"",
        "output": "false",
        "explanation": "No substring of s2 is a permutation of s1."
      }
    ],
    "testCases": [
      {
        "input": "\"ab\"\n\"eidbaooo\"",
        "expectedOutput": "true",
        "isHidden": false
      },
      {
        "input": "\"ab\"\n\"eidboaoo\"",
        "expectedOutput": "false",
        "isHidden": false
      },
      {
        "input": "\"adc\"\n\"dcda\"",
        "expectedOutput": "true",
        "isHidden": true
      }
    ],
    "hints": [
      "This is a Sliding Window problem.",
      "The window size is fixed: `s1.length`.",
      "First, create a frequency map (or 26-char array) for `s1` (`s1Map`).",
      "Create another map for the first window in `s2` (`windowMap`).",
      "Compare the maps. If they are equal, return `true`.",
      "Slide the window: Add the new character (`s2[right]`) to `windowMap` and remove the old character (`s2[left]`) from `windowMap`.",
      "After each slide, compare the `windowMap` with the `s1Map`. If they ever match, return `true`."
    ],
    "solutions": [
      {
        "language": "javascript",
        "code": "var checkInclusion = function(s1, s2) {\n    if (s1.length > s2.length) {\n        return false;\n    }\n\n    const s1Counts = new Array(26).fill(0);\n    const windowCounts = new Array(26).fill(0);\n    const baseCode = 'a'.charCodeAt(0);\n\n    // Populate s1Counts and the first window\n    for (let i = 0; i < s1.length; i++) {\n        s1Counts[s1.charCodeAt(i) - baseCode]++;\n        windowCounts[s2.charCodeAt(i) - baseCode]++;\n    }\n\n    // Check if the first window is a match\n    if (s1Counts.join('') === windowCounts.join('')) {\n        return true;\n    }\n\n    // Slide the window\n    for (let i = s1.length; i < s2.length; i++) {\n        // Add the new character (right side)\n        windowCounts[s2.charCodeAt(i) - baseCode]++;\n        // Remove the old character (left side)\n        const leftCharIndex = i - s1.length;\n        windowCounts[s2.charCodeAt(leftCharIndex) - baseCode]--;\n\n        // Check for a match\n        if (s1Counts.join('') === windowCounts.join('')) {\n            return true;\n        }\n    }\n\n    return false;\n};",
        "explanation": "This solution uses a sliding window with two frequency arrays (of size 26, for 'a'-'z'). `s1Counts` stores the character frequencies for `s1`. `windowCounts` stores frequencies for the current window in `s2`. We first initialize both arrays for the first window (length `s1.length`). We check if they match. If not, we slide the window one character at a time. In each slide, we increment the count for the new character entering the window (at index `i`) and decrement the count for the character leaving the window (at index `i - s1.length`). After each slide, we compare the arrays. Comparing arrays by joining them to strings is a simple (though not most performant) way to check for equality. If a match is found, we return `true`.",
        "timeComplexity": "O(n)",
        "spaceComplexity": "O(1)"
      }
    ],
    "acceptanceRate": 43.6,
    "totalSubmissions": 9000,
    "correctSubmissions": 3924,
    "averageTime": 23
  },
  {
    "title": "Counting Bits",
    "description": "Given an integer `n`, return an array `ans` of length `n + 1` such that for each `i` (0 <= i <= n), `ans[i]` is the number of **1's** in the binary representation of `i`.\n\n**Example 1:**\nInput: n = 2\nOutput: [0,1,1]\nExplanation:\n0 --> 0\n1 --> 1\n2 --> 10\n\n**Example 2:**\nInput: n = 5\nOutput: [0,1,1,2,1,2]\nExplanation:\n0 --> 0\n1 --> 1\n2 --> 10\n3 --> 11\n4 --> 100\n5 --> 101\n\n**Constraints:**\n- 0 <= n <= 10^5",
    "difficulty": "easy",
    "topics": [
      "Dynamic Programming",
      "Bit Manipulation"
    ],
    "companies": [
      "Amazon",
      "Apple",
      "Facebook"
    ],
    "constraints": [
      "0 <= n <= 10^5"
    ],
    "examples": [
      {
        "input": "n = 2",
        "output": "[0,1,1]",
        "explanation": "0 (0), 1 (1), 2 (10)"
      },
      {
        "input": "n = 5",
        "output": "[0,1,1,2,1,2]",
        "explanation": "0 (0), 1 (1), 2 (10), 3 (11), 4 (100), 5 (101)"
      }
    ],
    "testCases": [
      {
        "input": "2",
        "expectedOutput": "[0,1,1]",
        "isHidden": false
      },
      {
        "input": "5",
        "expectedOutput": "[0,1,1,2,1,2]",
        "isHidden": false
      },
      {
        "input": "0",
        "expectedOutput": "[0]",
        "isHidden": true
      }
    ],
    "hints": [
      "A simple solution is to loop from 0 to n and, for each `i`, count its bits. This is O(n log n). Can you do O(n)?",
      "Look for a pattern or recurrence relation. This is a DP problem.",
      "Consider `i` and `i / 2` (or `i >> 1`). The bits of `i` are the same as the bits of `i >> 1`, plus one more bit (the last bit).",
      "The number of 1s in `i` is `(number of 1s in i >> 1) + (i % 2)`.",
      "So, `dp[i] = dp[i >> 1] + (i & 1)`."
    ],
    "solutions": [
      {
        "language": "javascript",
        "code": "var countBits = function(n) {\n    // Create a DP array of size n + 1\n    const dp = new Array(n + 1).fill(0);\n\n    // dp[0] is already 0\n    \n    for (let i = 1; i <= n; i++) {\n        // The number of 1s in 'i' is the number of 1s in 'i / 2'\n        // plus the last bit of 'i'.\n        // 'i >> 1' is integer division by 2\n        // 'i & 1' gets the last bit (0 or 1)\n        dp[i] = dp[i >> 1] + (i & 1);\n    }\n\n    return dp;\n};",
        "explanation": "This solution uses Dynamic Programming and Bit Manipulation. We create a `dp` array where `dp[i]` will store the number of 1-bits in `i`. The base case `dp[0] = 0` is set. We then iterate from 1 to `n`. The key recurrence relation is `dp[i] = dp[i >> 1] + (i & 1)`. This works because `i >> 1` (right shift by 1) is the same as `i` with its last bit removed. So, the bit count of `i` is just the bit count of `(i >> 1)` plus whatever the last bit was. The last bit is found using `(i & 1)` (which is 1 if `i` is odd, 0 if even).",
        "timeComplexity": "O(n)",
        "spaceComplexity": "O(n)"
      }
    ],
    "acceptanceRate": 73.1,
    "totalSubmissions": 10000,
    "correctSubmissions": 7310,
    "averageTime": 14
  },
  {
    "title": "Find K Closest Elements",
    "description": "Given a sorted integer array `arr`, two integers `k` and `x`, return the `k` closest integers to `x` in the array. The result should also be sorted in ascending order.\n\nAn integer `a` is closer to `x` than an integer `b` if:\n- `|a - x| < |b - x|`, or\n- `|a - x| == |b - x|` and `a < b`\n\n**Example 1:**\nInput: arr = [1,2,3,4,5], k = 4, x = 3\nOutput: [1,2,3,4]\n\n**Example 2:**\nInput: arr = [1,2,3,4,5], k = 4, x = -1\nOutput: [1,2,3,4]\n\n**Constraints:**\n- 1 <= k <= arr.length\n- 1 <= arr.length <= 10^4\n- `arr` is sorted in ascending order.\n- -10^4 <= arr[i], x <= 10^4",
    "difficulty": "medium",
    "topics": [
      "Array",
      "Binary Search",
      "Heap",
      "Two Pointers"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Facebook",
      "Microsoft"
    ],
    "constraints": [
      "1 <= k <= arr.length",
      "1 <= arr.length <= 10^4",
      "arr is sorted in ascending order.",
      "-10^4 <= arr[i], x <= 10^4"
    ],
    "examples": [
      {
        "input": "arr = [1,2,3,4,5], k = 4, x = 3",
        "output": "[1,2,3,4]",
        "explanation": "The 4 closest elements to 3 are 3, 2, 4, 1."
      },
      {
        "input": "arr = [1,2,3,4,5], k = 4, x = -1",
        "output": "[1,2,3,4]",
        "explanation": "The 4 closest elements to -1 are 1, 2, 3, 4."
      }
    ],
    "testCases": [
      {
        "input": "[1,2,3,4,5]\n4\n3",
        "expectedOutput": "[1,2,3,4]",
        "isHidden": false
      },
      {
        "input": "[1,2,3,4,5]\n4\n-1",
        "expectedOutput": "[1,2,3,4]",
        "isHidden": false
      },
      {
        "input": "[0,0,1,2,3,3,4,7,7,8]\n3\n5",
        "expectedOutput": "[3,3,4]",
        "isHidden": true
      }
    ],
    "hints": [
      "A simple solution is to sort the array by `abs(a - x)`. This is O(n log n).",
      "A better solution uses Binary Search to find the 'starting point' of the `k`-element window.",
      "The problem is to find the *best* starting index `i` for a window of size `k` (from `i` to `i + k - 1`).",
      "Binary search for `i` in the range `[0, arr.length - k]`. This is the range of all possible *starting* indices.",
      "In the binary search, compare `x - arr[mid]` (distance from `x` to the *start* of the window) with `arr[mid + k] - x` (distance from `x` to the *end* of the window + 1).",
      "If `x - arr[mid]` is *greater* than `arr[mid + k] - x`, it means the window is too far left (the element *outside* the right is closer than the element *at* the left). Move the window right: `left = mid + 1`."
    ],
    "solutions": [
      {
        "language": "javascript",
        "code": "var findClosestElements = function(arr, k, x) {\n    // Binary search to find the *start* of the k-sized window\n    // The window can start from index 0 up to arr.length - k\n    let left = 0;\n    let right = arr.length - k;\n    let mid = 0;\n\n    while (left < right) {\n        mid = Math.floor((left + right) / 2);\n        \n        // Compare the distance from x to the start of the window (arr[mid])\n        // with the distance from x to the element *just outside* the\n        // end of the window (arr[mid + k])\n        if (x - arr[mid] > arr[mid + k] - x) {\n            // The window is too far left. The elements on the right\n            // (like arr[mid+k]) are closer.\n            left = mid + 1;\n        } else {\n            // The window is either perfect or too far right.\n            // We prefer the left-most window in a tie.\n            right = mid;\n        }\n    }\n\n    // 'left' is now the optimal starting index of the window\n    return arr.slice(left, left + k);\n};",
        "explanation": "This solution uses Binary Search to find the *optimal starting index* of the `k`-sized window. We search in the range of possible starting indices, from `0` to `arr.length - k`. In each step, we calculate `mid` (a potential start). We then compare the *leftmost* element in this window (`arr[mid]`) with the *first element outside* this window on the right (`arr[mid + k]`). Specifically, we check if `x` is closer to `arr[mid]` or `arr[mid + k]`. If `x` is *further* from `arr[mid]` than from `arr[mid + k]` (`x - arr[mid] > arr[mid + k] - x`), it means our window is too far to the left, so we move our search space right (`left = mid + 1`). Otherwise, this window is a good candidate (or is too far right), so we move our search space left (`right = mid`). The loop terminates when `left` is the optimal starting index.",
        "timeComplexity": "O(log(n-k) + k)",
        "spaceComplexity": "O(1)"
      }
    ],
    "acceptanceRate": 44.1,
    "totalSubmissions": 7000,
    "correctSubmissions": 3087,
    "averageTime": 21
  },
  {
    "title": "All Paths From Source to Target",
    "description": "Given a directed acyclic graph (DAG) of `n` nodes labeled from `0` to `n - 1`, find all possible paths from node `0` to node `n - 1`, and return them in any order.\n\nThe graph is given as follows: `graph[i]` is a list of all nodes you can visit from node `i` (i.e., there is a directed edge from `i` to `graph[i][j]`).\n\n**Example 1:**\nInput: graph = [[1,2],[3],[3],[]]\nOutput: [[0,1,3],[0,2,3]]\nExplanation: There are two paths: 0 -> 1 -> 3 and 0 -> 2 -> 3.\n\n**Example 2:**\nInput: graph = [[4,3,1],[3,2,4],[3],[4],[]]\nOutput: [[0,4],[0,3,4],[0,1,3,4],[0,1,2,3,4],[0,1,4]]\n\n**Constraints:**\n- n == graph.length\n- 2 <= n <= 15\n- 0 <= graph[i][j] < n\n- graph[i][j] != i (no self-loops)\n- All the elements of `graph[i]` are unique.\n- The graph is guaranteed to be a DAG.",
    "difficulty": "medium",
    "topics": [
      "Graph",
      "Depth-First Search",
      "Backtracking"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Microsoft",
      "Facebook"
    ],
    "constraints": [
      "n == graph.length",
      "2 <= n <= 15",
      "graph[i][j] != i",
      "All elements of graph[i] are unique.",
      "The graph is guaranteed to be a DAG."
    ],
    "examples": [
      {
        "input": "graph = [[1,2],[3],[3],[]]",
        "output": "[[0,1,3],[0,2,3]]",
        "explanation": "Two paths exist: 0->1->3 and 0->2->3."
      },
      {
        "input": "graph = [[4,3,1],[3,2,4],[3],[4],[]]",
        "output": "[[0,4],[0,3,4],[0,1,3,4],[0,1,2,3,4],[0,1,4]]",
        "explanation": "Multiple paths from 0 to 4."
      }
    ],
    "testCases": [
      {
        "input": "[[1,2],[3],[3],[]]",
        "expectedOutput": "[[0,1,3],[0,2,3]]",
        "isHidden": false
      },
      {
        "input": "[[4,3,1],[3,2,4],[3],[4],[]]",
        "expectedOutput": "[[0,4],[0,3,4],[0,1,3,4],[0,1,2,3,4],[0,1,4]]",
        "isHidden": false
      }
    ],
    "hints": [
      "This is a classic graph traversal problem.",
      "Use Depth-First Search (DFS) with backtracking.",
      "Start a DFS from node `0`. Maintain a `currentPath` list.",
      "The DFS function will take the `currentNode`.",
      "Base Case: If `currentNode == n - 1` (the target), you've found a valid path. Add a *copy* of `currentPath` to your `results` list and return.",
      "Recursive Step: For each `neighbor` of `currentNode` (from `graph[currentNode]`):\n  1. Add `neighbor` to `currentPath`.\n  2. Recursively call `dfs(neighbor)`.\n  3. **Backtrack**: Remove `neighbor` from `currentPath`."
    ],
    "solutions": [
      {
        "language": "javascript",
        "code": "var allPathsSourceTarget = function(graph) {\n    const target = graph.length - 1;\n    const results = [];\n\n    // 'path' will store the nodes in the current path\n    function backtrack(currentNode, path) {\n        // Base Case: We've reached the target\n        if (currentNode === target) {\n            // Add a *copy* of the path to results\n            results.push([...path]);\n            return;\n        }\n\n        // Recursive Step: Explore neighbors\n        for (const neighbor of graph[currentNode]) {\n            // 1. Choose (add to path)\n            path.push(neighbor);\n            \n            // 2. Explore\n            backtrack(neighbor, path);\n            \n            // 3. Unchoose (backtrack)\n            path.pop();\n        }\n    }\n\n    // Start the search from node 0 with the initial path [0]\n    backtrack(0, [0]);\n\n    return results;\n};",
        "explanation": "This solution uses Depth-First Search (DFS) with backtracking. We maintain a `results` array to store all valid paths. The `backtrack` function takes the `currentNode` and the `path` taken so far. The base case is when `currentNode === target`. At this point, we've found a complete path, so we add a *copy* of the `path` to our `results`. In the recursive step, we iterate through all `neighbor` nodes of the `currentNode`. For each neighbor, we 1. 'Choose' it by pushing it onto the `path`, 2. 'Explore' by making a recursive call `backtrack(neighbor, path)`, and 3. 'Unchoose' it by popping it from the `path`. This `pop()` is the backtracking step that allows us to explore other branches.",
        "timeComplexity": "O(2^n * n)",
        "spaceComplexity": "O(2^n * n)"
      }
    ],
    "acceptanceRate": 79.5,
    "totalSubmissions": 5000,
    "correctSubmissions": 3975,
    "averageTime": 16
  },
  {
    "title": "Word Break II",
    "description": "Given a string `s` and a dictionary of strings `wordDict`, add spaces in `s` to construct a sentence where each word is a valid dictionary word. Return all such possible sentences in any order.\n\nNote that the same word in the dictionary may be reused multiple times in the segmentation.\n\n**Example 1:**\nInput: s = \"catsanddog\", wordDict = [\"cat\",\"cats\",\"and\",\"sand\",\"dog\"]\nOutput: [\"cats and dog\", \"cat sand dog\"]\n\n**Example 2:**\nInput: s = \"pineapplepenapple\", wordDict = [\"apple\",\"pen\",\"applepen\",\"pine\",\"pineapple\"]\nOutput: [\"pine apple pen apple\", \"pineapple pen apple\", \"pine applepen apple\"]\n\n**Example 3:**\nInput: s = \"catsandog\", wordDict = [\"cats\",\"dog\",\"sand\",\"and\",\"cat\"]\nOutput: []\n\n**Constraints:**\n- 1 <= s.length <= 20\n- 1 <= wordDict.length <= 1000\n- 1 <= wordDict[i].length <= 10\n- `s` and `wordDict[i]` consist of only lowercase English letters.\n- All strings of `wordDict` are **unique**.",
    "difficulty": "hard",
    "topics": [
      "Dynamic Programming",
      "Backtracking",
      "Trie"
    ],
    "companies": [
      "Amazon",
      "Facebook",
      "Google",
      "Uber"
    ],
    "constraints": [
      "1 <= s.length <= 20",
      "1 <= wordDict.length <= 1000",
      "1 <= wordDict[i].length <= 10",
      "All strings in wordDict are unique."
    ],
    "examples": [
      {
        "input": "s = \"catsanddog\", wordDict = [\"cat\",\"cats\",\"and\",\"sand\",\"dog\"]",
        "output": "[\"cats and dog\", \"cat sand dog\"]",
        "explanation": "Two valid segmentations exist."
      },
      {
        "input": "s = \"catsandog\", wordDict = [\"cats\",\"dog\",\"sand\",\"and\",\"cat\"]",
        "output": "[]",
        "explanation": "No valid segmentation."
      }
    ],
    "testCases": [
      {
        "input": "\"catsanddog\"\n[\"cat\",\"cats\",\"and\",\"sand\",\"dog\"]",
        "expectedOutput": "[\"cat sand dog\",\"cats and dog\"]",
        "isHidden": false
      },
      {
        "input": "\"pineapplepenapple\"\n[\"apple\",\"pen\",\"applepen\",\"pine\",\"pineapple\"]",
        "expectedOutput": "[\"pine apple pen apple\",\"pine applepen apple\",\"pineapple pen apple\"]",
        "isHidden": false
      },
      {
        "input": "\"aaaaaaa\"\n[\"aaaa\",\"aaa\"]",
        "expectedOutput": "[\"aaa aaaa\",\"aaaa aaa\"]",
        "isHidden": true
      }
    ],
    "hints": [
      "This is a follow-up to 'Word Break I'. While DP can tell you *if* a break is possible, you need backtracking to find *all* breaks.",
      "Use Depth-First Search (DFS) with Memoization.",
      "Create a recursive function `dfs(startIndex)` that returns a *list* of all valid sentences that can be formed from `s[startIndex...]`.",
      "Use a memoization map `memo[startIndex] -> listOfSentences` to avoid re-computing.",
      "In `dfs(i)`: Iterate `j` from `i` to `n`. Check if the substring `s[i...j]` is in the `wordDict`.",
      "If it is, this is a valid 'first word'. Recursively call `dfs(j + 1)` to get all 'tails' (e.g., [\"sand dog\"]).",
      "For each `tail` returned, prepend the `first word` (e.g., \"cat \" + \"sand dog\") and add it to the result list for `dfs(i)`.",
      "The base case is `dfs(n)`, which should return a list containing an empty string `[\"\"]` so that the final word can be prepended."
    ],
    "solutions": [
      {
        "language": "javascript",
        "code": "var wordBreak = function(s, wordDict) {\n    const wordSet = new Set(wordDict);\n    // memo[i] stores the list of valid sentences for s.substring(i)\n    const memo = new Map();\n\n    /**\n     * @param {number} startIndex\n     * @returns {string[]} - A list of valid sentences.\n     */\n    function dfs(startIndex) {\n        // Check memoization cache\n        if (memo.has(startIndex)) {\n            return memo.get(startIndex);\n        }\n        \n        // Base case: Reached the end of the string\n        if (startIndex === s.length) {\n            // Return a list with an empty string, to act as a 'terminator'\n            return [\"\"];\n        }\n\n        const sentences = [];\n        for (let endIndex = startIndex + 1; endIndex <= s.length; endIndex++) {\n            const word = s.substring(startIndex, endIndex);\n\n            if (wordSet.has(word)) {\n                // This is a valid word. Find all possible 'tails'.\n                const tails = dfs(endIndex);\n\n                // Prepend the current word to each tail\n                for (const tail of tails) {\n                    if (tail === \"\") {\n                        // This is the last word, no space needed\n                        sentences.push(word);\n                    } else {\n                        sentences.push(word + \" \" + tail);\n                    }\n                }\n            }\n        }\n\n        // Cache the result and return\n        memo.set(startIndex, sentences);\n        return sentences;\n    }\n\n    return dfs(0);\n};",
        "explanation": "This solution uses Depth-First Search (DFS) with memoization. The `dfs(startIndex)` function returns an array of all valid sentences that can be formed from `s.substring(startIndex)`. We use a `memo` map to store the results for each `startIndex` to avoid redundant computations. The function iterates from `startIndex` to the end, checking every possible substring. If a substring `word` is found in the `wordSet`, it recursively calls `dfs` on the *rest* of the string (`dfs(endIndex)`). This recursive call returns a list of 'tails' (all possible sentences for the rest of the string). We then prepend our `word` (and a space) to each tail and add it to our `sentences` list. The base case `startIndex === s.length` returns `[\"\"]` (an array with an empty string) to allow the final word to be correctly appended.",
        "timeComplexity": "O(n^3)",
        "spaceComplexity": "O(n^3)"
      }
    ],
    "acceptanceRate": 43.1,
    "totalSubmissions": 6000,
    "correctSubmissions": 2586,
    "averageTime": 30
  },
  {
    "title": "Set Matrix Zeroes",
    "description": "Given an `m x n` integer matrix `matrix`, if an element is 0, set its entire row and column to 0's.\n\nYou must do it in-place.\n\n**Example 1:**\nInput: matrix = [[1,1,1],[1,0,1],[1,1,1]]\nOutput: [[1,0,1],[0,0,0],[1,0,1]]\n\n**Example 2:**\nInput: matrix = [[0,1,2,0],[3,4,5,2],[1,3,1,5]]\nOutput: [[0,0,0,0],[0,4,5,0],[0,3,1,0]]\n\n**Constraints:**\n- m == matrix.length\n- n == matrix[0].length\n- 1 <= m, n <= 200\n- -2^31 <= matrix[i][j] <= 2^31 - 1",
    "difficulty": "medium",
    "topics": [
      "Array",
      "Matrix",
      "Hash Table"
    ],
    "companies": [
      "Amazon",
      "Microsoft",
      "Facebook",
      "Apple"
    ],
    "constraints": [
      "m == matrix.length",
      "n == matrix[0].length",
      "1 <= m, n <= 200",
      "Must be done in-place."
    ],
    "examples": [
      {
        "input": "matrix = [[1,1,1],[1,0,1],[1,1,1]]",
        "output": "[[1,0,1],[0,0,0],[1,0,1]]",
        "explanation": "The 0 at (1,1) zeroes out the 2nd row and 2nd column."
      },
      {
        "input": "matrix = [[0,1,2,0],[3,4,5,2],[1,3,1,5]]",
        "output": "[[0,0,0,0],[0,4,5,0],[0,3,1,0]]",
        "explanation": "The 0s at (0,0) and (0,3) cause the 1st row and 1st/4th columns to be zeroed."
      }
    ],
    "testCases": [
      {
        "input": "[[1,1,1],[1,0,1],[1,1,1]]",
        "expectedOutput": "[[1,0,1],[0,0,0],[1,0,1]]",
        "isHidden": false
      },
      {
        "input": "[[0,1,2,0],[3,4,5,2],[1,3,1,5]]",
        "expectedOutput": "[[0,0,0,0],[0,4,5,0],[0,3,1,0]]",
        "isHidden": false
      }
    ],
    "hints": [
      "A simple solution uses O(m + n) extra space to store which rows and columns to zero out.",
      "To achieve O(1) extra space, can you use the matrix itself as storage?",
      "Use the first row and first column to store the 'zero' flags. Use two boolean variables to track if the first row/column *themselves* need to be zeroed.",
      "Iterate from (1,1) to (m-1, n-1). If `matrix[i][j] == 0`, set `matrix[i][0] = 0` and `matrix[0][j] = 0`.",
      "Then, iterate again, zeroing out rows/columns based on the flags in the first row/column.",
      "Finally, zero out the first row/column if their boolean flags were set."
    ],
    "solutions": [
      {
        "language": "javascript",
        "code": "var setZeroes = function(matrix) {\n    const ROWS = matrix.length;\n    const COLS = matrix[0].length;\n    let firstRowHasZero = false;\n    let firstColHasZero = false;\n\n    // 1. Check if the first row/col have zeroes\n    for (let j = 0; j < COLS; j++) {\n        if (matrix[0][j] === 0) firstRowHasZero = true;\n    }\n    for (let i = 0; i < ROWS; i++) {\n        if (matrix[i][0] === 0) firstColHasZero = true;\n    }\n\n    // 2. Use first row/col as markers for the rest\n    for (let i = 1; i < ROWS; i++) {\n        for (let j = 1; j < COLS; j++) {\n            if (matrix[i][j] === 0) {\n                matrix[i][0] = 0;\n                matrix[0][j] = 0;\n            }\n        }\n    }\n\n    // 3. Zero out based on markers (skip first row/col)\n    for (let i = 1; i < ROWS; i++) {\n        for (let j = 1; j < COLS; j++) {\n            if (matrix[i][0] === 0 || matrix[0][j] === 0) {\n                matrix[i][j] = 0;\n            }\n        }\n    }\n\n    // 4. Zero out first row/col if needed\n    if (firstRowHasZero) {\n        for (let j = 0; j < COLS; j++) matrix[0][j] = 0;\n    }\n    if (firstColHasZero) {\n        for (let i = 0; i < ROWS; i++) matrix[i][0] = 0;\n    }\n};",
        "explanation": "This O(1) space solution uses the first row and first column of the matrix as storage. It first checks if the first row and column *themselves* contain any zeros, storing this in two boolean flags. Then, it iterates through the rest of the matrix (`(1,1)` to `(m-1,n-1)`) and if it finds a zero, it 'marks' the corresponding first row and first column cells. After marking, it iterates through the rest of the matrix again, setting `matrix[i][j]` to 0 if its corresponding marker in the first row or column is 0. Finally, it uses the boolean flags from step 1 to zero out the first row and column if necessary.",
        "timeComplexity": "O(m * n)",
        "spaceComplexity": "O(1)"
      }
    ],
    "acceptanceRate": 45.1,
    "totalSubmissions": 11000,
    "correctSubmissions": 4961,
    "averageTime": 22
  },
  {
    "title": "Sort Colors",
    "description": "Given an array `nums` with `n` objects colored red, white, or blue, sort them in-place so that objects of the same color are adjacent, with the colors in the order red, white, and blue.\n\nWe will use the integers 0, 1, and 2 to represent the color red, white, and blue, respectively.\n\nYou must solve this problem without using the library's sort function.\n\n**Example 1:**\nInput: nums = [2,0,2,1,1,0]\nOutput: [0,0,1,1,2,2]\n\n**Example 2:**\nInput: nums = [2,0,1]\nOutput: [0,1,2]\n\n**Constraints:**\n- n == nums.length\n- 1 <= n <= 300\n- nums[i] is 0, 1, or 2.",
    "difficulty": "medium",
    "topics": [
      "Array",
      "Two Pointers",
      "Sorting"
    ],
    "companies": [
      "Microsoft",
      "Facebook",
      "Amazon",
      "Google"
    ],
    "constraints": [
      "n == nums.length",
      "1 <= n <= 300",
      "nums[i] is 0, 1, or 2.",
      "Must be in-place."
    ],
    "examples": [
      {
        "input": "nums = [2,0,2,1,1,0]",
        "output": "[0,0,1,1,2,2]",
        "explanation": "All 0s (red) come first, then 1s (white), then 2s (blue)."
      }
    ],
    "testCases": [
      {
        "input": "[2,0,2,1,1,0]",
        "expectedOutput": "[0,0,1,1,2,2]",
        "isHidden": false
      },
      {
        "input": "[2,0,1]",
        "expectedOutput": "[0,1,2]",
        "isHidden": false
      },
      {
        "input": "[1,2,0]",
        "expectedOutput": "[0,1,2]",
        "isHidden": true
      }
    ],
    "hints": [
      "A simple solution is a two-pass counting sort. First, count the number of 0s, 1s, and 2s, then overwrite the array.",
      "Can you do it in a single pass using only constant space?",
      "This is the 'Dutch National Flag' problem. Use three pointers: `low`, `mid`, and `high`.",
      "Initialize `low = 0`, `mid = 0`, `high = n - 1`.",
      "Iterate while `mid <= high`. If `nums[mid] == 0`, swap `nums[low]` with `nums[mid]` and increment both `low` and `mid`.",
      "If `nums[mid] == 1`, just increment `mid`.",
      "If `nums[mid] == 2`, swap `nums[mid]` with `nums[high]` and decrement `high`. (Do not increment `mid` here, as the swapped element needs to be processed)."
    ],
    "solutions": [
      {
        "language": "javascript",
        "code": "var sortColors = function(nums) {\n    let low = 0;\n    let mid = 0;\n    let high = nums.length - 1;\n\n    const swap = (i, j) => {\n        [nums[i], nums[j]] = [nums[j], nums[i]];\n    };\n\n    while (mid <= high) {\n        if (nums[mid] === 0) {\n            // Found a 0 (red), move to the low partition\n            swap(low, mid);\n            low++;\n            mid++;\n        } else if (nums[mid] === 1) {\n            // Found a 1 (white), it's in the right place, move on\n            mid++;\n        } else {\n            // Found a 2 (blue), move to the high partition\n            swap(mid, high);\n            high--;\n            // Note: We don't increment mid, because the element we swapped\n            // from 'high' could be a 0 or 1 and needs to be processed.\n        }\n    }\n};",
        "explanation": "This solution uses the one-pass Dutch National Flag algorithm. It maintains three partitions using three pointers: `low`, `mid`, and `high`. The `low` pointer tracks the end of the '0' partition. The `high` pointer tracks the beginning of the '2' partition. The `mid` pointer iterates through the array. When `nums[mid]` is 0, it's swapped with `nums[low]` and both `low` and `mid` advance. When `nums[mid]` is 1, it's already in the correct partition, so only `mid` advances. When `nums[mid]` is 2, it's swapped with `nums[high]` and `high` is decremented (but `mid` is not, as the new `nums[mid]` needs to be checked).",
        "timeComplexity": "O(n)",
        "spaceComplexity": "O(1)"
      }
    ],
    "acceptanceRate": 53.9,
    "totalSubmissions": 14000,
    "correctSubmissions": 7546,
    "averageTime": 13
  },
  {
    "title": "Combination Sum",
    "description": "Given an array of **distinct** integers `candidates` and a `target` integer, return a list of all **unique combinations** of `candidates` where the chosen numbers sum to `target`. You may return the combinations in any order.\n\nThe same number may be chosen from `candidates` an **unlimited number of times**. Two combinations are unique if the frequency of at least one of the chosen numbers is different.\n\n**Example 1:**\nInput: candidates = [2,3,6,7], target = 7\nOutput: [[2,2,3],[7]]\n\n**Example 2:**\nInput: candidates = [2,3,5], target = 8\nOutput: [[2,2,2,2],[2,3,3],[3,5]]\n\n**Constraints:**\n- 1 <= candidates.length <= 30\n- 1 <= candidates[i] <= 200\n- All elements of `candidates` are **distinct**.\n- 1 <= target <= 500",
    "difficulty": "medium",
    "topics": [
      "Array",
      "Backtracking"
    ],
    "companies": [
      "Amazon",
      "Facebook",
      "Uber",
      "Google"
    ],
    "constraints": [
      "1 <= candidates.length <= 30",
      "1 <= candidates[i] <= 200",
      "All elements of candidates are distinct.",
      "1 <= target <= 500"
    ],
    "examples": [
      {
        "input": "candidates = [2,3,6,7], target = 7",
        "output": "[[2,2,3],[7]]",
        "explanation": "2+2+3 = 7 and 7 = 7. These are the only two combinations."
      },
      {
        "input": "candidates = [2,3,5], target = 8",
        "output": "[[2,2,2,2],[2,3,3],[3,5]]",
        "explanation": "Multiple combinations using repeated numbers."
      }
    ],
    "testCases": [
      {
        "input": "[2,3,6,7]\n7",
        "expectedOutput": "[[2,2,3],[7]]",
        "isHidden": false
      },
      {
        "input": "[2,3,5]\n8",
        "expectedOutput": "[[2,2,2,2],[2,3,3],[3,5]]",
        "isHidden": false
      },
      {
        "input": "[2]\n1",
        "expectedOutput": "[]",
        "isHidden": true
      }
    ],
    "hints": [
      "This is a classic backtracking problem where you need to find all combinations.",
      "Define a recursive function `backtrack(startIndex, currentSum, currentPath)`.",
      "The base case: if `currentSum == target`, add a copy of `currentPath` to the results.",
      "Another base case: if `currentSum > target`, stop this path.",
      "Recursive step: Iterate `i` from `startIndex` to the end of `candidates`.",
      "1. 'Choose' `candidates[i]`: add it to `currentPath` and update `currentSum`.",
      "2. 'Explore': Recurse with `backtrack(i, newSum, currentPath)`. Note: `i` is passed, not `i+1`, because we can reuse the same number.",
      "3. 'Unchoose': Pop `candidates[i]` from `currentPath` (this is the backtracking)."
    ],
    "solutions": [
      {
        "language": "javascript",
        "code": "var combinationSum = function(candidates, target) {\n    const results = [];\n\n    function backtrack(startIndex, currentSum, currentPath) {\n        // Base case: Found a valid combination\n        if (currentSum === target) {\n            results.push([...currentPath]); // Add a copy\n            return;\n        }\n\n        // Base case: Exceeded target, prune this path\n        if (currentSum > target) {\n            return;\n        }\n\n        // Recursive step: Try all candidates from startIndex\n        for (let i = startIndex; i < candidates.length; i++) {\n            const num = candidates[i];\n            \n            // 1. Choose\n            currentPath.push(num);\n\n            // 2. Explore - Pass 'i' to allow reuse of the same number\n            backtrack(i, currentSum + num, currentPath);\n\n            // 3. Unchoose (Backtrack)\n            currentPath.pop();\n        }\n    }\n\n    backtrack(0, 0, []);\n    return results;\n};",
        "explanation": "This solution uses backtracking. The `backtrack` function explores all possible combinations. It takes a `startIndex` (to avoid duplicate combinations like `[2,3]` and `[3,2]`), the `currentSum`, and the `currentPath`. There are two base cases: if `currentSum === target`, we found a solution; if `currentSum > target`, we prune the search. In the recursive step, we loop from `startIndex`. We 'choose' a number by adding it to the path, then 'explore' by recursing. Crucially, we pass `i` (not `i+1`) to the recursive call, allowing the same number to be chosen again. After the call returns, we 'unchoose' the number by popping it, which is the backtracking step.",
        "timeComplexity": "O(N^(T/M + 1))",
        "spaceComplexity": "O(T/M)"
      }
    ],
    "acceptanceRate": 63.4,
    "totalSubmissions": 10000,
    "correctSubmissions": 6340,
    "averageTime": 25
  },
  {
    "title": "Subsets",
    "description": "Given an integer array `nums` of **unique** elements, return all possible subsets (the power set).\n\nThe solution set must not contain duplicate subsets. Return the solution in any order.\n\n**Example 1:**\nInput: nums = [1,2,3]\nOutput: [[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]\n\n**Example 2:**\nInput: nums = [0]\nOutput: [[],[0]]\n\n**Constraints:**\n- 1 <= nums.length <= 10\n- -10 <= nums[i] <= 10\n- All the numbers of `nums` are **unique**.",
    "difficulty": "medium",
    "topics": [
      "Array",
      "Backtracking",
      "Bit Manipulation"
    ],
    "companies": [
      "Amazon",
      "Facebook",
      "Google",
      "Microsoft"
    ],
    "constraints": [
      "1 <= nums.length <= 10",
      "-10 <= nums[i] <= 10",
      "All the numbers of nums are unique."
    ],
    "examples": [
      {
        "input": "nums = [1,2,3]",
        "output": "[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]",
        "explanation": "All possible combinations of elements, including the empty set."
      }
    ],
    "testCases": [
      {
        "input": "[1,2,3]",
        "expectedOutput": "[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]",
        "isHidden": false
      },
      {
        "input": "[0]",
        "expectedOutput": "[[],[0]]",
        "isHidden": false
      }
    ],
    "hints": [
      "This can be solved with a recursive backtracking approach.",
      "Define a function `backtrack(startIndex, currentSubset)`.",
      "First, add a copy of the `currentSubset` to the `results` (this adds all intermediate paths).",
      "Then, iterate `i` from `startIndex` to the end of `nums`.",
      "1. 'Choose' `nums[i]`: add it to `currentSubset`.",
      "2. 'Explore': Recurse with `backtrack(i + 1, currentSubset)`.",
      "3. 'Unchoose': Pop `nums[i]` from `currentSubset`.",
      "Another approach is 'cascading': Start with `results = [[]]`. Iterate through `nums`. For each `num`, create new subsets by adding `num` to all *existing* subsets in `results` and add these new subsets to `results`."
    ],
    "solutions": [
      {
        "language": "javascript",
        "code": "var subsets = function(nums) {\n    const results = [];\n    \n    function backtrack(startIndex, currentSubset) {\n        // Add a copy of the current subset at every step\n        results.push([...currentSubset]);\n\n        // Explore all choices from startIndex\n        for (let i = startIndex; i < nums.length; i++) {\n            // 1. Choose\n            currentSubset.push(nums[i]);\n\n            // 2. Explore (pass i + 1 since we can't reuse the same element)\n            backtrack(i + 1, currentSubset);\n\n            // 3. Unchoose (Backtrack)\n            currentSubset.pop();\n        }\n    }\n\n    backtrack(0, []);\n    return results;\n};",
        "explanation": "This solution uses backtracking. The `backtrack` function builds the subsets. At every call to `backtrack`, we *first* add a copy of the `currentSubset` to our `results`. This is because every path in our decision tree (e.g., `[]`, `[1]`, `[1,2]`) is a valid subset. Then, we loop from `startIndex` to the end. For each number, we 'choose' it (add to `currentSubset`), 'explore' by recursing with `i + 1` (to prevent reuse and duplicates), and then 'unchoose' it (pop it), allowing us to explore the path where we *don't* include that number.",
        "timeComplexity": "O(n * 2^n)",
        "spaceComplexity": "O(n)"
      }
    ],
    "acceptanceRate": 69.8,
    "totalSubmissions": 10000,
    "correctSubmissions": 6980,
    "averageTime": 15
  },
  {
    "title": "Remove Duplicates from Sorted Array",
    "description": "Given an integer array `nums` sorted in non-decreasing order, remove the duplicates in-place such that each unique element appears only once. The relative order of the elements should be kept the same.\n\nSince it is impossible to change the length of the array in some languages, you must instead have the result be placed in the **first part of the array `nums`**. More formally, if there are `k` elements after removing the duplicates, then the first `k` elements of `nums` should hold the final result. It does not matter what you leave beyond the first `k` elements.\n\nReturn `k` after placing the final result in the first `k` slots of `nums`.\n\n**Example 1:**\nInput: nums = [1,1,2]\nOutput: 2, nums = [1,2,_]\nExplanation: Your function should return k = 2, with the first two elements of nums being 1 and 2 respectively.\n\n**Example 2:**\nInput: nums = [0,0,1,1,1,2,2,3,3,4]\nOutput: 5, nums = [0,1,2,3,4,_,_,_,_,_]\n\n**Constraints:**\n- 0 <= nums.length <= 3 * 10^4\n- -100 <= nums[i] <= 100\n- `nums` is sorted in non-decreasing order.",
    "difficulty": "easy",
    "topics": [
      "Array",
      "Two Pointers"
    ],
    "companies": [
      "Amazon",
      "Microsoft",
      "Facebook",
      "Google"
    ],
    "constraints": [
      "0 <= nums.length <= 3 * 10^4",
      "nums is sorted in non-decreasing order."
    ],
    "examples": [
      {
        "input": "nums = [1,1,2]",
        "output": "2, nums = [1,2,_]",
        "explanation": "k=2. The first two elements are modified to 1, 2."
      },
      {
        "input": "nums = [0,0,1,1,1,2,2,3,3,4]",
        "output": "5, nums = [0,1,2,3,4,_,_,_,_,_]",
        "explanation": "k=5. The first five elements are modified to 0, 1, 2, 3, 4."
      }
    ],
    "testCases": [
      {
        "input": "[1,1,2]",
        "expectedOutput": "2",
        "isHidden": false
      },
      {
        "input": "[0,0,1,1,1,2,2,3,3,4]",
        "expectedOutput": "5",
        "isHidden": false
      },
      {
        "input": "[]",
        "expectedOutput": "0",
        "isHidden": true
      }
    ],
    "hints": [
      "This problem must be solved in-place with O(1) extra memory.",
      "Use a 'Two Pointer' approach.",
      "One pointer (`writeIndex` or `k`) will track the position where the next unique element should be written.",
      "The other pointer (`readIndex` or `i`) will iterate through the array.",
      "Initialize `writeIndex = 1`. Start iterating with `readIndex` from 1.",
      "If `nums[readIndex]` is *different* from `nums[readIndex - 1]`, it's a new unique element.",
      "In that case, write this element to `nums[writeIndex]` and increment `writeIndex`.",
      "Return `writeIndex` at the end."
    ],
    "solutions": [
      {
        "language": "javascript",
        "code": "var removeDuplicates = function(nums) {\n    if (nums.length === 0) {\n        return 0;\n    }\n\n    // 'k' is the 'write pointer'. It tracks the index \n    // where the next unique element should be placed.\n    let k = 1;\n\n    // 'i' is the 'read pointer'.\n    for (let i = 1; i < nums.length; i++) {\n        // If we find a new, unique element...\n        if (nums[i] !== nums[i - 1]) {\n            // ...write it to the 'k' position and advance 'k'.\n            nums[k] = nums[i];\n            k++;\n        }\n        // If nums[i] === nums[i-1], we do nothing but advance 'i' (the loop does this).\n    }\n\n    // 'k' is the length of the new unique array.\n    return k;\n};",
        "explanation": "This solution uses a two-pointer approach, often called 'read' and 'write' pointers, to modify the array in-place. We initialize a 'write pointer' `k` to 1 (since the first element `nums[0]` is always unique and in its correct place). We then iterate through the array with a 'read pointer' `i` starting from 1. We compare `nums[i]` with the previous element `nums[i-1]`. If they are *different*, it means `nums[i]` is a new unique element. We then 'write' this element to `nums[k]` and increment `k`. If the elements are the same, we do nothing and just continue iterating with `i`, effectively skipping the duplicate. The final value of `k` is the count of unique elements.",
        "timeComplexity": "O(n)",
        "spaceComplexity": "O(1)"
      }
    ],
    "acceptanceRate": 48.9,
    "totalSubmissions": 15000,
    "correctSubmissions": 7335,
    "averageTime": 11
  },
  {
    "title": "Search a 2D Matrix",
    "description": "Write an efficient algorithm that searches for a value `target` in an `m x n` integer matrix `matrix`. This matrix has the following properties:\n\n- Integers in each row are sorted from left to right.\n- The first integer of each row is greater than the last integer of the previous row.\n\n**Example 1:**\nInput: matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 3\nOutput: true\n\n**Example 2:**\nInput: matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 13\nOutput: false\n\n**Constraints:**\n- m == matrix.length\n- n == matrix[i].length\n- 1 <= m, n <= 100\n- -10^4 <= matrix[i][j], target <= 10^4",
    "difficulty": "medium",
    "topics": [
      "Array",
      "Binary Search",
      "Matrix"
    ],
    "companies": [
      "Amazon",
      "Microsoft",
      "Facebook",
      "Apple"
    ],
    "constraints": [
      "m == matrix.length",
      "n == matrix[i].length",
      "1 <= m, n <= 100",
      "Rows are sorted.",
      "First of row > last of previous row."
    ],
    "examples": [
      {
        "input": "matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 3",
        "output": "true",
        "explanation": "3 is in the matrix at (0,1)."
      },
      {
        "input": "matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 13",
        "output": "false",
        "explanation": "13 is not in the matrix."
      }
    ],
    "testCases": [
      {
        "input": "[[1,3,5,7],[10,11,16,20],[23,30,34,60]]\n3",
        "expectedOutput": "true",
        "isHidden": false
      },
      {
        "input": "[[1,3,5,7],[10,11,16,20],[23,30,34,60]]\n13",
        "expectedOutput": "false",
        "isHidden": false
      },
      {
        "input": "[[1]]\n1",
        "expectedOutput": "true",
        "isHidden": true
      }
    ],
    "hints": [
      "The properties of the matrix allow you to treat it as a single, sorted 1D array of size `m * n`.",
      "You can perform a standard binary search on this 'virtual' array.",
      "The search space is from `0` to `(m * n) - 1`.",
      "When you get a `mid` index, you need to convert it back to 2D coordinates `(row, col)`.",
      "The conversion is: `row = Math.floor(mid / n)` and `col = mid % n` (where `n` is the number of columns).",
      "Then, compare `matrix[row][col]` with the `target` and adjust `left` or `right` as in a normal binary search."
    ],
    "solutions": [
      {
        "language": "javascript",
        "code": "var searchMatrix = function(matrix, target) {\n    if (!matrix || matrix.length === 0) {\n        return false;\n    }\n\n    const m = matrix.length;\n    const n = matrix[0].length;\n    \n    // Treat the matrix as a sorted 1D array\n    let left = 0;\n    let right = m * n - 1;\n\n    while (left <= right) {\n        let mid = Math.floor((left + right) / 2);\n        \n        // Convert 1D 'mid' index back to 2D (row, col)\n        let row = Math.floor(mid / n);\n        let col = mid % n;\n        let midValue = matrix[row][col];\n\n        if (midValue === target) {\n            return true;\n        } else if (midValue < target) {\n            left = mid + 1;\n        } else {\n            right = mid - 1;\n        }\n    }\n\n    return false;\n};",
        "explanation": "This solution performs a single binary search over the entire matrix, treating it as a flattened, sorted 1D array of `m * n` elements. The search space ranges from `left = 0` to `right = m * n - 1`. In each step, we calculate the `mid` index. The key is to convert this 1D `mid` index back into 2D `(row, col)` coordinates. This is done with `row = Math.floor(mid / n)` and `col = mid % n`, where `n` is the number of columns. We then compare `matrix[row][col]` with the `target` and adjust `left` or `right` just like a standard binary search.",
        "timeComplexity": "O(log(m * n))",
        "spaceComplexity": "O(1)"
      }
    ],
    "acceptanceRate": 40.2,
    "totalSubmissions": 13000,
    "correctSubmissions": 5226,
    "averageTime": 13
  },
  {
    "title": "Symmetric Tree",
    "description": "Given the `root` of a binary tree, check whether it is a mirror of itself (i.e., symmetric around its center).\n\n**Example 1:**\nInput: root = [1,2,2,3,4,4,3]\nOutput: true\n\n**Example 2:**\nInput: root = [1,2,2,null,3,null,3]\nOutput: false\n\n**Constraints:**\n- The number of nodes in the tree is in the range [1, 1000].\n- -100 <= Node.val <= 100",
    "difficulty": "easy",
    "topics": [
      "Tree",
      "Depth-First Search",
      "Breadth-First Search",
      "Recursion"
    ],
    "companies": [
      "Amazon",
      "Microsoft",
      "Google",
      "LinkedIn"
    ],
    "constraints": [
      "The number of nodes in the tree is in the range [1, 1000].",
      "-100 <= Node.val <= 100"
    ],
    "examples": [
      {
        "input": "root = [1,2,2,3,4,4,3]",
        "output": "true",
        "explanation": "The left subtree is a mirror image of the right subtree."
      },
      {
        "input": "root = [1,2,2,null,3,null,3]",
        "output": "false",
        "explanation": "The left subtree's `null,3` does not mirror the right subtree's `null,3`."
      }
    ],
    "testCases": [
      {
        "input": "[1,2,2,3,4,4,3]",
        "expectedOutput": "true",
        "isHidden": false
      },
      {
        "input": "[1,2,2,null,3,null,3]",
        "expectedOutput": "false",
        "isHidden": false
      },
      {
        "input": "[]",
        "expectedOutput": "true",
        "isHidden": true
      }
    ],
    "hints": [
      "This problem is best solved recursively.",
      "You can't just compare `root.left` and `root.right` directly.",
      "Create a helper function `isMirror(node1, node2)`.",
      "The initial call will be `isMirror(root.left, root.right)`.",
      "Inside `isMirror`: \n  1. If `node1` and `node2` are both `null`, return `true`.\n  2. If one is `null` or `node1.val != node2.val`, return `false`.\n  3. Return `isMirror(node1.left, node2.right)` AND `isMirror(node1.right, node2.left)`."
    ],
    "solutions": [
      {
        "language": "javascript",
        "code": "/**\n * Definition for a binary tree node.\n * function TreeNode(val, left, right) {\n * this.val = (val===undefined ? 0 : val)\n * this.left = (left===undefined ? null : left)\n * this.right = (right===undefined ? null : right)\n * }\n */\nvar isSymmetric = function(root) {\n    if (!root) {\n        return true;\n    }\n\n    // Helper function to check if two subtrees are mirrors\n    function isMirror(t1, t2) {\n        // Base case: Both are null\n        if (!t1 && !t2) {\n            return true;\n        }\n        // Base case: One is null or values don't match\n        if (!t1 || !t2 || t1.val !== t2.val) {\n            return false;\n        }\n\n        // Recursive step: \n        // Check t1's left against t2's right\n        // AND t1's right against t2's left\n        return isMirror(t1.left, t2.right) && isMirror(t1.right, t2.left);\n    }\n\n    return isMirror(root.left, root.right);\n};",
        "explanation": "This solution uses a recursive helper function `isMirror`. The main function calls `isMirror` on the tree's left and right subtrees. The `isMirror(t1, t2)` function checks for symmetry. The base cases are: 1. If both `t1` and `t2` are `null`, they are symmetric (`true`). 2. If *only one* of them is `null`, or if their values are not equal, they are not symmetric (`false`). The recursive step is the key: it returns `true` only if `t1.left` is a mirror of `t2.right` AND `t1.right` is a mirror of `t2.left`.",
        "timeComplexity": "O(n)",
        "spaceComplexity": "O(h)"
      }
    ],
    "acceptanceRate": 49.6,
    "totalSubmissions": 15000,
    "correctSubmissions": 7440,
    "averageTime": 14
  },
  {
    "title": "Validate Binary Search Tree",
    "description": "Given the `root` of a binary tree, determine if it is a valid binary search tree (BST).\n\nA valid BST is defined as follows:\n- The left subtree of a node contains only nodes with keys **less than** the node's key.\n- The right subtree of a node contains only nodes with keys **greater than** the node's key.\n- Both the left and right subtrees must also be binary search trees.\n\n**Example 1:**\nInput: root = [2,1,3]\nOutput: true\n\n**Example 2:**\nInput: root = [5,1,4,null,null,3,6]\nOutput: false\nExplanation: The root node's value is 5 but its right child's value is 4.\n\n**Constraints:**\n- The number of nodes in the tree is in the range [1, 10^4].\n- -2^31 <= Node.val <= 2^31 - 1",
    "difficulty": "medium",
    "topics": [
      "Tree",
      "Depth-First Search",
      "Recursion"
    ],
    "companies": [
      "Amazon",
      "Microsoft",
      "Facebook",
      "Google"
    ],
    "constraints": [
      "The number of nodes in the tree is in the range [1, 10^4].",
      "-2^31 <= Node.val <= 2^31 - 1"
    ],
    "examples": [
      {
        "input": "root = [2,1,3]",
        "output": "true",
        "explanation": "Left (1) < Root (2). Right (3) > Root (2). Both subtrees are valid."
      },
      {
        "input": "root = [5,1,4,null,null,3,6]",
        "output": "false",
        "explanation": "The node with value 4 is in the right subtree of 5, which violates the BST property."
      }
    ],
    "testCases": [
      {
        "input": "[2,1,3]",
        "expectedOutput": "true",
        "isHidden": false
      },
      {
        "input": "[5,1,4,null,null,3,6]",
        "expectedOutput": "false",
        "isHidden": false
      },
      {
        "input": "[5,4,6,null,null,3,7]",
        "expectedOutput": "false",
        "isHidden": true
      }
    ],
    "hints": [
      "Just checking `node.left.val < node.val` and `node.right.val > node.val` is not enough. This check must apply to *all* nodes in the subtree.",
      "Use a recursive DFS helper function that passes down `min` and `max` boundaries.",
      "The function `validate(node, min, max)` checks if `node.val` is within the `(min, max)` range.",
      "The base case is a `null` node, which is valid (return `true`).",
      "If `node.val <= min` or `node.val >= max`, return `false`.",
      "Recursively call for the left child: `validate(node.left, min, node.val)`.",
      "Recursively call for the right child: `validate(node.right, node.val, max)`.",
      "The initial call will be `validate(root, -Infinity, Infinity)`."
    ],
    "solutions": [
      {
        "language": "javascript",
        "code": "/**\n * Definition for a binary tree node.\n * function TreeNode(val, left, right) {\n * this.val = (val===undefined ? 0 : val)\n * this.left = (left===undefined ? null : left)\n * this.right = (right===undefined ? null : right)\n * }\n */\nvar isValidBST = function(root) {\n    \n    /**\n     * @param {TreeNode} node - The current node to check\n     * @param {number} min - The minimum allowed value (exclusive)\n     * @param {number} max - The maximum allowed value (exclusive)\n     * @returns {boolean}\n     */\n    function validate(node, min, max) {\n        // Base case: An empty node is a valid BST\n        if (node === null) {\n            return true;\n        }\n\n        // Check the current node's value against the bounds\n        if (node.val <= min || node.val >= max) {\n            return false;\n        }\n\n        // Recursively check the subtrees, updating the bounds:\n        // Left child's max bound is the current node's value.\n        // Right child's min bound is the current node's value.\n        return validate(node.left, min, node.val) && \n               validate(node.right, node.val, max);\n    }\n\n    // Initial call with +/- Infinity as the bounds\n    return validate(root, -Infinity, Infinity);\n};",
        "explanation": "This solution uses a recursive Depth-First Search (DFS) helper function `validate`. This function checks if a given `node` is valid *within a given range* (`min`, `max`). An empty node is always valid. A non-empty node is valid only if its value is strictly between `min` and `max`. If the current node is valid, we must then recursively check its children: the left child must be valid within the range `(min, node.val)`, and the right child must be valid within the range `(node.val, max)`. The initial call starts with `root` and the widest possible range, `(-Infinity, Infinity)`.",
        "timeComplexity": "O(n)",
        "spaceComplexity": "O(h)"
      }
    ],
    "acceptanceRate": 29.8,
    "totalSubmissions": 20000,
    "correctSubmissions": 5960,
    "averageTime": 17
  },
  {
    "title": "Implement Trie (Prefix Tree)",
    "description": "A **Trie** (pronounced as \"try\") or **prefix tree** is a tree data structure used to efficiently store and retrieve keys in a dataset of strings. There are various applications of this data structure, such as autocomplete and spellchecker.\n\nImplement the `Trie` class:\n- `Trie()` Initializes the trie object.\n- `void insert(String word)` Inserts the string `word` into the trie.\n- `boolean search(String word)` Returns `true` if the string `word` is in the trie (i.e., was inserted), and `false` otherwise.\n- `boolean startsWith(String prefix)` Returns `true` if there is a previously inserted string `word` that has the prefix `prefix`, and `false` otherwise.\n\n**Example 1:**\n`Trie trie = new Trie();`\n`trie.insert(\"apple\");`\n`trie.search(\"apple\");`   // return true\n`trie.search(\"app\");`     // return false\n`trie.startsWith(\"app\");` // return true\n`trie.insert(\"app\");`\n`trie.search(\"app\");`     // return true\n\n**Constraints:**\n- 1 <= word.length, prefix.length <= 2000\n- `word` and `prefix` consist of lowercase English letters.\n- At most 3 * 10^4 calls will be made to `insert`, `search`, and `startsWith`.",
    "difficulty": "medium",
    "topics": [
      "Trie",
      "Design",
      "Hash Table",
      "String"
    ],
    "companies": [
      "Amazon",
      "Microsoft",
      "Google",
      "Facebook"
    ],
    "constraints": [
      "1 <= word.length, prefix.length <= 2000",
      "word and prefix consist of lowercase English letters.",
      "At most 3 * 10^4 calls will be made."
    ],
    "examples": [
      {
        "input": "[\"Trie\", \"insert\", \"search\", \"search\", \"startsWith\", \"insert\", \"search\"]\n[[], [\"apple\"], [\"apple\"], [\"app\"], [\"app\"], [\"app\"], [\"app\"]]",
        "output": "[null, null, true, false, true, null, true]",
        "explanation": "See problem description."
      }
    ],
    "testCases": [
      {
        "input": "[\"Trie\",\"insert\",\"search\",\"search\",\"startsWith\",\"insert\",\"search\"]\n[[],[\"apple\"],[\"apple\"],[\"app\"],[\"app\"],[\"app\"],[\"app\"]]",
        "expectedOutput": "[null,null,true,false,true,null,true]",
        "isHidden": false
      }
    ],
    "hints": [
      "You need to create a `TrieNode` class (or use objects in JavaScript).",
      "Each `TrieNode` should contain: \n  1. A map (or array of 26) to its `children`.\n  2. A boolean flag `isEndOfWord`.",
      "The `Trie` class will have a `root` node, which is an empty `TrieNode`.",
      "`insert(word)`: Iterate through `word`. For each char, check if it exists in the current node's `children`. If not, create a new `TrieNode` and add it. Move to that child node. After the loop, mark the final node's `isEndOfWord = true`.",
      "`search(word)`: Follow the path for `word`. If any char is missing, return `false`. After the loop, return `true` *only if* the final node's `isEndOfWord` is `true`.",
      "`startsWith(prefix)`: Follow the path for `prefix`. If any char is missing, return `false`. After the loop, return `true` (you don't need to check `isEndOfWord`)."
    ],
    "solutions": [
      {
        "language": "javascript",
        "code": "// Define the TrieNode structure\nclass TrieNode {\n    constructor() {\n        this.children = new Map(); // char -> TrieNode\n        this.isEndOfWord = false;\n    }\n}\n\nvar Trie = function() {\n    this.root = new TrieNode();\n};\n\n/** \n * @param {string} word\n * @return {void}\n */\nTrie.prototype.insert = function(word) {\n    let curr = this.root;\n    for (const char of word) {\n        if (!curr.children.has(char)) {\n            curr.children.set(char, new TrieNode());\n        }\n        curr = curr.children.get(char);\n    }\n    curr.isEndOfWord = true;\n};\n\n/** \n * @param {string} word\n * @return {boolean}\n */\nTrie.prototype.search = function(word) {\n    let curr = this.root;\n    for (const char of word) {\n        if (!curr.children.has(char)) {\n            return false;\n        }\n        curr = curr.children.get(char);\n    }\n    // Must be a complete word, not just a prefix\n    return curr.isEndOfWord;\n};\n\n/** \n * @param {string} prefix\n * @return {boolean}\n */\nTrie.prototype.startsWith = function(prefix) {\n    let curr = this.root;\n    for (const char of prefix) {\n        if (!curr.children.has(char)) {\n            return false;\n        }\n        curr = curr.children.get(char);\n    }\n    // If we completed the loop, the prefix exists\n    return true;\n};",
        "explanation": "This solution is a class-based implementation. It first defines a `TrieNode` class which contains a `children` map (to store child nodes for each character) and an `isEndOfWord` boolean. The `Trie` class itself just initializes a `root` node. `insert` iterates through the `word`, creating new nodes as needed, and marks the final node as `isEndOfWord`. `search` iterates through the `word`; if the path breaks, it returns `false`. If the path completes, it returns the `isEndOfWord` status of the final node. `startsWith` is identical to `search` but simply returns `true` if the path completes, regardless of the `isEndOfWord` flag.",
        "timeComplexity": "O(L)",
        "spaceComplexity": "O(N*L)"
      }
    ],
    "acceptanceRate": 60.1,
    "totalSubmissions": 10000,
    "correctSubmissions": 6010,
    "averageTime": 28
  },
  {
    "title": "Add and Search Word - Data structure design",
    "description": "Design a data structure that supports adding new words and finding if a string matches any previously added string.\n\nImplement the `WordDictionary` class:\n- `WordDictionary()` Initializes the object.\n- `void addWord(String word)` Adds `word` to the data structure.\n- `boolean search(String word)` Returns `true` if there is any string in the data structure that matches `word` or `false` otherwise. `word` may contain dots `.` where dots can be matched with any letter.\n\n**Example 1:**\n`WordDictionary wordDictionary = new WordDictionary();`\n`wordDictionary.addWord(\"bad\");`\n`wordDictionary.addWord(\"dad\");`\n`wordDictionary.addWord(\"mad\");`\n`wordDictionary.search(\"pad\");` // return false\n`wordDictionary.search(\"bad\");` // return true\n`wordDictionary.search(\".ad\");` // return true\n`wordDictionary.search(\"b..\");` // return true\n\n**Constraints:**\n- 1 <= word.length <= 500\n- `word` in `addWord` consists of lowercase English letters.\n- `word` in `search` consists of `.` or lowercase English letters.\n- At most 50000 calls will be made to `addWord` and `search`.",
    "difficulty": "medium",
    "topics": [
      "Trie",
      "Design",
      "Backtracking",
      "String"
    ],
    "companies": [
      "Amazon",
      "Facebook",
      "Google",
      "Microsoft"
    ],
    "constraints": [
      "1 <= word.length <= 500",
      "word in addWord consists of lowercase English letters.",
      "word in search consists of '.' or lowercase English letters.",
      "At most 50000 calls."
    ],
    "examples": [
      {
        "input": "[\"WordDictionary\",\"addWord\",\"addWord\",\"addWord\",\"search\",\"search\",\"search\",\"search\"]\n[[],[\"bad\"],[\"dad\"],[\"mad\"],[\"pad\"],[\"bad\"],[\".ad\"],[\"b..\"]]",
        "output": "[null,null,null,null,false,true,true,true]",
        "explanation": "See problem description."
      }
    ],
    "testCases": [
      {
        "input": "[\"WordDictionary\",\"addWord\",\"addWord\",\"addWord\",\"search\",\"search\",\"search\",\"search\"]\n[[],[\"bad\"],[\"dad\"],[\"mad\"],[\"pad\"],[\"bad\"],[\".ad\"],[\"b..\"]]",
        "expectedOutput": "[null,null,null,null,false,true,true,true]",
        "isHidden": false
      }
    ],
    "hints": [
      "This problem is a modification of the standard Trie.",
      "The `addWord` function is identical to a standard Trie `insert`.",
      "The `search` function is where it gets tricky due to the '.' wildcard.",
      "When `search` encounters a normal letter, it works like a standard Trie `search`.",
      "When `search` encounters a '.', you must explore *all* children of the current node.",
      "This requires a recursive (DFS/Backtracking) search function.",
      "The `search` function should take `(index, node)`: the current `index` in the `word` and the current `TrieNode`.",
      "If the char is '.', iterate through all `node.children` and recursively call `search(index + 1, childNode)`. If *any* of these calls return `true`, return `true`."
    ],
    "solutions": [
      {
        "language": "javascript",
        "code": "// Re-using TrieNode from previous problem\nclass TrieNode {\n    constructor() {\n        this.children = new Map(); // char -> TrieNode\n        this.isEndOfWord = false;\n    }\n}\n\nvar WordDictionary = function() {\n    this.root = new TrieNode();\n};\n\nWordDictionary.prototype.addWord = function(word) {\n    let curr = this.root;\n    for (const char of word) {\n        if (!curr.children.has(char)) {\n            curr.children.set(char, new TrieNode());\n        }\n        curr = curr.children.get(char);\n    }\n    curr.isEndOfWord = true;\n};\n\nWordDictionary.prototype.search = function(word) {\n    \n    // DFS function to handle '.' wildcard\n    function dfs(startIndex, node) {\n        let curr = node;\n        for (let i = startIndex; i < word.length; i++) {\n            const char = word[i];\n\n            if (char === '.') {\n                // Wildcard: Check all possible children\n                for (const childNode of curr.children.values()) {\n                    // If any path from here matches, return true\n                    if (dfs(i + 1, childNode)) {\n                        return true;\n                    }\n                }\n                // No child path matched\n                return false;\n            } else {\n                // Regular character\n                if (!curr.children.has(char)) {\n                    return false;\n                }\n                curr = curr.children.get(char);\n            }\n        }\n        // Reached the end of the word, check if it's a valid end\n        return curr.isEndOfWord;\n    }\n\n    return dfs(0, this.root);\n};",
        "explanation": "This solution uses a Trie. `addWord` is a standard Trie insertion. The `search` method, however, requires a recursive DFS helper to handle the '.' wildcard. The `dfs(startIndex, node)` function traverses the Trie. If the character `word[i]` is a normal letter, it proceeds like a standard search. If the character is a '.', it must recursively call `dfs(i + 1, childNode)` on *every* child of the current node. If *any* of these recursive calls return `true`, it means a match was found, so we return `true`. If all child paths fail, or if a normal character path breaks, we return `false`. The base case is reaching the end of the `word` (`i === word.length`), at which point we return `curr.isEndOfWord`.",
        "timeComplexity": "O(N*M)",
        "spaceComplexity": "O(Total Chars)"
      }
    ],
    "acceptanceRate": 43.2,
    "totalSubmissions": 8000,
    "correctSubmissions": 3456,
    "averageTime": 33
  },
  {
    "title": "Number of Connected Components in an Undirected Graph",
    "description": "You have a graph of `n` nodes. You are given an integer `n` and an array `edges` where `edges[i] = [ai, bi]` indicates that there is an edge between `ai` and `bi` in the graph.\n\nReturn the number of connected components in the graph.\n\n**Example 1:**\nInput: n = 5, edges = [[0,1],[1,2],[3,4]]\nOutput: 2\n\n**Example 2:**\nInput: n = 5, edges = [[0,1],[1,2],[2,3],[3,4]]\nOutput: 1\n\n**Constraints:**\n- 1 <= n <= 2000\n- 1 <= edges.length <= 5000\n- edges[i].length == 2\n- 0 <= ai, bi < n\n- ai != bi\n- There are no repeated edges.",
    "difficulty": "medium",
    "topics": [
      "Graph",
      "Union Find",
      "Depth-First Search",
      "Breadth-First Search"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Facebook",
      "Microsoft"
    ],
    "constraints": [
      "1 <= n <= 2000",
      "1 <= edges.length <= 5000",
      "ai != bi",
      "There are no repeated edges."
    ],
    "examples": [
      {
        "input": "n = 5, edges = [[0,1],[1,2],[3,4]]",
        "output": "2",
        "explanation": "There are two components: {0, 1, 2} and {3, 4}."
      },
      {
        "input": "n = 5, edges = [[0,1],[1,2],[2,3],[3,4]]",
        "output": "1",
        "explanation": "All nodes are connected in one component."
      }
    ],
    "testCases": [
      {
        "input": "5\n[[0,1],[1,2],[3,4]]",
        "expectedOutput": "2",
        "isHidden": false
      },
      {
        "input": "5\n[[0,1],[1,2],[2,3],[3,4]]",
        "expectedOutput": "1",
        "isHidden": false
      },
      {
        "input": "4\n[[0,1],[2,3]]",
        "expectedOutput": "2",
        "isHidden": true
      }
    ],
    "hints": [
      "This can be solved using either DFS/BFS or Union-Find.",
      "DFS/BFS Approach: Create an adjacency list. Create a `visited` array. Iterate from `i = 0` to `n-1`. If `visited[i]` is false, increment `componentCount` and start a DFS/BFS from node `i` to mark all reachable nodes as visited.",
      "Union-Find Approach: This is very efficient. Initialize a Union-Find data structure with `n` nodes. The initial `componentCount` is `n`.",
      "Iterate through the `edges`. For each edge `[u, v]`, call `union(u, v)`.",
      "If `union(u, v)` successfully merges two *different* components (i.e., `find(u) != find(v)`), decrement `componentCount` by 1.",
      "After processing all edges, return `componentCount`."
    ],
    "solutions": [
      {
        "language": "javascript",
        "code": "class UnionFind {\n    constructor(size) {\n        this.parent = Array(size).fill(0).map((_, i) => i);\n        this.rank = Array(size).fill(1);\n        this.count = size; // Number of components\n    }\n\n    find(i) {\n        if (this.parent[i] === i) {\n            return i;\n        }\n        return this.parent[i] = this.find(this.parent[i]); // Path compression\n    }\n\n    union(i, j) {\n        const rootI = this.find(i);\n        const rootJ = this.find(j);\n\n        if (rootI !== rootJ) {\n            // Union by rank\n            if (this.rank[rootI] > this.rank[rootJ]) {\n                this.parent[rootJ] = rootI;\n            } else if (this.rank[rootI] < this.rank[rootJ]) {\n                this.parent[rootI] = rootJ;\n            } else {\n                this.parent[rootJ] = rootI;\n                this.rank[rootI]++;\n            }\n            this.count--; // Successfully merged two components\n            return true;\n        }\n        return false; // Already in the same component\n    }\n}\n\nvar countComponents = function(n, edges) {\n    const uf = new UnionFind(n);\n    \n    for (const [u, v] of edges) {\n        uf.union(u, v);\n    }\n    \n    return uf.count;\n};",
        "explanation": "This solution uses the Union-Find (Disjoint Set Union) data structure. We initialize a `UnionFind` instance with `n` nodes. The `UnionFind` class maintains a `count` of distinct components, initially `n`. We also implement `find` (with path compression) and `union` (with union-by-rank) for efficiency. We then iterate through every `edge` in the `edges` array and call `uf.union(u, v)` on its two nodes. The `union` function checks if the nodes are already connected. If not, it merges their sets and decrements the `count` of components. After processing all edges, the final `uf.count` is the number of connected components.",
        "timeComplexity": "O(E * \u03B1(n))",
        "spaceComplexity": "O(n)"
      }
    ],
    "acceptanceRate": 63.1,
    "totalSubmissions": 7000,
    "correctSubmissions": 4417,
    "averageTime": 20
  },
  {
    "title": "Graph Valid Tree",
    "description": "You have a graph of `n` nodes labeled from `0` to `n - 1`. You are given an integer `n` and a list of `edges` where `edges[i] = [ai, bi]` indicates that there is an undirected edge between nodes `ai` and `bi`.\n\nReturn `true` if the edges of the given graph make up a valid tree, and `false` otherwise.\n\n**Example 1:**\nInput: n = 5, edges = [[0,1],[0,2],[0,3],[1,4]]\nOutput: true\n\n**Example 2:**\nInput: n = 5, edges = [[0,1],[1,2],[2,3],[1,3],[1,4]]\nOutput: false\n\n**Constraints:**\n- 1 <= n <= 2000\n- 0 <= edges.length <= 5000\n- edges[i].length == 2\n- 0 <= ai, bi < n\n- ai != bi\n- There are no repeated edges.",
    "difficulty": "medium",
    "topics": [
      "Graph",
      "Union Find",
      "Depth-First Search",
      "Breadth-First Search"
    ],
    "companies": [
      "Amazon",
      "Facebook",
      "Google",
      "Microsoft"
    ],
    "constraints": [
      "1 <= n <= 2000",
      "0 <= edges.length <= 5000",
      "ai != bi"
    ],
    "examples": [
      {
        "input": "n = 5, edges = [[0,1],[0,2],[0,3],[1,4]]",
        "output": "true",
        "explanation": "The graph is connected and has no cycles."
      },
      {
        "input": "n = 5, edges = [[0,1],[1,2],[2,3],[1,3],[1,4]]",
        "output": "false",
        "explanation": "The graph has a cycle (1, 2, 3)."
      }
    ],
    "testCases": [
      {
        "input": "5\n[[0,1],[0,2],[0,3],[1,4]]",
        "expectedOutput": "true",
        "isHidden": false
      },
      {
        "input": "5\n[[0,1],[1,2],[2,3],[1,3],[1,4]]",
        "expectedOutput": "false",
        "isHidden": false
      },
      {
        "input": "5\n[[0,1],[1,2],[3,4]]",
        "expectedOutput": "false",
        "isHidden": true
      }
    ],
    "hints": [
      "What are the properties of a valid tree?",
      "A graph is a tree if it has two properties: \n  1. It is fully connected (all nodes are part of one component).\n  2. It has no cycles.",
      "A key property of a tree is that it has exactly `n - 1` edges, where `n` is the number of nodes.",
      "Check 1: `if (edges.length != n - 1)`, it cannot be a tree. Return `false`.",
      "If it has `n - 1` edges, you *only* need to check one of the other two properties (e.g., just check for cycles).",
      "Use Union-Find. Iterate through `edges`. For each edge `[u, v]`, call `union(u, v)`. If `union` returns `false` (meaning `u` and `v` were *already* in the same component), you have found a cycle. Return `false`.",
      "If you process all edges *and* `edges.length == n - 1`, return `true`."
    ],
    "solutions": [
      {
        "language": "javascript",
        "code": "// Assuming the UnionFind class from the previous problem is available\nclass UnionFind {\n    constructor(size) {\n        this.parent = Array(size).fill(0).map((_, i) => i);\n        this.rank = Array(size).fill(1);\n        this.count = size;\n    }\n    find(i) {\n        if (this.parent[i] === i) return i;\n        return this.parent[i] = this.find(this.parent[i]);\n    }\n    union(i, j) {\n        const rootI = this.find(i);\n        const rootJ = this.find(j);\n        if (rootI !== rootJ) {\n            if (this.rank[rootI] > this.rank[rootJ]) {\n                this.parent[rootJ] = rootI;\n            } else if (this.rank[rootI] < this.rank[rootJ]) {\n                this.parent[rootI] = rootJ;\n            } else {\n                this.parent[rootJ] = rootI;\n                this.rank[rootI]++;\n            }\n            this.count--;\n            return true; // Merged successfully\n        }\n        return false; // Already connected (cycle detected)\n    }\n}\n\nvar validTree = function(n, edges) {\n    // A valid tree with n nodes must have exactly n - 1 edges.\n    if (edges.length !== n - 1) {\n        return false;\n    }\n\n    const uf = new UnionFind(n);\n\n    for (const [u, v] of edges) {\n        // If union(u, v) is false, it means u and v were already\n        // in the same component, so adding this edge creates a cycle.\n        if (!uf.union(u, v)) {\n            return false;\n        }\n    }\n\n    // After processing n-1 edges without cycles, the graph\n    // must be a single connected component (a tree).\n    // We can also check uf.count === 1, but it's redundant\n    // if the edge count check passed.\n    return true;\n};",
        "explanation": "This solution uses the properties of a tree: a valid tree with `n` nodes must have exactly `n - 1` edges and must be acyclic. First, we check if `edges.length` is not equal to `n - 1`. If it's not, it can't be a tree, so we return `false`. If it *is* `n - 1`, we then only need to check for cycles. We use a Union-Find data structure. We iterate through all the `edges`. For each edge `[u, v]`, we try to `union(u, v)`. If `union` returns `false`, it means `u` and `v` were already in the same component, and adding this edge creates a cycle. In this case, we return `false`. If we successfully process all `n - 1` edges without finding a cycle, the graph must be a valid tree, so we return `true`.",
        "timeComplexity": "O(E * \u03B1(n))",
        "spaceComplexity": "O(n)"
      }
    ],
    "acceptanceRate": 43.1,
    "totalSubmissions": 6000,
    "correctSubmissions": 2586,
    "averageTime": 23
  },
  {
    "title": "Contains Duplicate",
    "description": "Given an integer array `nums`, return `true` if any value appears **at least twice** in the array, and `false` if every element is distinct.\n\n**Example 1:**\nInput: nums = [1,2,3,1]\nOutput: true\n\n**Example 2:**\nInput: nums = [1,2,3,4]\nOutput: false\n\n**Example 3:**\nInput: nums = [1,1,1,3,3,4,3,2,4,2]\nOutput: true\n\n**Constraints:**\n- 1 <= nums.length <= 10^5\n- -10^9 <= nums[i] <= 10^9",
    "difficulty": "easy",
    "topics": [
      "Array",
      "Hash Table",
      "Sorting"
    ],
    "companies": [
      "Amazon",
      "Apple",
      "Microsoft",
      "Facebook"
    ],
    "constraints": [
      "1 <= nums.length <= 10^5",
      "-10^9 <= nums[i] <= 10^9"
    ],
    "examples": [
      {
        "input": "nums = [1,2,3,1]",
        "output": "true",
        "explanation": "The value 1 appears twice."
      },
      {
        "input": "nums = [1,2,3,4]",
        "output": "false",
        "explanation": "All elements are distinct."
      }
    ],
    "testCases": [
      {
        "input": "[1,2,3,1]",
        "expectedOutput": "true",
        "isHidden": false
      },
      {
        "input": "[1,2,3,4]",
        "expectedOutput": "false",
        "isHidden": false
      },
      {
        "input": "[]",
        "expectedOutput": "false",
        "isHidden": true
      }
    ],
    "hints": [
      "A simple solution is to sort the array (O(n log n)) and then iterate, checking if any adjacent elements `nums[i]` and `nums[i+1]` are the same.",
      "A more time-efficient O(n) solution uses extra space.",
      "Use a Hash Set (or Hash Map).",
      "Iterate through `nums`. For each `num`, check if it is already in the set. If it is, return `true`.",
      "If it's not, add `num` to the set and continue."
    ],
    "solutions": [
      {
        "language": "javascript",
        "code": "var containsDuplicate = function(nums) {\n    const seen = new Set();\n    \n    for (const num of nums) {\n        // If the set already has this number, it's a duplicate\n        if (seen.has(num)) {\n            return true;\n        }\n        // Otherwise, add it to the set\n        seen.add(num);\n    }\n    \n    // If we get through the whole loop, no duplicates were found\n    return false;\n};",
        "explanation": "This solution uses a Hash Set, named `seen`, to achieve O(n) time complexity. We iterate through the `nums` array. For each `num`, we check if it's already in the `seen` set. If `seen.has(num)` is `true`, we've found a duplicate and immediately return `true`. If not, we add the `num` to the `seen` set and continue to the next element. If the loop finishes without finding any duplicates, we return `false`.",
        "timeComplexity": "O(n)",
        "spaceComplexity": "O(n)"
      }
    ],
    "acceptanceRate": 59.8,
    "totalSubmissions": 25000,
    "correctSubmissions": 14950,
    "averageTime": 10
  },
  {
    "title": "Lowest Common Ancestor of a Binary Tree",
    "description": "Given a binary tree, find the lowest common ancestor (LCA) of two given nodes `p` and `q` in the tree.\n\n(This is for a general Binary Tree, not a Binary Search Tree).\n\n**Example 1:**\nInput: root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 1\nOutput: 3\nExplanation: The LCA of nodes 5 and 1 is 3.\n\n**Example 2:**\nInput: root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 4\nOutput: 5\nExplanation: The LCA of nodes 5 and 4 is 5, since a node can be a descendant of itself.\n\n**Constraints:**\n- The number of nodes in the tree is in the range [2, 10^5].\n- -10^9 <= Node.val <= 10^9\n- All `Node.val` are **unique**.\n- `p != q`\n- `p` and `q` will exist in the tree.",
    "difficulty": "medium",
    "topics": [
      "Tree",
      "Depth-First Search",
      "Recursion"
    ],
    "companies": [
      "Amazon",
      "Facebook",
      "Microsoft",
      "Google"
    ],
    "constraints": [
      "The number of nodes in the tree is in the range [2, 10^5].",
      "All Node.val are unique.",
      "p != q",
      "p and q will exist in the tree."
    ],
    "examples": [
      {
        "input": "root = [3,5,1...], p = 5, q = 1",
        "output": "3",
        "explanation": "5 is in the left subtree, 1 is in the right subtree. The split point (LCA) is 3."
      },
      {
        "input": "root = [3,5,1...], p = 5, q = 4",
        "output": "5",
        "explanation": "5 is the node, and 4 is in its subtree. Therefore, 5 is the LCA."
      }
    ],
    "testCases": [
      {
        "input": "[3,5,1,6,2,0,8,null,null,7,4]\n5\n1",
        "expectedOutput": "3",
        "isHidden": false
      },
      {
        "input": "[3,5,1,6,2,0,8,null,null,7,4]\n5\n4",
        "expectedOutput": "5",
        "isHidden": false
      }
    ],
    "hints": [
      "Use a recursive DFS approach.",
      "The function should return the LCA node if found, or `null`.",
      "Base Case 1: If `root == null`, return `null`.",
      "Base Case 2: If `root == p` or `root == q`, this node *is* a potential LCA. Return `root`.",
      "Recursive Step: Call the function on the left (`leftLCA`) and right (`rightLCA`) subtrees.",
      "Result: \n  - If `leftLCA` and `rightLCA` are *both* non-null, it means `p` and `q` were found in different subtrees. The current `root` is the split point, so return `root`.\n  - If only one of them is non-null, it means both `p` and `q` are in that subtree. Return the non-null one (e.g., `return leftLCA || rightLCA`)."
    ],
    "solutions": [
      {
        "language": "javascript",
        "code": "/**\n * Definition for a binary tree node.\n * function TreeNode(val) {\n * this.val = val;\n * this.left = this.right = null;\n * }\n */\nvar lowestCommonAncestor = function(root, p, q) {\n    // Base case 1: Reached a null node\n    if (root === null) {\n        return null;\n    }\n\n    // Base case 2: Found p or q\n    if (root === p || root === q) {\n        return root;\n    }\n\n    // Recursively search in left and right subtrees\n    const leftLCA = lowestCommonAncestor(root.left, p, q);\n    const rightLCA = lowestCommonAncestor(root.right, p, q);\n\n    // Process results:\n    // 1. If p and q are in different subtrees, the current 'root' is the LCA\n    if (leftLCA !== null && rightLCA !== null) {\n        return root;\n    }\n\n    // 2. If both p and q are in one subtree, return that subtree's LCA\n    // (the other one will be null)\n    return leftLCA || rightLCA;\n};",
        "explanation": "This solution uses a recursive DFS (Postorder) traversal. The function has two base cases: 1. If the `root` is `null`, we've found nothing, so return `null`. 2. If the `root` *is* `p` or `q`, we've found one of the nodes, so we return `root`. We then recursively call the function on the left and right children. After the calls return, we check the results: If `leftLCA` and `rightLCA` are *both* non-null, it means `p` was found in one subtree and `q` in the other, making the current `root` the LCA. If only one of them is non-null, it means both `p` and `q` are in that one subtree, so we pass that non-null result up the call stack.",
        "timeComplexity": "O(n)",
        "spaceComplexity": "O(h)"
      }
    ],
    "acceptanceRate": 53.7,
    "totalSubmissions": 14000,
    "correctSubmissions": 7518,
    "averageTime": 18
  },
  {
    "title": "Merge Intervals",
    "description": "Given an array of `intervals` where `intervals[i] = [starti, endi]`, merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input.\n\n**Example 1:**\nInput: intervals = [[1,3],[2,6],[8,10],[15,18]]\nOutput: [[1,6],[8,10],[15,18]]\nExplanation: Intervals [1,3] and [2,6] overlap, merge them into [1,6].\n\n**Example 2:**\nInput: intervals = [[1,4],[4,5]]\nOutput: [[1,5]]\nExplanation: Intervals [1,4] and [4,5] are considered overlapping.\n\n**Constraints:**\n- 1 <= intervals.length <= 10^4\n- intervals[i].length == 2\n- 0 <= starti <= endi <= 10^4",
    "difficulty": "medium",
    "topics": [
      "Array",
      "Sorting",
      "Greedy"
    ],
    "companies": [
      "Amazon",
      "Facebook",
      "Google",
      "Microsoft"
    ],
    "constraints": [
      "1 <= intervals.length <= 10^4",
      "intervals[i].length == 2",
      "0 <= starti <= endi <= 10^4"
    ],
    "examples": [
      {
        "input": "intervals = [[1,3],[2,6],[8,10],[15,18]]",
        "output": "[[1,6],[8,10],[15,18]]",
        "explanation": "[1,3] and [2,6] overlap, merging to [1,6]."
      },
      {
        "input": "intervals = [[1,4],[4,5]]",
        "output": "[[1,5]]",
        "explanation": "[1,4] and [4,5] overlap at 4, merging to [1,5]."
      }
    ],
    "testCases": [
      {
        "input": "[[1,3],[2,6],[8,10],[15,18]]",
        "expectedOutput": "[[1,6],[8,10],[15,18]]",
        "isHidden": false
      },
      {
        "input": "[[1,4],[4,5]]",
        "expectedOutput": "[[1,5]]",
        "isHidden": false
      },
      {
        "input": "[[1,4],[2,3]]",
        "expectedOutput": "[[1,4]]",
        "isHidden": true
      }
    ],
    "hints": [
      "The first step is crucial: sort the intervals based on their **start** time.",
      "Initialize a `merged` list with the first interval.",
      "Iterate through the sorted intervals, starting from the second one.",
      "Let the `lastInterval` be the last interval in your `merged` list.",
      "Let the `currentInterval` be the one you're checking.",
      "Check for overlap: `if (currentInterval.start <= lastInterval.end)`.",
      "If they overlap, 'merge' them by updating the `lastInterval.end = max(lastInterval.end, currentInterval.end)`.",
      "If they *don't* overlap, just add the `currentInterval` to the `merged` list."
    ],
    "solutions": [
      {
        "language": "javascript",
        "code": "var merge = function(intervals) {\n    if (intervals.length === 0) {\n        return [];\n    }\n\n    // 1. Sort intervals by start time\n    intervals.sort((a, b) => a[0] - b[0]);\n\n    const merged = [intervals[0]];\n\n    // 2. Iterate and merge\n    for (let i = 1; i < intervals.length; i++) {\n        const currentInterval = intervals[i];\n        const lastInterval = merged[merged.length - 1];\n\n        // Check for overlap\n        if (currentInterval[0] <= lastInterval[1]) {\n            // Overlap exists: update the end of the last interval\n            lastInterval[1] = Math.max(lastInterval[1], currentInterval[1]);\n        } else {\n            // No overlap: add the current interval as a new one\n            merged.push(currentInterval);\n        }\n    }\n\n    return merged;\n};",
        "explanation": "This solution first sorts the `intervals` array based on the start time of each interval (O(n log n)). Then, it initializes a `merged` array with the first interval. It iterates through the rest of the sorted intervals. For each `currentInterval`, it compares it to the `lastInterval` in the `merged` array. If the `currentInterval`'s start is less than or equal to the `lastInterval`'s end, they overlap. When they overlap, we merge them by updating the `lastInterval`'s end to be the *maximum* of the two end times. If they don't overlap, we simply push the `currentInterval` onto the `merged` array.",
        "timeComplexity": "O(n log n)",
        "spaceComplexity": "O(n)"
      }
    ],
    "acceptanceRate": 43.8,
    "totalSubmissions": 16000,
    "correctSubmissions": 7008,
    "averageTime": 19
  },
  {
    "title": "Non-overlapping Intervals",
    "description": "Given an array of intervals `intervals` where `intervals[i] = [starti, endi]`, return the minimum number of intervals you need to remove to make the rest of the intervals non-overlapping.\n\n**Example 1:**\nInput: intervals = [[1,2],[2,3],[3,4],[1,3]]\nOutput: 1\nExplanation: [1,3] can be removed and the rest are non-overlapping.\n\n**Example 2:**\nInput: intervals = [[1,2],[1,2],[1,2]]\nOutput: 2\nExplanation: You need to remove two [1,2] intervals.\n\n**Example 3:**\nInput: intervals = [[1,2],[2,3]]\nOutput: 0\n\n**Constraints:**\n- 1 <= intervals.length <= 10^5\n- intervals[i].length == 2\n- -5 * 10^4 <= starti < endi <= 5 * 10^4",
    "difficulty": "medium",
    "topics": [
      "Array",
      "Sorting",
      "Greedy"
    ],
    "companies": [
      "Amazon",
      "Facebook",
      "Google",
      "Microsoft"
    ],
    "constraints": [
      "1 <= intervals.length <= 10^5",
      "-5 * 10^4 <= starti < endi <= 5 * 10^4"
    ],
    "examples": [
      {
        "input": "intervals = [[1,2],[2,3],[3,4],[1,3]]",
        "output": "1",
        "explanation": "Remove [1,3] to make the rest non-overlapping."
      },
      {
        "input": "intervals = [[1,2],[1,2],[1,2]]",
        "output": "2",
        "explanation": "Remove two of the [1,2] intervals."
      }
    ],
    "testCases": [
      {
        "input": "[[1,2],[2,3],[3,4],[1,3]]",
        "expectedOutput": "1",
        "isHidden": false
      },
      {
        "input": "[[1,2],[1,2],[1,2]]",
        "expectedOutput": "2",
        "isHidden": false
      },
      {
        "input": "[[1,100],[11,22],[1,11],[2,12]]",
        "expectedOutput": "2",
        "isHidden": true
      }
    ],
    "hints": [
      "This is a Greedy problem. The question is, what should we be greedy about?",
      "Sorting by start time can be complex. What if a very long interval starts first?",
      "Try sorting the intervals by their **end** time.",
      "Iterate through the sorted intervals. Keep track of the `end` time of the last interval you *kept* (`prevEnd`).",
      "Initialize `prevEnd` to the end of the first interval. Initialize `removals = 0`.",
      "Iterate from the second interval. If `current.start >= prevEnd`, it means this interval does *not* overlap with the previous one. You can *keep* it. Update `prevEnd = current.end`.",
      "If `current.start < prevEnd`, it means this interval *does* overlap. You must remove it. Increment `removals`."
    ],
    "solutions": [
      {
        "language": "javascript",
        "code": "var eraseOverlapIntervals = function(intervals) {\n    if (intervals.length === 0) {\n        return 0;\n    }\n\n    // 1. Sort intervals by their *end* time\n    intervals.sort((a, b) => a[1] - b[1]);\n\n    let removals = 0;\n    // Keep track of the end time of the last 'kept' interval\n    let prevEnd = intervals[0][1];\n\n    // 2. Iterate from the second interval\n    for (let i = 1; i < intervals.length; i++) {\n        const current = intervals[i];\n        \n        // If the current interval's start is after or at the previous end,\n        // it's non-overlapping. We 'keep' it.\n        if (current[0] >= prevEnd) {\n            prevEnd = current[1]; // Update the end pointer\n        } else {\n            // The current interval overlaps with the previous 'kept' one.\n            // We must remove it. Increment removals.\n            // We don't update prevEnd, because the 'kept' interval\n            // (which ends earlier) is always better.\n            removals++;\n        }\n    }\n\n    return removals;\n};",
        "explanation": "This solution uses a Greedy approach. The key insight is to sort the intervals by their **end** times. This way, we always prioritize keeping the interval that *finishes earliest*, as this leaves the most room for subsequent intervals. We initialize `removals = 0` and set `prevEnd` to the end time of the very first interval. Then, we iterate from the second interval. If the `current` interval's start is *greater than or equal to* `prevEnd`, it doesn't overlap, so we 'keep' it by updating `prevEnd` to `current[1]`. If it *does* overlap (`current[0] < prevEnd`), we must remove it, so we increment `removals`. We *don't* update `prevEnd` in this case, because the previous interval (which ends earlier) is the better one to keep.",
        "timeComplexity": "O(n log n)",
        "spaceComplexity": "O(1)"
      }
    ],
    "acceptanceRate": 48.7,
    "totalSubmissions": 8000,
    "correctSubmissions": 3896,
    "averageTime": 24
  },
  {
    "title": "House Robber II",
    "description": "You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed. All houses at this place are **arranged in a circle**. That means the first house is the neighbor of the last one. The only constraint is that adjacent houses have security systems connected, and **it will automatically contact the police if two adjacent houses were broken into on the same night**.\n\nGiven an integer array `nums` representing the amount of money of each house, return the maximum amount of money you can rob tonight **without alerting the police**.\n\n**Example 1:**\nInput: nums = [2,3,2]\nOutput: 3\nExplanation: You cannot rob house 1 (money = 2) and house 3 (money = 2) at the same time. The max you can get is 3 (by robbing house 2).\n\n**Example 2:**\nInput: nums = [1,2,3,1]\nOutput: 4\nExplanation: Rob house 1 (money = 1) and house 3 (money = 3). Total = 4.\n\n**Constraints:**\n- 1 <= nums.length <= 100\n- 0 <= nums[i] <= 1000",
    "difficulty": "medium",
    "topics": [
      "Array",
      "Dynamic Programming"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Microsoft",
      "Facebook"
    ],
    "constraints": [
      "1 <= nums.length <= 100",
      "0 <= nums[i] <= 1000"
    ],
    "examples": [
      {
        "input": "nums = [2,3,2]",
        "output": "3",
        "explanation": "Cannot rob house 1 and 3. Robbing house 2 gives 3."
      },
      {
        "input": "nums = [1,2,3,1]",
        "output": "4",
        "explanation": "Rob houses 1 and 3. Total 1 + 3 = 4."
      }
    ],
    "testCases": [
      {
        "input": "[2,3,2]",
        "expectedOutput": "3",
        "isHidden": false
      },
      {
        "input": "[1,2,3,1]",
        "expectedOutput": "4",
        "isHidden": false
      },
      {
        "input": "[1,2,3]",
        "expectedOutput": "3",
        "isHidden": true
      }
    ],
    "hints": [
      "This problem is a variation of 'House Robber I'.",
      "The only new constraint is that the first and last houses are adjacent.",
      "This means you can *either* rob the first house *or* the last house, but not both.",
      "We can break this problem down into two subproblems from 'House Robber I':\n  1. What is the max profit if we rob houses from `0` to `n-2` (i.e., we *exclude* the last house)?\n  2. What is the max profit if we rob houses from `1` to `n-1` (i.e., we *exclude* the first house)?",
      "The final answer is the `max()` of these two subproblems.",
      "Use your O(1) space 'House Robber I' helper function to solve both subproblems."
    ],
    "solutions": [
      {
        "language": "javascript",
        "code": "var rob = function(nums) {\n    if (nums.length === 0) return 0;\n    if (nums.length === 1) return nums[0];\n\n    /**\n     * Helper function to solve the 'House Robber I' problem\n     * on a subarray (from 'start' to 'end' inclusive).\n     */\n    function robLinear(subNums) {\n        if (subNums.length === 0) return 0;\n        let robPrevOne = 0;\n        let robPrevTwo = 0;\n\n        for (const num of subNums) {\n            const temp = Math.max(num + robPrevTwo, robPrevOne);\n            robPrevTwo = robPrevOne;\n            robPrevOne = temp;\n        }\n        return robPrevOne;\n    }\n\n    // Case 1: Rob from house 0 to n-2 (exclude last house)\n    const max1 = robLinear(nums.slice(0, nums.length - 1));\n\n    // Case 2: Rob from house 1 to n-1 (exclude first house)\n    const max2 = robLinear(nums.slice(1, nums.length));\n\n    // The answer is the max of these two independent scenarios\n    return Math.max(max1, max2);\n};",
        "explanation": "This solution breaks the circular problem into two linear problems. Since the first (`0`) and last (`n-1`) houses cannot both be robbed, we know the optimal solution *either* includes house `0` (and thus *excludes* `n-1`) *or* it includes house `n-1` (and thus *excludes* `0`). We can find the max profit for both scenarios. First, we run the standard 'House Robber I' algorithm on the subarray `nums[0...n-2]` (Case 1: excluding the last house). Second, we run the same algorithm on the subarray `nums[1...n-1]` (Case 2: excluding the first house). The final answer is the maximum of these two results. The `robLinear` helper function is the O(1) space DP solution from 'House Robber I'.",
        "timeComplexity": "O(n)",
        "spaceComplexity": "O(1)"
      }
    ],
    "acceptanceRate": 39.4,
    "totalSubmissions": 7000,
    "correctSubmissions": 2758,
    "averageTime": 17
  },
  {
    "title": "Longest Common Subsequence",
    "description": "Given two strings `text1` and `text2`, return the length of their longest common subsequence.\n\nA subsequence of a string is a new string generated from the original string with some characters (can be none) deleted without changing the relative order of the remaining characters.\n\n**Example 1:**\nInput: text1 = \"abcde\", text2 = \"ace\"\nOutput: 3\nExplanation: The longest common subsequence is \"ace\" and its length is 3.\n\n**Example 2:**\nInput: text1 = \"abc\", text2 = \"abc\"\nOutput: 3\n\n**Example 3:**\nInput: text1 = \"abc\", text2 = \"def\"\nOutput: 0\n\n**Constraints:**\n- 1 <= text1.length, text2.length <= 1000\n- `text1` and `text2` consist of lowercase English letters.",
    "difficulty": "medium",
    "topics": [
      "String",
      "Dynamic Programming"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Microsoft",
      "Facebook"
    ],
    "constraints": [
      "1 <= text1.length, text2.length <= 1000",
      "text1 and text2 consist of lowercase English letters."
    ],
    "examples": [
      {
        "input": "text1 = \"abcde\", text2 = \"ace\"",
        "output": "3",
        "explanation": "The LCS is \"ace\", length 3."
      },
      {
        "input": "text1 = \"abc\", text2 = \"def\"",
        "output": "0",
        "explanation": "No common subsequence."
      }
    ],
    "testCases": [
      {
        "input": "\"abcde\"\n\"ace\"",
        "expectedOutput": "3",
        "isHidden": false
      },
      {
        "input": "\"abc\"\n\"abc\"",
        "expectedOutput": "3",
        "isHidden": false
      },
      {
        "input": "\"abc\"\n\"def\"",
        "expectedOutput": "0",
        "isHidden": true
      },
      {
        "input": "\"ezupkr\"\n\"ubmrapg\"",
        "expectedOutput": "2",
        "isHidden": true
      }
    ],
    "hints": [
      "This is a classic 2D Dynamic Programming problem.",
      "Let `dp[i][j]` be the length of the LCS for `text1[0...i-1]` and `text2[0...j-1]`.",
      "Create a DP grid of size `(m+1) x (n+1)`, initialized to 0.",
      "Iterate through the grid. At `dp[i][j]`, compare `text1[i-1]` and `text2[j-1]`.",
      "If `text1[i-1] == text2[j-1]`: The characters match. The LCS is 1 + the LCS of the strings before these characters. `dp[i][j] = 1 + dp[i-1][j-1]`.",
      "If `text1[i-1] != text2[j-1]`: The characters don't match. The LCS is the *maximum* of the LCS found by either excluding the `text1` char (`dp[i-1][j]`) or excluding the `text2` char (`dp[i][j-1]`).",
      "The final answer is `dp[m][n]`."
    ],
    "solutions": [
      {
        "language": "javascript",
        "code": "var longestCommonSubsequence = function(text1, text2) {\n    const m = text1.length;\n    const n = text2.length;\n    \n    // Create a 2D DP table, (m+1) x (n+1)\n    const dp = Array(m + 1).fill(0).map(() => Array(n + 1).fill(0));\n\n    for (let i = 1; i <= m; i++) {\n        for (let j = 1; j <= n; j++) {\n            // Compare chars at text1[i-1] and text2[j-1]\n            if (text1[i - 1] === text2[j - 1]) {\n                // Chars match: add 1 to the diagonal (LCS of prefixes)\n                dp[i][j] = 1 + dp[i - 1][j - 1];\n            } else {\n                // Chars don't match: take max of top or left\n                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);\n            }\n        }\n    }\n\n    // The answer is in the bottom-right corner\n    return dp[m][n];\n};",
        "explanation": "This solution uses 2D Dynamic Programming. We create a `dp` grid of size `(m+1) x (n+1)`, where `dp[i][j]` stores the length of the LCS between `text1.substring(0, i)` and `text2.substring(0, j)`. We iterate from `(1, 1)` to `(m, n)`. At each cell `(i, j)`, we compare the characters `text1[i-1]` and `text2[j-1]`. If they match, we know this character is part of the LCS, so we set `dp[i][j] = 1 + dp[i-1][j-1]` (1 plus the LCS of the strings without these characters). If they *don't* match, the LCS is the best we can do by either ignoring the `text1` character (`dp[i-1][j]`) or ignoring the `text2` character (`dp[i][j-1]`), so we take the `max` of the two. The final answer is `dp[m][n]`.",
        "timeComplexity": "O(m * n)",
        "spaceComplexity": "O(m * n)"
      }
    ],
    "acceptanceRate": 59.1,
    "totalSubmissions": 9000,
    "correctSubmissions": 5319,
    "averageTime": 27
  },
  {
    "title": "Rotate Array",
    "description": "Given an array `nums`, rotate the array to the right by `k` steps, where `k` is non-negative.\n\n**Example 1:**\nInput: nums = [1,2,3,4,5,6,7], k = 3\nOutput: [5,6,7,1,2,3,4]\nExplanation:\nrotate 1: [7,1,2,3,4,5,6]\nrotate 2: [6,7,1,2,3,4,5]\nrotate 3: [5,6,7,1,2,3,4]\n\n**Example 2:**\nInput: nums = [-1,-100,3,99], k = 2\nOutput: [3,99,-1,-100]\n\n**Constraints:**\n- 1 <= nums.length <= 10^5\n- -2^31 <= nums[i] <= 2^31 - 1\n- 0 <= k <= 10^5",
    "difficulty": "medium",
    "topics": [
      "Array",
      "Two Pointers",
      "Math"
    ],
    "companies": [
      "Amazon",
      "Microsoft",
      "Facebook",
      "Apple"
    ],
    "constraints": [
      "1 <= nums.length <= 10^5",
      "0 <= k <= 10^5",
      "Must be O(1) extra space (in-place)."
    ],
    "examples": [
      {
        "input": "nums = [1,2,3,4,5,6,7], k = 3",
        "output": "[5,6,7,1,2,3,4]",
        "explanation": "Rotating 3 steps to the right."
      },
      {
        "input": "nums = [-1,-100,3,99], k = 2",
        "output": "[3,99,-1,-100]",
        "explanation": "Rotating 2 steps to the right."
      }
    ],
    "testCases": [
      {
        "input": "[1,2,3,4,5,6,7]\n3",
        "expectedOutput": "[5,6,7,1,2,3,4]",
        "isHidden": false
      },
      {
        "input": "[-1,-100,3,99]\n2",
        "expectedOutput": "[3,99,-1,-100]",
        "isHidden": false
      },
      {
        "input": "[1,2]\n3",
        "expectedOutput": "[2,1]",
        "isHidden": true
      }
    ],
    "hints": [
      "First, handle the case where `k` is larger than the array length: `k = k % nums.length`.",
      "An O(n) space solution is to create a new array and place elements at `(i + k) % n`.",
      "To solve this in O(1) space, think about reversing parts of the array.",
      "A 3-step reverse process works:\n  1. Reverse the *entire* array. (`[1,2,3,4,5,6,7]` -> `[7,6,5,4,3,2,1]`)\n  2. Reverse the first `k` elements. (`[7,6,5]` -> `[5,6,7]`. Array is now `[5,6,7,4,3,2,1]`)\n  3. Reverse the remaining `n - k` elements. (`[4,3,2,1]` -> `[1,2,3,4]`. Array is now `[5,6,7,1,2,3,4]`)"
    ],
    "solutions": [
      {
        "language": "javascript",
        "code": "var rotate = function(nums, k) {\n    const n = nums.length;\n    k = k % n; // Handle cases where k >= n\n\n    if (k === 0) {\n        return;\n    }\n\n    // Helper function to reverse a subarray in-place\n    function reverse(arr, start, end) {\n        while (start < end) {\n            [arr[start], arr[end]] = [arr[end], arr[start]];\n            start++;\n            end--;\n        }\n    }\n\n    // 1. Reverse the entire array\n    reverse(nums, 0, n - 1);\n    \n    // 2. Reverse the first k elements\n    reverse(nums, 0, k - 1);\n    \n    // 3. Reverse the remaining n - k elements\n    reverse(nums, k, n - 1);\n};",
        "explanation": "This solution achieves O(1) extra space by performing three in-place reversals. First, we normalize `k` by taking `k % n`. Then, we reverse the *entire* array. After this, the elements that *should* be at the front are now at the front, but in the wrong order. The elements that *should* be at the end are at the end, also in the wrong order. So, we perform two more reversals: 1. Reverse the first `k` elements (from `0` to `k-1`). 2. Reverse the remaining `n-k` elements (from `k` to `n-1`). This 3-step process correctly rotates the array.",
        "timeComplexity": "O(n)",
        "spaceComplexity": "O(1)"
      }
    ],
    "acceptanceRate": 37.8,
    "totalSubmissions": 18000,
    "correctSubmissions": 6804,
    "averageTime": 15
  },
  {
    "title": "Find the Duplicate Number",
    "description": "Given an array of integers `nums` containing `n + 1` integers where each integer is in the range `[1, n]` inclusive.\n\nThere is only **one repeated number** in `nums`. Return this repeated number.\n\nYou must solve the problem **without modifying the array `nums`** and using only **constant extra space**.\n\n**Example 1:**\nInput: nums = [1,3,4,2,2]\nOutput: 2\n\n**Example 2:**\nInput: nums = [3,1,3,4,2]\nOutput: 3\n\n**Constraints:**\n- 1 <= n <= 10^5\n- nums.length == n + 1\n- 1 <= nums[i] <= n\n- All the integers in `nums` appear only once except for precisely one integer which appears twice or more.",
    "difficulty": "medium",
    "topics": [
      "Array",
      "Two Pointers",
      "Binary Search",
      "Bit Manipulation"
    ],
    "companies": [
      "Amazon",
      "Microsoft",
      "Google",
      "Facebook"
    ],
    "constraints": [
      "nums.length == n + 1",
      "1 <= nums[i] <= n",
      "Only one repeated number.",
      "Must not modify array and use O(1) space."
    ],
    "examples": [
      {
        "input": "nums = [1,3,4,2,2]",
        "output": "2"
      },
      {
        "input": "nums = [3,1,3,4,2]",
        "output": "3"
      }
    ],
    "testCases": [
      {
        "input": "[1,3,4,2,2]",
        "expectedOutput": "2",
        "isHidden": false
      },
      {
        "input": "[3,1,3,4,2]",
        "expectedOutput": "3",
        "isHidden": false
      },
      {
        "input": "[2,2,2,2,2]",
        "expectedOutput": "2",
        "isHidden": true
      }
    ],
    "hints": [
      "The constraints (O(1) space, no modification) are tough. This rules out Hash Sets and sorting.",
      "Think about the array as a Linked List. Since all numbers are in `[1, n]` and the array has `n+1` elements, we can map `index -> nums[index]`.",
      "For example, in `[1,3,4,2,2]`: `0->1`, `1->3`, `2->4`, `3->2`, `4->2`. Notice that `3` and `4` both point to `2`.",
      "This structure *must* contain a cycle. The duplicate number is the *entrance* to the cycle.",
      "This is now the 'Linked List Cycle II' problem. Use Floyd's Tortoise and Hare (slow and fast pointers).",
      "Phase 1: `slow = nums[slow]`, `fast = nums[nums[fast]]`. They will meet somewhere inside the cycle.",
      "Phase 2: Reset `slow = 0`. Move `slow` and `fast` one step at a time (`slow = nums[slow]`, `fast = nums[fast]`). The node where they meet *this time* is the entrance to the cycle, which is the duplicate number."
    ],
    "solutions": [
      {
        "language": "javascript",
        "code": "var findDuplicate = function(nums) {\n    // Phase 1: Find the intersection point in the cycle\n    let slow = nums[0];\n    let fast = nums[0];\n\n    do {\n        slow = nums[slow];\n        fast = nums[nums[fast]];\n    } while (slow !== fast);\n\n    // Phase 2: Find the 'entrance' to the cycle\n    slow = nums[0]; // Reset one pointer to the start\n\n    while (slow !== fast) {\n        slow = nums[slow];\n        fast = nums[fast];\n    }\n\n    return slow;\n};",
        "explanation": "This solution uses Floyd's Tortoise and Hare (cycle detection) algorithm. We treat the array `nums` as a linked list where the value at `nums[i]` is a 'pointer' to index `nums[i]`. Since there are `n+1` numbers in the range `[1, n]`, there must be a cycle. The duplicate number is the *entrance* to this cycle. In Phase 1, a 'slow' pointer (1 step) and 'fast' pointer (2 steps) are moved until they meet. In Phase 2, the 'slow' pointer is reset to the start (`nums[0]`), and both pointers are moved 1 step at a time. The node where they meet in this phase is the entrance to the cycle, i.e., the duplicate number.",
        "timeComplexity": "O(n)",
        "spaceComplexity": "O(1)"
      }
    ],
    "acceptanceRate": 57.3,
    "totalSubmissions": 17000,
    "correctSubmissions": 9741,
    "averageTime": 19
  },
  {
    "title": "Palindrome Number",
    "description": "Given an integer `x`, return `true` if `x` is a palindrome, and `false` otherwise.\n\nAn integer is a palindrome when it reads the same backward as forward. For example, 121 is a palindrome while 123 is not.\n\n**Example 1:**\nInput: x = 121\nOutput: true\n\n**Example 2:**\nInput: x = -121\nOutput: false\nExplanation: From left to right, it reads -121. From right to left, it becomes 121-. Therefore it is not a palindrome.\n\n**Example 3:**\nInput: x = 10\nOutput: false\nExplanation: Reads 01 from right to left.\n\n**Constraints:**\n- -2^31 <= x <= 2^31 - 1\n\n**Follow up:** Could you solve it without converting the integer to a string?",
    "difficulty": "easy",
    "topics": [
      "Math"
    ],
    "companies": [
      "Amazon",
      "Facebook",
      "Apple"
    ],
    "constraints": [
      "-2^31 <= x <= 2^31 - 1"
    ],
    "examples": [
      {
        "input": "x = 121",
        "output": "true",
        "explanation": "121 reads as 121 from left to right and right to left."
      },
      {
        "input": "x = -121",
        "output": "false",
        "explanation": "Negative numbers are not palindromic in this definition."
      },
      {
        "input": "x = 10",
        "output": "false",
        "explanation": "Reads 01 from right to left."
      }
    ],
    "testCases": [
      {
        "input": "121",
        "expectedOutput": "true",
        "isHidden": false
      },
      {
        "input": "-121",
        "expectedOutput": "false",
        "isHidden": false
      },
      {
        "input": "10",
        "expectedOutput": "false",
        "isHidden": false
      }
    ],
    "hints": [
      "Converting the number to a string is a straightforward solution. Can you do it without that?",
      "Negative numbers are not palindromes.",
      "You can reverse the *second half* of the number and compare it to the *first half*.",
      "Be careful of overflow when reversing the entire number. Reversing only half avoids this.",
      "Handle edge cases like numbers ending in 0 (e.g., 10, 120)."
    ],
    "solutions": [
      {
        "language": "javascript",
        "code": "var isPalindrome = function(x) {\n    // Negative numbers and numbers ending in 0 (but not 0 itself) are not palindromes\n    if (x < 0 || (x % 10 === 0 && x !== 0)) {\n        return false;\n    }\n\n    let reversedHalf = 0;\n    while (x > reversedHalf) {\n        reversedHalf = reversedHalf * 10 + x % 10;\n        x = Math.floor(x / 10);\n    }\n\n    // For odd length numbers (e.g., 12321), x will be 12, reversedHalf will be 123.\n    // We can remove the middle digit 3 by 'reversedHalf / 10'.\n    return x === reversedHalf || x === Math.floor(reversedHalf / 10);\n};",
        "explanation": "This solution avoids string conversion. It handles edge cases like negative numbers. It works by reversing the *second half* of the number (`reversedHalf`) while simultaneously removing it from the first half (`x`). The loop stops when `x` is no longer greater than `reversedHalf`. At this point, if the number has an even length (e.g., 1221), `x` and `reversedHalf` will be equal (both 12). If it has an odd length (e.g., 12321), `x` will be 12 and `reversedHalf` will be 123. We handle the odd-length case by checking `x === Math.floor(reversedHalf / 10)`.",
        "timeComplexity": "O(log10 n)",
        "spaceComplexity": "O(1)"
      }
    ],
    "acceptanceRate": 51.4,
    "totalSubmissions": 20000,
    "correctSubmissions": 10280,
    "averageTime": 10
  },
  {
    "title": "Roman to Integer",
    "description": "Roman numerals are represented by seven different symbols: I, V, X, L, C, D and M.\n\nSymbol       Value\nI             1\nV             5\nX             10\nL             50\nC             100\nD             500\nM             1000\n\nFor example, 2 is written as II. 12 is written as XII (X + II). 27 is XXVII (XX + V + II).\n\nRoman numerals are usually written largest to smallest from left to right. However, the numeral for four is not IIII. Instead, it is IV. This is because I before V means 5 - 1 = 4. The same applies to nine, IX (10 - 1). There are six instances where subtraction is used:\n- I can be placed before V (5) and X (10) to make 4 and 9.\n- X can be placed before L (50) and C (100) to make 40 and 90.\n- C can be placed before D (500) and M (1000) to make 400 and 900.\n\nGiven a roman numeral, convert it to an integer.\n\n**Example 1:**\nInput: s = \"III\"\nOutput: 3\n\n**Example 2:**\nInput: s = \"LVIII\"\nOutput: 58 (L = 50, V = 5, III = 3)\n\n**Example 3:**\nInput: s = \"MCMXCIV\"\nOutput: 1994 (M = 1000, CM = 900, XC = 90, IV = 4)\n\n**Constraints:**\n- 1 <= s.length <= 15\n- `s` contains only the characters ('I', 'V', 'X', 'L', 'C', 'D', 'M').\n- It is guaranteed that `s` is a valid roman numeral in the range [1, 3999].",
    "difficulty": "easy",
    "topics": [
      "String",
      "Hash Table",
      "Math"
    ],
    "companies": [
      "Amazon",
      "Facebook",
      "Microsoft",
      "Apple"
    ],
    "constraints": [
      "1 <= s.length <= 15",
      "s contains only valid roman numeral characters.",
      "It is guaranteed that s is a valid roman numeral in the range [1, 3999]."
    ],
    "examples": [
      {
        "input": "s = \"III\"",
        "output": "3",
        "explanation": "I + I + I = 3."
      },
      {
        "input": "s = \"MCMXCIV\"",
        "output": "1994",
        "explanation": "M (1000) + CM (900) + XC (90) + IV (4) = 1994."
      }
    ],
    "testCases": [
      {
        "input": "\"III\"",
        "expectedOutput": "3",
        "isHidden": false
      },
      {
        "input": "\"LVIII\"",
        "expectedOutput": "58",
        "isHidden": false
      },
      {
        "input": "\"MCMXCIV\"",
        "expectedOutput": "1994",
        "isHidden": false
      }
    ],
    "hints": [
      "Create a hash map to store the values of each Roman symbol (I=1, V=5, etc.).",
      "Iterate through the string. The key is to handle the subtraction cases.",
      "If you iterate from left to right, check if `s[i]` is smaller than `s[i+1]`. If it is (e.g., 'I' before 'V'), it's a subtraction case. Add `map[s[i+1]] - map[s[i]]` to the total and skip the next character (`i++`).",
      "Alternatively, a simpler logic: iterate from left to right. Add `map[s[i]]` to the total. If `map[s[i-1]] < map[s[i]]` (e.g., at 'V' in 'IV'), you know you've added 'I' *and* 'V'. You need to subtract 'I' *twice* (`total -= 2 * map[s[i-1]]`)."
    ],
    "solutions": [
      {
        "language": "javascript",
        "code": "var romanToInt = function(s) {\n    const map = {\n        'I': 1,\n        'V': 5,\n        'X': 10,\n        'L': 50,\n        'C': 100,\n        'D': 500,\n        'M': 1000\n    };\n    \n    let total = 0;\n    \n    for (let i = 0; i < s.length; i++) {\n        const currentVal = map[s[i]];\n        const nextVal = map[s[i + 1]];\n\n        // Check for subtraction case\n        if (i < s.length - 1 && currentVal < nextVal) {\n            total += (nextVal - currentVal);\n            i++; // Skip the next character as it's already processed\n        } else {\n            // Normal addition case\n            total += currentVal;\n        }\n    }\n    \n    return total;\n};",
        "explanation": "This solution uses a hash map to store the value of each Roman numeral. It iterates through the string from left to right. In each iteration, it looks at the `currentVal` and the `nextVal`. If `currentVal < nextVal`, it signifies a subtraction case (like 'IV' or 'CM'). In this case, it adds the difference (`nextVal - currentVal`) to the `total` and skips the next character by incrementing `i` an extra time. Otherwise, it's a normal addition case, and it just adds `currentVal` to the `total`.",
        "timeComplexity": "O(n)",
        "spaceComplexity": "O(1)"
      }
    ],
    "acceptanceRate": 57.6,
    "totalSubmissions": 18000,
    "correctSubmissions": 10368,
    "averageTime": 12
  },
  {
    "title": "Maximum Product Subarray",
    "description": "Given an integer array `nums`, find a contiguous non-empty subarray within the array that has the largest product, and return the product.\n\nThe test cases are generated so that the answer will fit in a 32-bit integer.\n\n**Example 1:**\nInput: nums = [2,3,-2,4]\nOutput: 6\nExplanation: [2,3] has the largest product 6.\n\n**Example 2:**\nInput: nums = [-2,0,-1]\nOutput: 0\nExplanation: The result cannot be 2, because [-2,-1] is not a subarray.\n\n**Constraints:**\n- 1 <= nums.length <= 2 * 10^4\n- -10 <= nums[i] <= 10\n- The product of any prefix or suffix of `nums` is guaranteed to fit in a 32-bit integer.",
    "difficulty": "medium",
    "topics": [
      "Array",
      "Dynamic Programming"
    ],
    "companies": [
      "Amazon",
      "Microsoft",
      "LinkedIn",
      "Google"
    ],
    "constraints": [
      "1 <= nums.length <= 2 * 10^4",
      "-10 <= nums[i] <= 10"
    ],
    "examples": [
      {
        "input": "nums = [2,3,-2,4]",
        "output": "6",
        "explanation": "The subarray [2,3] has the largest product 6."
      },
      {
        "input": "nums = [-2,0,-1]",
        "output": "0",
        "explanation": "[0] is a valid subarray. [-2,-1] is not."
      }
    ],
    "testCases": [
      {
        "input": "[2,3,-2,4]",
        "expectedOutput": "6",
        "isHidden": false
      },
      {
        "input": "[-2,0,-1]",
        "expectedOutput": "0",
        "isHidden": false
      },
      {
        "input": "[-3,-1,-1]",
        "expectedOutput": "3",
        "isHidden": true
      },
      {
        "input": "[-2,3,-4]",
        "expectedOutput": "24",
        "isHidden": true
      }
    ],
    "hints": [
      "This is similar to 'Maximum Subarray' (Kadane's Algorithm), but with a twist.",
      "The twist is negative numbers. A large negative product, when multiplied by another negative number, can become a large positive product.",
      "You need to keep track of *two* values at each step: `currentMax` (the max product ending at this position) and `currentMin` (the min product ending at this position).",
      "At each `num`, the new `currentMax` is the max of `num`, `num * oldCurrentMax`, and `num * oldCurrentMin`.",
      "Similarly, the new `currentMin` is the min of `num`, `num * oldCurrentMax`, and `num * oldCurrentMin`.",
      "Keep a separate `globalMax` to track the largest `currentMax` seen."
    ],
    "solutions": [
      {
        "language": "javascript",
        "code": "var maxProduct = function(nums) {\n    if (nums.length === 0) return 0;\n\n    let globalMax = nums[0];\n    let currentMax = nums[0];\n    let currentMin = nums[0];\n\n    for (let i = 1; i < nums.length; i++) {\n        const num = nums[i];\n        \n        // Store old currentMax, as it's needed for currentMin calculation\n        const tempMax = currentMax;\n\n        // The new max is the max of:\n        // 1. The number itself (starting a new subarray)\n        // 2. The number * the previous max (positive * positive)\n        // 3. The number * the previous min (negative * negative)\n        currentMax = Math.max(num, num * currentMax, num * currentMin);\n\n        // The new min is the min of:\n        // 1. The number itself\n        // 2. The number * the previous max (positive * negative)\n        // 3. The number * the previous min (positive * positive, but smaller)\n        currentMin = Math.min(num, num * tempMax, num * currentMin);\n\n        // Update the overall global max\n        globalMax = Math.max(globalMax, currentMax);\n    }\n\n    return globalMax;\n};",
        "explanation": "This solution uses a modified Kadane's algorithm. We must track both the `currentMax` product and `currentMin` product ending at index `i`. This is because a negative `currentMin` (e.g., -12) multiplied by a negative `num` (e.g., -2) can become the new `currentMax` (24). In each iteration, we calculate the new `currentMax` and `currentMin` by considering three possibilities: starting a new subarray (just `num`), multiplying `num` by the old `currentMax`, or multiplying `num` by the old `currentMin`. We update `globalMax` at each step.",
        "timeComplexity": "O(n)",
        "spaceComplexity": "O(1)"
      }
    ],
    "acceptanceRate": 34.1,
    "totalSubmissions": 14000,
    "correctSubmissions": 4774,
    "averageTime": 20
  },
  {
    "title": "Combinations",
    "description": "Given two integers `n` and `k`, return all possible combinations of `k` numbers chosen from the range `[1, n]`.\n\nYou may return the answer in any order.\n\n**Example 1:**\nInput: n = 4, k = 2\nOutput: [[1,2],[1,3],[1,4],[2,3],[2,4],[3,4]]\n\n**Example 2:**\nInput: n = 1, k = 1\nOutput: [[1]]\n\n**Constraints:**\n- 1 <= n <= 20\n- 1 <= k <= n",
    "difficulty": "medium",
    "topics": [
      "Backtracking"
    ],
    "companies": [
      "Amazon",
      "Microsoft",
      "Google",
      "Facebook"
    ],
    "constraints": [
      "1 <= n <= 20",
      "1 <= k <= n"
    ],
    "examples": [
      {
        "input": "n = 4, k = 2",
        "output": "[[1,2],[1,3],[1,4],[2,3],[2,4],[3,4]]",
        "explanation": "All 6 combinations of 2 numbers from [1, 2, 3, 4]."
      },
      {
        "input": "n = 1, k = 1",
        "output": "[[1]]",
        "explanation": "Only one combination."
      }
    ],
    "testCases": [
      {
        "input": "4\n2",
        "expectedOutput": "[[1,2],[1,3],[1,4],[2,3],[2,4],[3,4]]",
        "isHidden": false
      },
      {
        "input": "1\n1",
        "expectedOutput": "[[1]]",
        "isHidden": false
      }
    ],
    "hints": [
      "This is a standard backtracking problem.",
      "Define a recursive function `backtrack(startIndex, currentPath)`.",
      "The base case: if `currentPath.length == k`, you have a valid combination. Add a *copy* to the results and return.",
      "Recursive step: Iterate `i` from `startIndex` to `n`.",
      "1. 'Choose' `i`: add it to `currentPath`.",
      "2. 'Explore': Recurse with `backtrack(i + 1, currentPath)`.",
      "3. 'Unchoose': Pop `i` from `currentPath`."
    ],
    "solutions": [
      {
        "language": "javascript",
        "code": "var combine = function(n, k) {\n    const results = [];\n\n    /**\n     * @param {number} start - The starting number to choose from (e.g., 1, 2, ...)\n     * @param {number[]} currentPath - The current combination being built\n     */\n    function backtrack(start, currentPath) {\n        // Base case: The combination is complete (has k numbers)\n        if (currentPath.length === k) {\n            results.push([...currentPath]);\n            return;\n        }\n\n        // Optimization: if remaining numbers < numbers needed, stop\n        if (n - start + 1 < k - currentPath.length) {\n            return;\n        }\n\n        // Recursive step: Explore all choices from 'start'\n        for (let i = start; i <= n; i++) {\n            // 1. Choose\n            currentPath.push(i);\n\n            // 2. Explore (pass i + 1 to avoid duplicates and self-use)\n            backtrack(i + 1, currentPath);\n\n            // 3. Unchoose (Backtrack)\n            currentPath.pop();\n        }\n    }\n\n    backtrack(1, []);\n    return results;\n};",
        "explanation": "This solution uses backtracking. The `backtrack` function builds combinations. It takes a `start` number (from 1 to `n`) and the `currentPath`. The base case is when `currentPath.length === k`, at which point we add a copy to `results`. The recursive step iterates from `i = start` to `n`. For each `i`, we 'choose' it (push to path), 'explore' by recursing with `backtrack(i + 1, ...)` (using `i + 1` to ensure we only pick larger numbers, preventing duplicates like `[1,2]` and `[2,1]`), and then 'unchoose' it (pop from path).",
        "timeComplexity": "O(k * C(n, k))",
        "spaceComplexity": "O(k)"
      }
    ],
    "acceptanceRate": 61.3,
    "totalSubmissions": 8000,
    "correctSubmissions": 4904,
    "averageTime": 21
  },
  {
    "title": "Subsets II",
    "description": "Given an integer array `nums` that may contain **duplicates**, return all possible subsets (the power set).\n\nThe solution set must not contain duplicate subsets. Return the solution in any order.\n\n**Example 1:**\nInput: nums = [1,2,2]\nOutput: [[],[1],[1,2],[1,2,2],[2],[2,2]]\n\n**Example 2:**\nInput: nums = [0]\nOutput: [[],[0]]\n\n**Constraints:**\n- 1 <= nums.length <= 10\n- -10 <= nums[i] <= 10",
    "difficulty": "medium",
    "topics": [
      "Array",
      "Backtracking"
    ],
    "companies": [
      "Amazon",
      "Facebook",
      "Google",
      "Microsoft"
    ],
    "constraints": [
      "1 <= nums.length <= 10",
      "-10 <= nums[i] <= 10"
    ],
    "examples": [
      {
        "input": "nums = [1,2,2]",
        "output": "[[],[1],[1,2],[1,2,2],[2],[2,2]]",
        "explanation": "Note that [1,2] is only included once."
      }
    ],
    "testCases": [
      {
        "input": "[1,2,2]",
        "expectedOutput": "[[],[1],[1,2],[1,2,2],[2],[2,2]]",
        "isHidden": false
      },
      {
        "input": "[0]",
        "expectedOutput": "[[],[0]]",
        "isHidden": false
      },
      {
        "input": "[4,4,4,1,4]",
        "expectedOutput": "[[],[1],[1,4],[1,4,4],[1,4,4,4],[1,4,4,4,4],[4],[4,4],[4,4,4],[4,4,4,4]]",
        "isHidden": true
      }
    ],
    "hints": [
      "This is a variation of 'Subsets I', but with duplicates.",
      "To handle duplicates, you must first **sort** the `nums` array.",
      "Use the same backtracking approach: `backtrack(startIndex, currentSubset)`.",
      "Add `currentSubset` to results at every step.",
      "In the `for` loop (from `i = startIndex`...): add a condition to skip duplicates.",
      "The condition is: `if (i > startIndex && nums[i] === nums[i - 1]) continue;`",
      "This ensures that you only pick the *first* occurrence of a duplicate number at any given decision level, thus pruning all duplicate branches."
    ],
    "solutions": [
      {
        "language": "javascript",
        "code": "var subsetsWithDup = function(nums) {\n    const results = [];\n    // 1. Sort the array to handle duplicates\n    nums.sort((a, b) => a - b);\n\n    function backtrack(startIndex, currentSubset) {\n        // Add a copy of the current subset\n        results.push([...currentSubset]);\n\n        for (let i = startIndex; i < nums.length; i++) {\n            // 2. Skip duplicates\n            // If this is not the first element at this level (i > startIndex)\n            // and it's the same as the previous element, skip it.\n            if (i > startIndex && nums[i] === nums[i - 1]) {\n                continue;\n            }\n\n            // 1. Choose\n            currentSubset.push(nums[i]);\n            // 2. Explore\n            backtrack(i + 1, currentSubset);\n            // 3. Unchoose\n            currentSubset.pop();\n        }\n    }\n\n    backtrack(0, []);\n    return results;\n};",
        "explanation": "This solution builds on 'Subsets I'. The key difference is handling duplicates. To do this, we first **sort** `nums`. This groups all duplicate numbers together. Then, in our `backtrack` function's `for` loop, we add a condition: `if (i > startIndex && nums[i] === nums[i - 1]) continue;`. This check ensures that if we have a set of duplicates (e.g., `[2,2,2]`), we only ever start a new path with the *first* one. For example, it allows `[1,2,2]` but skips the path that would be formed by picking `1` and the *second* `2`, as that would also lead to `[1,2,2]`, creating a duplicate subset.",
        "timeComplexity": "O(n * 2^n)",
        "spaceComplexity": "O(n)"
      }
    ],
    "acceptanceRate": 51.2,
    "totalSubmissions": 8000,
    "correctSubmissions": 4096,
    "averageTime": 17
  },
  {
    "title": "Combination Sum II",
    "description": "Given a collection of candidate numbers `candidates` and a `target` integer, find all unique combinations in `candidates` where the candidate numbers sum to `target`.\n\nEach number in `candidates` may only be used **once** in the combination.\n\nNote: The solution set must not contain duplicate combinations.\n\n**Example 1:**\nInput: candidates = [10,1,2,7,6,1,5], target = 8\nOutput: [[1,1,6],[1,2,5],[1,7],[2,6]]\n\n**Example 2:**\nInput: candidates = [2,5,2,1,2], target = 5\nOutput: [[1,2,2],[5]]\n\n**Constraints:**\n- 1 <= candidates.length <= 100\n- 1 <= candidates[i] <= 50\n- 1 <= target <= 30",
    "difficulty": "medium",
    "topics": [
      "Array",
      "Backtracking"
    ],
    "companies": [
      "Amazon",
      "Facebook",
      "Google",
      "Microsoft"
    ],
    "constraints": [
      "1 <= candidates.length <= 100",
      "1 <= candidates[i] <= 50",
      "1 <= target <= 30"
    ],
    "examples": [
      {
        "input": "candidates = [10,1,2,7,6,1,5], target = 8",
        "output": "[[1,1,6],[1,2,5],[1,7],[2,6]]",
        "explanation": "The 1s can be used together."
      },
      {
        "input": "candidates = [2,5,2,1,2], target = 5",
        "output": "[[1,2,2],[5]]",
        "explanation": "The three 2s are available, but we only use two."
      }
    ],
    "testCases": [
      {
        "input": "[10,1,2,7,6,1,5]\n8",
        "expectedOutput": "[[1,1,6],[1,2,5],[1,7],[2,6]]",
        "isHidden": false
      },
      {
        "input": "[2,5,2,1,2]\n5",
        "expectedOutput": "[[1,2,2],[5]]",
        "isHidden": false
      }
    ],
    "hints": [
      "This is a combination of 'Combination Sum' and 'Subsets II'.",
      "First, **sort** the `candidates` array.",
      "Use backtracking `backtrack(startIndex, currentSum, currentPath)`.",
      "Base cases: `currentSum == target` (add to results) or `currentSum > target` (prune).",
      "Recursive step: Iterate `i` from `startIndex` to the end.",
      "Add the 'skip duplicates' logic: `if (i > startIndex && candidates[i] === candidates[i - 1]) continue;`",
      "1. Choose: `currentPath.push(candidates[i])`",
      "2. Explore: Recurse with `backtrack(i + 1, ...)` (pass `i + 1` because each number can be used only *once*).",
      "3. Unchoose: `currentPath.pop()`"
    ],
    "solutions": [
      {
        "language": "javascript",
        "code": "var combinationSum2 = function(candidates, target) {\n    const results = [];\n    // 1. Sort to handle duplicates\n    candidates.sort((a, b) => a - b);\n\n    function backtrack(startIndex, currentSum, currentPath) {\n        if (currentSum === target) {\n            results.push([...currentPath]);\n            return;\n        }\n\n        if (currentSum > target) {\n            return;\n        }\n\n        for (let i = startIndex; i < candidates.length; i++) {\n            // 2. Skip duplicates\n            if (i > startIndex && candidates[i] === candidates[i - 1]) {\n                continue;\n            }\n\n            // 1. Choose\n            currentPath.push(candidates[i]);\n            // 2. Explore (pass i + 1, as each number can be used only once)\n            backtrack(i + 1, currentSum + candidates[i], currentPath);\n            // 3. Unchoose\n            currentPath.pop();\n        }\n    }\n\n    backtrack(0, 0, []);\n    return results;\n};",
        "explanation": "This backtracking solution has two key differences from 'Combination Sum I'. First, to avoid duplicate combinations, we **sort** the `candidates` array. Then, in our `for` loop, we add the condition `if (i > startIndex && candidates[i] === candidates[i - 1]) continue;` to skip over duplicates at the same decision level. Second, to ensure each number is used only *once* per combination, we pass `i + 1` (instead of `i`) in the recursive `backtrack` call. This prevents the same *index* from being reused.",
        "timeComplexity": "O(2^n * n)",
        "spaceComplexity": "O(n)"
      }
    ],
    "acceptanceRate": 49.3,
    "totalSubmissions": 9000,
    "correctSubmissions": 4437,
    "averageTime": 24
  },
  {
    "title": "Permutations",
    "description": "Given an array `nums` of **distinct** integers, return all the possible permutations. You can return the answer in any order.\n\n**Example 1:**\nInput: nums = [1,2,3]\nOutput: [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]\n\n**Example 2:**\nInput: nums = [0,1]\nOutput: [[0,1],[1,0]]\n\n**Constraints:**\n- 1 <= nums.length <= 6\n- -10 <= nums[i] <= 10\n- All the integers of `nums` are **unique**.",
    "difficulty": "medium",
    "topics": [
      "Array",
      "Backtracking"
    ],
    "companies": [
      "Amazon",
      "Microsoft",
      "Facebook",
      "LinkedIn"
    ],
    "constraints": [
      "1 <= nums.length <= 6",
      "-10 <= nums[i] <= 10",
      "All integers are unique."
    ],
    "examples": [
      {
        "input": "nums = [1,2,3]",
        "output": "[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]",
        "explanation": "All 3! = 6 permutations."
      }
    ],
    "testCases": [
      {
        "input": "[1,2,3]",
        "expectedOutput": "[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]",
        "isHidden": false
      },
      {
        "input": "[0,1]",
        "expectedOutput": "[[0,1],[1,0]]",
        "isHidden": false
      }
    ],
    "hints": [
      "This is a backtracking problem.",
      "The base case for the recursion is when the `currentPath` (permutation) being built has the same length as `nums`.",
      "You need a way to track which numbers have already been *used* in the `currentPath`. A `visited` boolean array or a Hash Set is suitable.",
      "Recursive step: Iterate `i` from `0` to `n-1`.",
      "If `nums[i]` has *not* been visited:\n  1. 'Choose': Add `nums[i]` to `currentPath` and mark it as visited.\n  2. 'Explore': Recurse.\n  3. 'Unchoose': Pop `nums[i]` from `currentPath` and mark it as unvisited (this is the backtracking)."
    ],
    "solutions": [
      {
        "language": "javascript",
        "code": "var permute = function(nums) {\n    const results = [];\n    const n = nums.length;\n    const visited = new Array(n).fill(false);\n\n    function backtrack(currentPath) {\n        // Base case: The permutation is complete\n        if (currentPath.length === n) {\n            results.push([...currentPath]);\n            return;\n        }\n\n        // Recursive step: Try every number\n        for (let i = 0; i < n; i++) {\n            // Only use numbers that haven't been visited in this path\n            if (!visited[i]) {\n                // 1. Choose\n                visited[i] = true;\n                currentPath.push(nums[i]);\n\n                // 2. Explore\n                backtrack(currentPath);\n\n                // 3. Unchoose (Backtrack)\n                currentPath.pop();\n                visited[i] = false;\n            }\n        }\n    }\n\n    backtrack([]);\n    return results;\n};",
        "explanation": "This backtracking solution builds permutations one element at a time. It uses a `visited` array to keep track of which *indices* of `nums` have been included in the `currentPath`. The `backtrack` function's base case is when `currentPath.length === n`, at which point a full permutation is found. In the recursive step, it iterates through all numbers in `nums`. If a number at index `i` has not been `visited`, we 'choose' it (mark `visited[i] = true`, push `nums[i]` to path), 'explore' by recursing, and then 'unchoose' it (pop from path, mark `visited[i] = false`) to allow other permutations to be formed.",
        "timeComplexity": "O(n * n!)",
        "spaceComplexity": "O(n)"
      }
    ],
    "acceptanceRate": 70.3,
    "totalSubmissions": 10000,
    "correctSubmissions": 7030,
    "averageTime": 19
  },
  {
    "title": "Permutations II",
    "description": "Given a collection of numbers, `nums`, that might contain **duplicates**, return all possible **unique** permutations in any order.\n\n**Example 1:**\nInput: nums = [1,1,2]\nOutput: [[1,1,2],[1,2,1],[2,1,1]]\n\n**Example 2:**\nInput: nums = [1,2,3]\nOutput: [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]\n\n**Constraints:**\n- 1 <= nums.length <= 8\n- -10 <= nums[i] <= 10",
    "difficulty": "medium",
    "topics": [
      "Array",
      "Backtracking"
    ],
    "companies": [
      "Amazon",
      "Microsoft",
      "Facebook",
      "LinkedIn"
    ],
    "constraints": [
      "1 <= nums.length <= 8",
      "-10 <= nums[i] <= 10"
    ],
    "examples": [
      {
        "input": "nums = [1,1,2]",
        "output": "[[1,1,2],[1,2,1],[2,1,1]]",
        "explanation": "All unique permutations."
      },
      {
        "input": "nums = [1,2,3]",
        "output": "[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]",
        "explanation": "Same as Permutations I."
      }
    ],
    "testCases": [
      {
        "input": "[1,1,2]",
        "expectedOutput": "[[1,1,2],[1,2,1],[2,1,1]]",
        "isHidden": false
      },
      {
        "input": "[1,2,3]",
        "expectedOutput": "[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]",
        "isHidden": false
      }
    ],
    "hints": [
      "This combines 'Permutations I' with the duplicate handling from 'Subsets II'.",
      "First, **sort** the `nums` array.",
      "Use the same backtracking setup: `backtrack(currentPath, visited)`.",
      "In the `for` loop (from `i = 0` to `n-1`):",
      "Add the 'skip duplicates' logic: `if (i > 0 && nums[i] === nums[i - 1] && !visited[i - 1]) continue;`",
      "This condition is tricky: it skips a number if it's the same as the one before it *and* the one before it has *not* been visited (meaning the one before it has already been 'un-chosen' in the recursive stack, and we're now at a new decision level)."
    ],
    "solutions": [
      {
        "language": "javascript",
        "code": "var permuteUnique = function(nums) {\n    const results = [];\n    const n = nums.length;\n    const visited = new Array(n).fill(false);\n    // 1. Sort to handle duplicates\n    nums.sort((a, b) => a - b);\n\n    function backtrack(currentPath) {\n        if (currentPath.length === n) {\n            results.push([...currentPath]);\n            return;\n        }\n\n        for (let i = 0; i < n; i++) {\n            // 2. Skip visited nodes\n            if (visited[i]) {\n                continue;\n            }\n            \n            // 3. Skip duplicates\n            // If this num is same as previous, and previous *wasn't* used\n            // in this path, skip this num to avoid dup permutations.\n            if (i > 0 && nums[i] === nums[i - 1] && !visited[i - 1]) {\n                continue;\n            }\n\n            // 1. Choose\n            visited[i] = true;\n            currentPath.push(nums[i]);\n\n            // 2. Explore\n            backtrack(currentPath);\n\n            // 3. Unchoose (Backtrack)\n            currentPath.pop();\n            visited[i] = false;\n        }\n    }\n\n    backtrack([]);\n    return results;\n};",
        "explanation": "This solution builds on 'Permutations I' by adding logic to handle duplicates. First, we **sort** `nums`. We use a `visited` array just as before. The key addition is the duplicate-skipping condition: `if (i > 0 && nums[i] === nums[i - 1] && !visited[i - 1])`. This check ensures that if we have duplicates (e.g., `[1, 1, 2]`), we only generate permutations starting with the *first* `1` on the first level. The `!visited[i - 1]` part is crucial: it allows the *second* `1` to be used *after* the first `1` (e.g., in `[1, 1, 2]`), but prevents it from being the *start* of a new path (e.g., `[1 (second), 1 (first), 2]`) if the first `1` has already been 'un-chosen'.",
        "timeComplexity": "O(n * n!)",
        "spaceComplexity": "O(n)"
      }
    ],
    "acceptanceRate": 53.7,
    "totalSubmissions": 8000,
    "correctSubmissions": 4296,
    "averageTime": 24
  },
  {
    "title": "Binary Tree Inorder Traversal",
    "description": "Given the `root` of a binary tree, return the *inorder* traversal of its nodes' values.\n\n(Inorder: Left, Root, Right)\n\n**Example 1:**\nInput: root = [1,null,2,3]\nOutput: [1,3,2]\n\n**Example 2:**\nInput: root = []\nOutput: []\n\n**Example 3:**\nInput: root = [1]\nOutput: [1]\n\n**Constraints:**\n- The number of nodes in the tree is in the range [0, 100].\n- -100 <= Node.val <= 100\n\n**Follow up:** Recursive solution is trivial, could you do it iteratively?",
    "difficulty": "easy",
    "topics": [
      "Tree",
      "Depth-First Search",
      "Stack",
      "Recursion"
    ],
    "companies": [
      "Amazon",
      "Microsoft",
      "Google"
    ],
    "constraints": [
      "The number of nodes in the tree is in the range [0, 100].",
      "-100 <= Node.val <= 100"
    ],
    "examples": [
      {
        "input": "root = [1,null,2,3]",
        "output": "[1,3,2]",
        "explanation": "Inorder traversal: Left (null) -> Root (1) -> Right (2) -> Left (3) -> Root (2) -> Right (null) = [1, 3, 2]"
      }
    ],
    "testCases": [
      {
        "input": "[1,null,2,3]",
        "expectedOutput": "[1,3,2]",
        "isHidden": false
      },
      {
        "input": "[]",
        "expectedOutput": "[]",
        "isHidden": false
      },
      {
        "input": "[2,3,null,1]",
        "expectedOutput": "[1,3,2]",
        "isHidden": true
      }
    ],
    "hints": [
      "For the recursive solution: define `dfs(node)`. If `node` is null, return. Call `dfs(node.left)`, then add `node.val` to the result, then call `dfs(node.right)`.",
      "For the iterative solution, you need a `stack`.",
      "Push the `root` onto the stack and go left: `while (curr) { stack.push(curr); curr = curr.left; }`",
      "Once `curr` is null, you've gone as far left as possible. Pop from the stack: `curr = stack.pop()`. This is the node to visit. Add `curr.val` to the result.",
      "Now, you must process the right subtree: `curr = curr.right;`. Repeat the process."
    ],
    "solutions": [
      {
        "language": "javascript",
        "code": "/**\n * Definition for a binary tree node.\n * function TreeNode(val, left, right) {\n * this.val = (val===undefined ? 0 : val)\n * this.left = (left===undefined ? null : left)\n * this.right = (right===undefined ? null : right)\n * }\n */\n\n// Iterative Solution\nvar inorderTraversal = function(root) {\n    const result = [];\n    const stack = [];\n    let curr = root;\n\n    while (curr !== null || stack.length > 0) {\n        // 1. Go as far left as possible\n        while (curr !== null) {\n            stack.push(curr);\n            curr = curr.left;\n        }\n\n        // 2. 'curr' is null. Pop from stack (this is the node to visit)\n        curr = stack.pop();\n        result.push(curr.val);\n\n        // 3. Now, go right\n        curr = curr.right;\n    }\n\n    return result;\n};",
        "explanation": "This solution provides the iterative approach as requested by the follow-up. It uses a `stack` to simulate the recursion. A `curr` pointer tracks the current node. The `while` loop continues as long as `curr` is not null or the `stack` is not empty. Inside, a nested `while` loop pushes `curr` and all its left children onto the stack. When this inner loop breaks (`curr` is null), we've found the leftmost node. We `pop` it from the stack, add its value to `result`, and then set `curr = curr.right` to process its right subtree. The outer loop then repeats, finding the leftmost node of this new `curr`.",
        "timeComplexity": "O(n)",
        "spaceComplexity": "O(h)"
      }
    ],
    "acceptanceRate": 70.2,
    "totalSubmissions": 15000,
    "correctSubmissions": 10530,
    "averageTime": 9
  },
  {
    "title": "Binary Tree Preorder Traversal",
    "description": "Given the `root` of a binary tree, return the *preorder* traversal of its nodes' values.\n\n(Preorder: Root, Left, Right)\n\n**Example 1:**\nInput: root = [1,null,2,3]\nOutput: [1,2,3]\n\n**Example 2:**\nInput: root = []\nOutput: []\n\n**Example 3:**\nInput: root = [1]\nOutput: [1]\n\n**Constraints:**\n- The number of nodes in the tree is in the range [0, 100].\n- -100 <= Node.val <= 100",
    "difficulty": "easy",
    "topics": [
      "Tree",
      "Depth-First Search",
      "Stack",
      "Recursion"
    ],
    "companies": [
      "Amazon",
      "Microsoft",
      "Google"
    ],
    "constraints": [
      "The number of nodes in the tree is in the range [0, 100].",
      "-100 <= Node.val <= 100"
    ],
    "examples": [
      {
        "input": "root = [1,null,2,3]",
        "output": "[1,2,3]",
        "explanation": "Preorder traversal: Root (1) -> Left (null) -> Right (2) -> Root (2) -> Left (3) -> ... = [1, 2, 3]"
      }
    ],
    "testCases": [
      {
        "input": "[1,null,2,3]",
        "expectedOutput": "[1,2,3]",
        "isHidden": false
      },
      {
        "input": "[]",
        "expectedOutput": "[]",
        "isHidden": false
      },
      {
        "input": "[3,1,2]",
        "expectedOutput": "[3,1,2]",
        "isHidden": true
      }
    ],
    "hints": [
      "Recursive solution: define `dfs(node)`. If `node` is null, return. Add `node.val` to result *first*, then call `dfs(node.left)`, then call `dfs(node.right)`.",
      "Iterative solution with a stack is very direct for Preorder.",
      "Initialize `stack = [root]`. Loop while `stack` is not empty.",
      "Pop a node: `curr = stack.pop()`. Add `curr.val` to the result.",
      "**Crucially**, push the `right` child onto the stack *first*, then push the `left` child. This ensures the `left` child is processed before the `right` child (LIFO)."
    ],
    "solutions": [
      {
        "language": "javascript",
        "code": "/**\n * Definition for a binary tree node.\n * function TreeNode(val, left, right) {\n * this.val = (val===undefined ? 0 : val)\n * this.left = (left===undefined ? null : left)\n * this.right = (right===undefined ? null : right)\n * }\n */\n\n// Iterative Solution\nvar preorderTraversal = function(root) {\n    if (!root) {\n        return [];\n    }\n\n    const result = [];\n    const stack = [root];\n\n    while (stack.length > 0) {\n        const node = stack.pop();\n        \n        // 1. Visit Root\n        result.push(node.val);\n\n        // 2. Push Right child (so it's processed *after* left)\n        if (node.right) {\n            stack.push(node.right);\n        }\n        // 3. Push Left child (so it's processed *before* right)\n        if (node.left) {\n            stack.push(node.left);\n        }\n    }\n\n    return result;\n};",
        "explanation": "This is the iterative solution using a Stack. It perfectly mimics the 'Root, Left, Right' order. We initialize the `stack` with the `root`. While the stack is not empty, we `pop` a node. We immediately 'visit' it by adding its `val` to the `result`. Then, we push its `right` child (if it exists) onto the stack, followed by its `left` child (if it exists). Because a stack is Last-In-First-Out (LIFO), the `left` child will be popped and processed *before* the `right` child, achieving the correct Preorder traversal.",
        "timeComplexity": "O(n)",
        "spaceComplexity": "O(h)"
      }
    ],
    "acceptanceRate": 63.8,
    "totalSubmissions": 14000,
    "correctSubmissions": 8932,
    "averageTime": 9
  },
  {
    "title": "Binary Tree Postorder Traversal",
    "description": "Given the `root` of a binary tree, return the *postorder* traversal of its nodes' values.\n\n(Postorder: Left, Right, Root)\n\n**Example 1:**\nInput: root = [1,null,2,3]\nOutput: [3,2,1]\n\n**Example 2:**\nInput: root = []\nOutput: []\n\n**Example 3:**\nInput: root = [1]\nOutput: [1]\n\n**Constraints:**\n- The number of nodes in the tree is in the range [0, 100].\n- -100 <= Node.val <= 100",
    "difficulty": "easy",
    "topics": [
      "Tree",
      "Depth-First Search",
      "Stack",
      "Recursion"
    ],
    "companies": [
      "Amazon",
      "Microsoft",
      "Google"
    ],
    "constraints": [
      "The number of nodes in the tree is in the range [0, 100].",
      "-100 <= Node.val <= 100"
    ],
    "examples": [
      {
        "input": "root = [1,null,2,3]",
        "output": "[3,2,1]",
        "explanation": "Postorder traversal: Left (null) -> Right (2) -> Left (3) -> Right (null) -> Root (2) -> Root (1) = [3, 2, 1]"
      }
    ],
    "testCases": [
      {
        "input": "[1,null,2,3]",
        "expectedOutput": "[3,2,1]",
        "isHidden": false
      },
      {
        "input": "[]",
        "expectedOutput": "[]",
        "isHidden": false
      },
      {
        "input": "[3,1,2]",
        "expectedOutput": "[1,2,3]",
        "isHidden": true
      }
    ],
    "hints": [
      "Recursive solution: define `dfs(node)`. If `node` is null, return. Call `dfs(node.left)`, then `dfs(node.right)`, then add `node.val` to the result *last*.",
      "Iterative solution is trickier. A common method uses two stacks.",
      "A cleverer 1-stack solution: modify the *preorder* traversal. Preorder is `Root, Left, Right`. We want `Left, Right, Root`.",
      "If we build a list in the order `Root, Right, Left`, and then *reverse* that list, we get `Left, Right, Root`.",
      "To get `Root, Right, Left`: use a stack, pop, add to result, but push `left` *first*, then push `right`."
    ],
    "solutions": [
      {
        "language": "javascript",
        "code": "/**\n * Definition for a binary tree node.\n * function TreeNode(val, left, right) {\n * this.val = (val===undefined ? 0 : val)\n * this.left = (left===undefined ? null : left)\n * this.right = (right===undefined ? null : right)\n * }\n */\n\n// Iterative Solution (modified Preorder)\nvar postorderTraversal = function(root) {\n    if (!root) {\n        return [];\n    }\n\n    const stack = [root];\n    const result = [];\n\n    // This loop builds a \"Root, Right, Left\" traversal\n    while (stack.length > 0) {\n        const node = stack.pop();\n        result.push(node.val);\n\n        // Push Left *first* (so it's processed after right)\n        if (node.left) {\n            stack.push(node.left);\n        }\n        // Push Right *second* (so it's processed before left)\n        if (node.right) {\n            stack.push(node.right);\n        }\n    }\n\n    // Reversing \"Root, Right, Left\" gives \"Left, Right, Root\"\n    return result.reverse();\n};",
        "explanation": "This iterative solution cleverly modifies the Preorder traversal. A standard Preorder would push `right` then `left` to get `Root, Left, Right`. Instead, we push `left` *then* `right`. This causes the stack to process nodes in the order `Root, Right, Left`. We add these values to our `result` array. At the very end, we `reverse()` the entire `result` array. Reversing `[Root, Right, Left]` gives us `[Left, Right, Root]`, which is the correct Postorder traversal.",
        "timeComplexity": "O(n)",
        "spaceComplexity": "O(h)"
      }
    ],
    "acceptanceRate": 61.5,
    "totalSubmissions": 13000,
    "correctSubmissions": 7995,
    "averageTime": 9
  },
  {
    "title": "Binary Tree Zigzag Level Order Traversal",
    "description": "Given the `root` of a binary tree, return the zigzag level order traversal of its nodes' values. (i.e., from left to right, then right to left for the next level and alternate back and forth).\n\n**Example 1:**\nInput: root = [3,9,20,null,null,15,7]\nOutput: [[3],[20,9],[15,7]]\n\n**Example 2:**\nInput: root = [1]\nOutput: [[1]]\n\n**Example 3:**\nInput: root = []\nOutput: []\n\n**Constraints:**\n- The number of nodes in the tree is in the range [0, 2000].\n- -100 <= Node.val <= 100",
    "difficulty": "medium",
    "topics": [
      "Tree",
      "Breadth-First Search (BFS)",
      "Queue"
    ],
    "companies": [
      "Amazon",
      "Microsoft",
      "Facebook",
      "LinkedIn"
    ],
    "constraints": [
      "The number of nodes in the tree is in the range [0, 2000].",
      "-100 <= Node.val <= 100"
    ],
    "examples": [
      {
        "input": "root = [3,9,20,null,null,15,7]",
        "output": "[[3],[20,9],[15,7]]",
        "explanation": "Level 0: [3] (L->R). Level 1: [20,9] (R->L). Level 2: [15,7] (L->R)."
      }
    ],
    "testCases": [
      {
        "input": "[3,9,20,null,null,15,7]",
        "expectedOutput": "[[3],[20,9],[15,7]]",
        "isHidden": false
      },
      {
        "input": "[1]",
        "expectedOutput": "[[1]]",
        "isHidden": false
      },
      {
        "input": "[]",
        "expectedOutput": "[]",
        "isHidden": false
      }
    ],
    "hints": [
      "This is a modification of 'Binary Tree Level Order Traversal' (BFS).",
      "Perform a standard BFS using a queue.",
      "Maintain a `level` counter (or a boolean flag `leftToRight`).",
      "Inside the `while (queue.length > 0)` loop, process the level as usual, storing node values in a `currentLevel` list.",
      "After the inner `for (let i = 0; i < levelSize; i++)` loop finishes, check your `level` counter.",
      "If the level is odd (e.g., 1, 3, ...), *reverse* the `currentLevel` list.",
      "Add the (possibly reversed) `currentLevel` list to your `results`."
    ],
    "solutions": [
      {
        "language": "javascript",
        "code": "/**\n * Definition for a binary tree node.\n * function TreeNode(val, left, right) {\n * this.val = (val===undefined ? 0 : val)\n * this.left = (left===undefined ? null : left)\n * this.right = (right===undefined ? null : right)\n * }\n */\nvar zigzagLevelOrder = function(root) {\n    if (!root) {\n        return [];\n    }\n\n    const results = [];\n    const queue = [root];\n    let leftToRight = true;\n\n    while (queue.length > 0) {\n        const levelSize = queue.length;\n        const currentLevel = [];\n\n        for (let i = 0; i < levelSize; i++) {\n            const node = queue.shift();\n            currentLevel.push(node.val);\n\n            if (node.left) {\n                queue.push(node.left);\n            }\n            if (node.right) {\n                queue.push(node.right);\n            }\n        }\n\n        // Add the zigzag logic\n        if (!leftToRight) {\n            currentLevel.reverse();\n        }\n        \n        results.push(currentLevel);\n        leftToRight = !leftToRight; // Flip direction for next level\n    }\n\n    return results;\n};",
        "explanation": "This solution is a modified Breadth-First Search (BFS). It performs a standard level-order traversal, storing each level's nodes in a `currentLevel` array. The key addition is a boolean flag, `leftToRight`, which starts as `true`. After each level is processed, we check this flag. If `leftToRight` is `false`, it means this level should be right-to-left, so we `reverse()` the `currentLevel` array before adding it to `results`. At the end of each level, we flip the flag (`leftToRight = !leftToRight`) to prepare for the next level.",
        "timeComplexity": "O(n)",
        "spaceComplexity": "O(n)"
      }
    ],
    "acceptanceRate": 53.1,
    "totalSubmissions": 9000,
    "correctSubmissions": 4779,
    "averageTime": 18
  },
  {
    "title": "Diameter of Binary Tree",
    "description": "Given the `root` of a binary tree, return the length of the **diameter** of the tree.\n\nThe diameter of a binary tree is the length of the **longest** path between any two nodes in a tree. This path may or may not pass through the `root`.\n\nThe length of a path between two nodes is represented by the number of edges between them.\n\n**Example 1:**\nInput: root = [1,2,3,4,5]\nOutput: 3\nExplanation: 3 is the length of the path [4,2,1,3] or [5,2,1,3].\n\n**Example 2:**\nInput: root = [1,2]\nOutput: 1\n\n**Constraints:**\n- The number of nodes in the tree is in the range [1, 10^4].\n- -100 <= Node.val <= 100",
    "difficulty": "easy",
    "topics": [
      "Tree",
      "Depth-First Search",
      "Recursion"
    ],
    "companies": [
      "Amazon",
      "Facebook",
      "Google",
      "Microsoft"
    ],
    "constraints": [
      "The number of nodes in the tree is in the range [1, 10^4].",
      "-100 <= Node.val <= 100"
    ],
    "examples": [
      {
        "input": "root = [1,2,3,4,5]",
        "output": "3",
        "explanation": "The path [4,2,1,3] has 3 edges."
      },
      {
        "input": "root = [1,2]",
        "output": "1",
        "explanation": "The path [1,2] has 1 edge."
      }
    ],
    "testCases": [
      {
        "input": "[1,2,3,4,5]",
        "expectedOutput": "3",
        "isHidden": false
      },
      {
        "input": "[1,2]",
        "expectedOutput": "1",
        "isHidden": false
      }
    ],
    "hints": [
      "This requires a postorder (Left, Right, Root) DFS.",
      "The diameter at any `node` is `height(node.left) + height(node.right)`.",
      "The final answer is the *maximum* of these diameters found at *every* node, not just the root.",
      "You need a recursive function `getHeight(node)` that does two things:\n  1. It returns the height of the `node` (max height of its children + 1).\n  2. It *updates* a global `maxDiameter` variable using the formula `height(node.left) + height(node.right)`."
    ],
    "solutions": [
      {
        "language": "javascript",
        "code": "/**\n * Definition for a binary tree node.\n * function TreeNode(val, left, right) {\n * this.val = (val===undefined ? 0 : val)\n * this.left = (left===undefined ? null : left)\n * this.right = (right===undefined ? null : right)\n * }\n */\nvar diameterOfBinaryTree = function(root) {\n    let maxDiameter = 0;\n\n    /**\n     * @param {TreeNode} node\n     * @returns {number} - The height of this node\n     */\n    function getHeight(node) {\n        if (node === null) {\n            return 0;\n        }\n\n        // Get heights of left and right subtrees\n        const leftHeight = getHeight(node.left);\n        const rightHeight = getHeight(node.right);\n\n        // The diameter *at this node* is leftHeight + rightHeight\n        // Update the global max diameter\n        maxDiameter = Math.max(maxDiameter, leftHeight + rightHeight);\n\n        // The height *of this node* is 1 + max of children's heights\n        return 1 + Math.max(leftHeight, rightHeight);\n    }\n\n    // Start the DFS\n    getHeight(root);\n\n    return maxDiameter;\n};",
        "explanation": "This solution uses a single DFS helper function `getHeight` to both calculate the height of a node and update the global `maxDiameter`. The function performs a postorder traversal. For each `node`, it first recursively finds the `leftHeight` and `rightHeight`. It then calculates the diameter *passing through this node* (`leftHeight + rightHeight`) and updates `maxDiameter` if this is larger than the current max. Finally, it returns the *height* of the current node (`1 + Math.max(leftHeight, rightHeight)`) to its parent. This allows the parent to calculate its own diameter. The final answer is the `maxDiameter` found after the traversal.",
        "timeComplexity": "O(n)",
        "spaceComplexity": "O(h)"
      }
    ],
    "acceptanceRate": 51.9,
    "totalSubmissions": 12000,
    "correctSubmissions": 6228,
    "averageTime": 14
  },
  {
    "title": "Letter Combinations of a Phone Number",
    "description": "Given a string containing digits from `2-9` inclusive, return all possible letter combinations that the number could represent. Return the answer in any order.\n\nA mapping of digits to letters (just like on the telephone buttons) is given below. Note that 1 does not map to any letters.\n\n(Image of a phone keypad showing 2->abc, 3->def, 4->ghi, 5->jkl, 6->mno, 7->pqrs, 8->tuv, 9->wxyz)\n\n**Example 1:**\nInput: digits = \"23\"\nOutput: [\"ad\",\"ae\",\"af\",\"bd\",\"be\",\"bf\",\"cd\",\"ce\",\"cf\"]\n\n**Example 2:**\nInput: digits = \"\"\nOutput: []\n\n**Example 3:**\nInput: digits = \"2\"\nOutput: [\"a\",\"b\",\"c\"]\n\n**Constraints:**\n- 0 <= digits.length <= 4\n- `digits[i]` is a digit in the range ['2', '9'].",
    "difficulty": "medium",
    "topics": [
      "String",
      "Backtracking",
      "Hash Table"
    ],
    "companies": [
      "Amazon",
      "Facebook",
      "Google",
      "Microsoft"
    ],
    "constraints": [
      "0 <= digits.length <= 4",
      "digits[i] is a digit in the range ['2', '9']."
    ],
    "examples": [
      {
        "input": "digits = \"23\"",
        "output": "[\"ad\",\"ae\",\"af\",\"bd\",\"be\",\"bf\",\"cd\",\"ce\",\"cf\"]",
        "explanation": "All combinations of 'abc' and 'def'."
      },
      {
        "input": "digits = \"\"",
        "output": "[]",
        "explanation": "Empty input gives empty output."
      }
    ],
    "testCases": [
      {
        "input": "\"23\"",
        "expectedOutput": "[\"ad\",\"ae\",\"af\",\"bd\",\"be\",\"bf\",\"cd\",\"ce\",\"cf\"]",
        "isHidden": false
      },
      {
        "input": "\"\"",
        "expectedOutput": "[]",
        "isHidden": false
      },
      {
        "input": "\"2\"",
        "expectedOutput": "[\"a\",\"b\",\"c\"]",
        "isHidden": false
      }
    ],
    "hints": [
      "This is a perfect problem for backtracking.",
      "First, create a hash map for the digit-to-letters mapping (e.g., '2' -> 'abc').",
      "Define a recursive function `backtrack(index, currentString)`.",
      "The `index` will track which digit in the `digits` string we are processing.",
      "Base case: If `index == digits.length`, we have a complete combination. Add `currentString` to the results.",
      "Recursive step: Get the letters for the current digit (`digits[index]`). Iterate through each `letter` in that string.",
      "1. 'Choose': (Implicitly by passing `currentString + letter` to the recursion).",
      "2. 'Explore': Call `backtrack(index + 1, currentString + letter)`.",
      "3. 'Unchoose': (This is handled by the function calls returning, no explicit pop is needed)."
    ],
    "solutions": [
      {
        "language": "javascript",
        "code": "var letterCombinations = function(digits) {\n    if (digits.length === 0) {\n        return [];\n    }\n\n    const map = {\n        '2': 'abc',\n        '3': 'def',\n        '4': 'ghi',\n        '5': 'jkl',\n        '6': 'mno',\n        '7': 'pqrs',\n        '8': 'tuv',\n        '9': 'wxyz'\n    };\n\n    const results = [];\n\n    /**\n     * @param {number} index - Current index in the 'digits' string\n     * @param {string} currentPath - The combination built so far\n     */\n    function backtrack(index, currentPath) {\n        // Base case: Reached the end of the digits\n        if (index === digits.length) {\n            results.push(currentPath);\n            return;\n        }\n\n        // Get letters for the current digit\n        const letters = map[digits[index]];\n\n        // Explore each letter choice\n        for (const letter of letters) {\n            // 1. Choose (by appending letter)\n            // 2. Explore (by recursing with index + 1)\n            backtrack(index + 1, currentPath + letter);\n            // 3. Unchoose (happens automatically when function returns)\n        }\n    }\n\n    backtrack(0, \"\");\n    return results;\n};",
        "explanation": "This solution uses backtracking. We first define a `map` for the digit-to-letter mappings. The `backtrack(index, currentPath)` function explores all possibilities. `index` tracks our position in the input `digits` string, and `currentPath` is the string we've built so far. The base case is when `index` reaches the end of `digits`, at which point we add the complete `currentPath` to our `results`. In the recursive step, we get the `letters` corresponding to the current digit (`map[digits[index]]`) and loop through them. For each `letter`, we 'choose' it by making a recursive call with `index + 1` and `currentPath + letter`.",
        "timeComplexity": "O(4^n * n)",
        "spaceComplexity": "O(n)"
      }
    ],
    "acceptanceRate": 51.4,
    "totalSubmissions": 13000,
    "correctSubmissions": 6682,
    "averageTime": 16
  },
  {
    "title": "Generate Parentheses",
    "description": "Given `n` pairs of parentheses, write a function to generate all combinations of well-formed parentheses.\n\n**Example 1:**\nInput: n = 3\nOutput: [\"((()))\",\"(()())\",\"(())()\",\"()(())\",\"()()()\"]\n\n**Example 2:**\nInput: n = 1\nOutput: [\"()\"]\n\n**Constraints:**\n- 1 <= n <= 8",
    "difficulty": "medium",
    "topics": [
      "String",
      "Backtracking",
      "Dynamic Programming"
    ],
    "companies": [
      "Amazon",
      "Facebook",
      "Google",
      "Microsoft"
    ],
    "constraints": [
      "1 <= n <= 8"
    ],
    "examples": [
      {
        "input": "n = 3",
        "output": "[\"((()))\",\"(()())\",\"(())()\",\"()(())\",\"()()()\"]",
        "explanation": "All 5 valid combinations for n=3."
      },
      {
        "input": "n = 1",
        "output": "[\"()\"]",
        "explanation": "Only one combination."
      }
    ],
    "testCases": [
      {
        "input": "3",
        "expectedOutput": "[\"((()))\",\"(()())\",\"(())()\",\"()(())\",\"()()()\"]",
        "isHidden": false
      },
      {
        "input": "1",
        "expectedOutput": "[\"()\"]",
        "isHidden": false
      }
    ],
    "hints": [
      "This is a backtracking problem.",
      "A set of parentheses is well-formed if two conditions are met:\n  1. The total number of open brackets == total number of close brackets (== n).\n  2. At *no point* in the string can the number of close brackets > number of open brackets.",
      "Define a recursive function `backtrack(currentString, openCount, closeCount)`.",
      "Base case: If `currentString.length == 2 * n`, a valid combination is found. Add it to results.",
      "Recursive step:\n  - If `openCount < n` (we can add an open bracket): Recurse with `backtrack(currentString + '(', openCount + 1, closeCount)`.\n  - If `closeCount < openCount` (we can add a close bracket): Recurse with `backtrack(currentString + ')', openCount, closeCount + 1)`."
    ],
    "solutions": [
      {
        "language": "javascript",
        "code": "var generateParenthesis = function(n) {\n    const results = [];\n\n    /**\n     * @param {number} openCount - Count of '(' used so far\n     * @param {number} closeCount - Count of ')' used so far\n     * @param {string} currentPath - The string built so far\n     */\n    function backtrack(openCount, closeCount, currentPath) {\n        // Base case: The string is complete\n        if (currentPath.length === n * 2) {\n            results.push(currentPath);\n            return;\n        }\n\n        // 1. Can we add an open parenthesis?\n        // We can if we haven't used all 'n' of them.\n        if (openCount < n) {\n            backtrack(openCount + 1, closeCount, currentPath + \"(\");\n        }\n\n        // 2. Can we add a close parenthesis?\n        // We can if the count of close is *less than* open.\n        if (closeCount < openCount) {\n            backtrack(openCount, closeCount + 1, currentPath + \")\");\n        }\n    }\n\n    backtrack(0, 0, \"\");\n    return results;\n};",
        "explanation": "This solution uses backtracking by keeping track of the counts of open (`openCount`) and closed (`closeCount`) parentheses. The `backtrack` function has two 'choice' branches. First, it checks if it *can* add an open parenthesis (if `openCount < n`). If so, it recurses, incrementing `openCount`. Second, it checks if it *can* add a close parenthesis (if `closeCount < openCount` - this is the key to well-formedness). If so, it recurses, incrementing `closeCount`. The base case is when the string length reaches `n * 2`, at which point the valid string is added to `results`.",
        "timeComplexity": "O(4^n / sqrt(n))",
        "spaceComplexity": "O(n)"
      }
    ],
    "acceptanceRate": 68.9,
    "totalSubmissions": 10000,
    "correctSubmissions": 6890,
    "averageTime": 17
  },
  {
    "title": "Decode Ways",
    "description": "A message containing letters from A-Z is being encoded to numbers using the following mapping: 'A' -> 1, 'B' -> 2, ..., 'Z' -> 26.\n\nTo decode an encoded message, all the digits must be grouped then mapped back into letters. For example, \"11106\" can be mapped into:\n- \"AAJF\" with the grouping (1 1 10 6)\n- \"KJF\" with the grouping (11 10 6)\n\nNote that the grouping (1 11 06) is invalid because \"06\" cannot be mapped into 'F' since \"6\" is different from \"06\".\n\nGiven a string `s` containing only digits, return the number of ways to decode it.\n\n**Example 1:**\nInput: s = \"12\"\nOutput: 2\nExplanation: \"12\" could be decoded as \"AB\" (1 2) or \"L\" (12).\n\n**Example 2:**\nInput: s = \"226\"\nOutput: 3\nExplanation: \"226\" could be decoded as \"BBE\" (2 2 6), \"BZ\" (2 26), or \"VF\" (22 6).\n\n**Example 3:**\nInput: s = \"06\"\nOutput: 0\nExplanation: \"06\" cannot be mapped to 'F'.\n\n**Constraints:**\n- 1 <= s.length <= 100\n- `s` contains only digits and may contain leading zeros.",
    "difficulty": "medium",
    "topics": [
      "String",
      "Dynamic Programming"
    ],
    "companies": [
      "Amazon",
      "Facebook",
      "Google",
      "Microsoft"
    ],
    "constraints": [
      "1 <= s.length <= 100",
      "s contains only digits and may contain leading zeros."
    ],
    "examples": [
      {
        "input": "s = \"12\"",
        "output": "2",
        "explanation": "Can be (1, 2) -> \"AB\" or (12) -> \"L\"."
      },
      {
        "input": "s = \"226\"",
        "output": "3",
        "explanation": "(2, 2, 6) -> \"BBE\", (2, 26) -> \"BZ\", (22, 6) -> \"VF\"."
      },
      {
        "input": "s = \"06\"",
        "output": "0",
        "explanation": "\"0\" is not a valid start."
      }
    ],
    "testCases": [
      {
        "input": "\"12\"",
        "expectedOutput": "2",
        "isHidden": false
      },
      {
        "input": "\"226\"",
        "expectedOutput": "3",
        "isHidden": false
      },
      {
        "input": "\"0\"",
        "expectedOutput": "0",
        "isHidden": true
      },
      {
        "input": "\"10\"",
        "expectedOutput": "1",
        "isHidden": true
      }
    ],
    "hints": [
      "This is a 1D Dynamic Programming problem.",
      "Let `dp[i]` be the number of ways to decode the string `s` of length `i` (`s.substring(0, i)`).",
      "Base cases: `dp[0] = 1` (one way to decode an empty string). `dp[1]` is 1 if `s[0] != '0'`, otherwise 0.",
      "Iterate `i` from 2 to `n`. `dp[i]` depends on `dp[i-1]` and `dp[i-2]`.",
      "1. Check the 1-digit code (`s[i-1]`): If it's `> '0'`, it's a valid code. Add `dp[i-1]` to `dp[i]` (ways to decode `s[0...i-2]` + this char).",
      "2. Check the 2-digit code (`s[i-2]` + `s[i-1]`): If it's between '10' and '26', it's a valid code. Add `dp[i-2]` to `dp[i]` (ways to decode `s[0...i-3]` + this 2-digit char).",
      "The answer is `dp[n]`."
    ],
    "solutions": [
      {
        "language": "javascript",
        "code": "var numDecodings = function(s) {\n    const n = s.length;\n    // dp[i] = ways to decode s.substring(0, i)\n    const dp = new Array(n + 1).fill(0);\n\n    // Base case: 1 way to decode an empty string (the 'do nothing' way)\n    dp[0] = 1;\n    \n    // Base case: ways to decode first char\n    dp[1] = (s[0] === '0') ? 0 : 1;\n\n    for (let i = 2; i <= n; i++) {\n        // Get the 1-digit and 2-digit numbers (as strings)\n        const oneDigit = s.substring(i - 1, i);\n        const twoDigits = s.substring(i - 2, i);\n\n        // 1. Check one-digit code (e.g., '1' through '9')\n        if (oneDigit >= '1' && oneDigit <= '9') {\n            dp[i] += dp[i - 1];\n        }\n\n        // 2. Check two-digit code (e.g., '10' through '26')\n        if (twoDigits >= '10' && twoDigits <= '26') {\n            dp[i] += dp[i - 2];\n        }\n    }\n\n    return dp[n];\n};",
        "explanation": "This solution uses bottom-up Dynamic Programming. `dp[i]` stores the number of ways to decode the first `i` characters of `s`. We set `dp[0] = 1` (one way to decode nothing) and `dp[1]` to 1 or 0 depending on the first character. Then, we iterate from `i = 2` to `n`. For each `i`, we check two possibilities: 1. Can the *last* character (`s[i-1]`) be a valid code on its own (i.e., '1'-'9')? If yes, we add `dp[i-1]` (the ways to decode up to the previous char) to `dp[i]`. 2. Can the *last two* characters (`s[i-2...i-1]`) be a valid code on their own (i.e., '10'-'26')? If yes, we add `dp[i-2]` (the ways to decode up to two chars ago) to `dp[i]`. The final answer is `dp[n]`.",
        "timeComplexity": "O(n)",
        "spaceComplexity": "O(n)"
      }
    ],
    "acceptanceRate": 27.8,
    "totalSubmissions": 15000,
    "correctSubmissions": 4170,
    "averageTime": 18
  },
  {
    "title": "House Robber III",
    "description": "The thief has found himself a new place for his thievery again. There is only one entrance to this area, called the `root`. Besides the `root`, each house has one and only one parent house. After a tour, the smart thief realized that **all houses in this place form a binary tree**. It will automatically contact the police if **two directly-linked houses were broken into on the same night**.\n\nGiven the `root` of the binary tree, return the maximum amount of money the thief can rob **without alerting the police**.\n\n**Example 1:**\nInput: root = [3,2,3,null,3,null,1]\nOutput: 7\nExplanation: Maximum amount of money = 3 (root) + 3 (root.left.right) + 1 (root.right.right) = 7.\n\n**Example 2:**\nInput: root = [3,4,5,1,3,null,1]\nOutput: 9\nExplanation: Maximum amount of money = 4 (root.left) + 5 (root.right) = 9.\n\n**Constraints:**\n- The number of nodes in the tree is in the range [1, 10^4].\n- 0 <= Node.val <= 10^4",
    "difficulty": "medium",
    "topics": [
      "Tree",
      "Dynamic Programming",
      "Depth-First Search"
    ],
    "companies": [
      "Amazon",
      "Facebook",
      "Google",
      "Microsoft"
    ],
    "constraints": [
      "The number of nodes in the tree is in the range [1, 10^4].",
      "0 <= Node.val <= 10^4"
    ],
    "examples": [
      {
        "input": "root = [3,2,3,null,3,null,1]",
        "output": "7",
        "explanation": "Rob root(3), left-grandchild(3), and right-grandchild(1). 3 + 3 + 1 = 7."
      },
      {
        "input": "root = [3,4,5,1,3,null,1]",
        "output": "9",
        "explanation": "Rob root's children, 4 and 5. 4 + 5 = 9."
      }
    ],
    "testCases": [
      {
        "input": "[3,2,3,null,3,null,1]",
        "expectedOutput": "7",
        "isHidden": false
      },
      {
        "input": "[3,4,5,1,3,null,1]",
        "expectedOutput": "9",
        "isHidden": false
      }
    ],
    "hints": [
      "This is a DP problem on a tree.",
      "A simple recursion `rob(node) = max(node.val + rob(node.left.left) + ..., rob(node.left) + rob(node.right))` is too slow (O(2^n)) due to overlapping subproblems.",
      "Use memoization or an optimized DFS.",
      "Define a DFS function `dfs(node)` that returns a pair (an array of 2): `[robThis, skipThis]`.\n  - `robThis`: The max money we can get from this subtree if we *do* rob this `node`.\n  - `skipThis`: The max money we can get from this subtree if we *do not* rob this `node`.",
      "Base case: `dfs(null)` returns `[0, 0]`.",
      "Recursive step: Get `[leftRob, leftSkip] = dfs(node.left)` and `[rightRob, rightSkip] = dfs(node.right)`.",
      "`robThis = node.val + leftSkip + rightSkip` (must skip children).",
      "`skipThis = max(leftRob, leftSkip) + max(rightRob, rightSkip)` (can either rob or skip children).",
      "The final answer is `max(dfs(root))`."
    ],
    "solutions": [
      {
        "language": "javascript",
        "code": "/**\n * Definition for a binary tree node.\n * function TreeNode(val, left, right) {\n * this.val = (val===undefined ? 0 : val)\n * this.left = (left===undefined ? null : left)\n * this.right = (right===undefined ? null : right)\n * }\n */\nvar rob = function(root) {\n    \n    /**\n     * @param {TreeNode} node\n     * @returns {[number, number]} - A pair: [max if we rob this, max if we skip this]\n     */\n    function dfs(node) {\n        if (node === null) {\n            return [0, 0]; // [rob, skip]\n        }\n\n        // Get results from children\n        const [leftRob, leftSkip] = dfs(node.left);\n        const [rightRob, rightSkip] = dfs(node.right);\n\n        // 1. Max profit if we *rob* the current node\n        // We must skip its children.\n        const robThis = node.val + leftSkip + rightSkip;\n\n        // 2. Max profit if we *skip* the current node\n        // We can either rob or skip its children (take the max of each).\n        const skipThis = Math.max(leftRob, leftSkip) + Math.max(rightRob, rightSkip);\n\n        return [robThis, skipThis];\n    }\n\n    const [robRoot, skipRoot] = dfs(root);\n    return Math.max(robRoot, skipRoot);\n};",
        "explanation": "This solution uses an optimized DFS. The `dfs` function performs a postorder traversal and returns an array of two values for each node: `[robThis, skipThis]`. `robThis` is the maximum profit from this node's subtree *if we rob this node*. `skipThis` is the maximum profit *if we skip this node*. To calculate `robThis`, we take `node.val` and add the `skip` values from its children (since we can't rob them). To calculate `skipThis`, we are free to either rob or skip the children, so we take the `max` of the `rob` and `skip` values from the left child and add it to the `max` of the `rob` and `skip` values from the right child. The final answer is the `max` of `robRoot` and `skipRoot` returned by the call on the `root`.",
        "timeComplexity": "O(n)",
        "spaceComplexity": "O(h)"
      }
    ],
    "acceptanceRate": 51.3,
    "totalSubmissions": 7000,
    "correctSubmissions": 3591,
    "averageTime": 23
  },
  {
    "title": "Course Schedule II",
    "description": "There are a total of `numCourses` courses you have to take, labeled from `0` to `numCourses - 1`. You are given an array `prerequisites` where `prerequisites[i] = [ai, bi]` indicates that you must take course `bi` first if you want to take course `ai`.\n\nReturn the ordering of courses you should take to finish all courses. If there are many valid answers, return any of them. If it is impossible to finish all courses (i.e., a cycle), return an empty array.\n\n**Example 1:**\nInput: numCourses = 2, prerequisites = [[1,0]]\nOutput: [0,1]\n\n**Example 2:**\nInput: numCourses = 4, prerequisites = [[1,0],[2,0],[3,1],[3,2]]\nOutput: [0,2,1,3]\nExplanation: One valid order is [0,2,1,3] (another is [0,1,2,3]).\n\n**Example 3:**\nInput: numCourses = 1, prerequisites = []\nOutput: [0]\n\n**Constraints:**\n- 1 <= numCourses <= 2000\n- 0 <= prerequisites.length <= numCourses * (numCourses - 1)\n- `prerequisites[i].length == 2`\n- 0 <= ai, bi < numCourses\n- `ai != bi`\n- All `prerequisites[i]` pairs are unique.",
    "difficulty": "medium",
    "topics": [
      "Graph",
      "Topological Sort",
      "Depth-First Search",
      "Breadth-First Search"
    ],
    "companies": [
      "Amazon",
      "Facebook",
      "Google",
      "Uber"
    ],
    "constraints": [
      "1 <= numCourses <= 2000",
      "0 <= prerequisites.length <= numCourses * (numCourses - 1)",
      "ai != bi"
    ],
    "examples": [
      {
        "input": "numCourses = 2, prerequisites = [[1,0]]",
        "output": "[0,1]",
        "explanation": "Must take 0 before 1."
      },
      {
        "input": "numCourses = 4, prerequisites = [[1,0],[2,0],[3,1],[3,2]]",
        "output": "[0,2,1,3]",
        "explanation": "0 must be taken. Then 1 and 2 (in any order). Then 3."
      }
    ],
    "testCases": [
      {
        "input": "2\n[[1,0]]",
        "expectedOutput": "[0,1]",
        "isHidden": false
      },
      {
        "input": "4\n[[1,0],[2,0],[3,1],[3,2]]",
        "expectedOutput": "[0,2,1,3]",
        "isHidden": false
      },
      {
        "input": "2\n[[0,1],[1,0]]",
        "expectedOutput": "[]",
        "isHidden": true
      }
    ],
    "hints": [
      "This is a 'Topological Sort' problem.",
      "It is identical to 'Course Schedule I', but you need to *store* the order.",
      "Use Kahn's Algorithm (BFS): Build an adjacency list and an `inDegree` array.",
      "Initialize a `queue` with all nodes that have an `inDegree` of 0.",
      "Initialize an `order` list.",
      "While the `queue` is not empty:\n  1. Dequeue a `course`.\n  2. Add `course` to your `order` list.\n  3. For each `neighbor` of `course`, decrement `inDegree[neighbor]`.\n  4. If `inDegree[neighbor]` becomes 0, enqueue `neighbor`.",
      "After the loop, check if `order.length == numCourses`. If yes, return `order`. If not, a cycle exists, so return `[]`."
    ],
    "solutions": [
      {
        "language": "javascript",
        "code": "var findOrder = function(numCourses, prerequisites) {\n    // 1. Build Adjacency List and In-Degree Array\n    const adj = new Array(numCourses).fill(0).map(() => []);\n    const inDegree = new Array(numCourses).fill(0);\n\n    for (const [course, pre] of prerequisites) {\n        adj[pre].push(course);\n        inDegree[course]++;\n    }\n\n    // 2. Initialize Queue with courses that have 0 in-degree\n    const queue = [];\n    for (let i = 0; i < numCourses; i++) {\n        if (inDegree[i] === 0) {\n            queue.push(i);\n        }\n    }\n\n    const topologicalOrder = [];\n\n    // 3. Process the queue (Kahn's Algorithm)\n    while (queue.length > 0) {\n        const course = queue.shift();\n        topologicalOrder.push(course); // Add to our order\n\n        for (const neighbor of adj[course]) {\n            inDegree[neighbor]--;\n            if (inDegree[neighbor] === 0) {\n                queue.push(neighbor);\n            }\n        }\n    }\n\n    // 4. Check if we were able to take all courses\n    if (topologicalOrder.length === numCourses) {\n        return topologicalOrder;\n    } else {\n        // A cycle existed\n        return [];\n    }\n};",
        "explanation": "This solution uses Kahn's algorithm for topological sorting. We first build an adjacency list `adj` and an `inDegree` array. We initialize a `queue` with all courses that have an `inDegree` of 0 (no prerequisites). We also initialize our `topologicalOrder` array. While the queue is not empty, we dequeue a `course`, add it to our `topologicalOrder`, and then iterate through its `neighbors`. For each neighbor, we decrement its `inDegree`. If a neighbor's `inDegree` drops to 0, it means all its prerequisites are met, so we add it to the `queue`. Finally, we check if the length of our `topologicalOrder` equals `numCourses`. If it does, we return the order; otherwise, a cycle was present, and we return an empty array.",
        "timeComplexity": "O(V + E)",
        "spaceComplexity": "O(V + E)"
      }
    ],
    "acceptanceRate": 45.1,
    "totalSubmissions": 10000,
    "correctSubmissions": 4510,
    "averageTime": 24
  },
  {
    "title": "Copy List with Random Pointer",
    "description": "A linked list of length `n` is given such that each node contains an additional random pointer, which could point to any node in the list, or `null`.\n\nConstruct a **deep copy** of the list. The deep copy should consist of `n` brand new nodes, where each new node has its value set to the value of its corresponding original node. Both the `next` and `random` pointers of the new nodes should point to new nodes in the copied list such that the pointers in the original list and copied list represent the same list state. **None of the pointers in the new list should point to nodes in the original list.**\n\n**Example 1:**\nInput: head = [[7,null],[13,0],[11,4],[10,2],[1,0]]\nOutput: [[7,null],[13,0],[11,4],[10,2],[1,0]]\n\n**Constraints:**\n- 0 <= n <= 1000\n- -10^4 <= Node.val <= 10^4\n- `Node.random` is `null` or points to a node in the list.",
    "difficulty": "medium",
    "topics": [
      "Linked List",
      "Hash Table"
    ],
    "companies": [
      "Amazon",
      "Microsoft",
      "Facebook",
      "Google"
    ],
    "constraints": [
      "0 <= n <= 1000",
      "-10^4 <= Node.val <= 10^4",
      "Node.random is null or points to a node in the list."
    ],
    "examples": [
      {
        "input": "head = [[7,null],[13,0],[11,4],[10,2],[1,0]]",
        "output": "[[7,null],[13,0],[11,4],[10,2],[1,0]]",
        "explanation": "A deep copy of the list is created and returned."
      }
    ],
    "testCases": [
      {
        "input": "[[7,null],[13,0],[11,4],[10,2],[1,0]]",
        "expectedOutput": "[[7,null],[13,0],[11,4],[10,2],[1,0]]",
        "isHidden": false
      },
      {
        "input": "[[]]",
        "expectedOutput": "[[]]",
        "isHidden": true
      }
    ],
    "hints": [
      "You need a way to map an *old* node to its corresponding *new* node.",
      "A Hash Map is perfect for this: `map<OldNode, NewNode>`.",
      "Pass 1: Iterate through the original list. For each `oldNode`, create a `newNode` with the same value. Store this `(oldNode, newNode)` mapping in the hash map.",
      "Pass 2: Iterate through the original list again. For each `oldNode`:\n  1. Get its `newNode` from the map.\n  2. Set `newNode.next = map.get(oldNode.next)`.\n  3. Set `newNode.random = map.get(oldNode.random)`.\n  (Handle `null` pointers).",
      "Return `map.get(head)`."
    ],
    "solutions": [
      {
        "language": "javascript",
        "code": "/**\n * // Definition for a Node.\n * function Node(val, next, random) {\n * this.val = val;\n * this.next = next;\n * this.random = random;\n * };\n */\n\nvar copyRandomList = function(head) {\n    if (!head) {\n        return null;\n    }\n\n    // Map: oldNode -> newNode\n    const oldToNew = new Map();\n\n    // Pass 1: Create all new nodes and store the mapping\n    let curr = head;\n    while (curr) {\n        oldToNew.set(curr, new Node(curr.val));\n        curr = curr.next;\n    }\n\n    // Pass 2: Set the 'next' and 'random' pointers for the new nodes\n    curr = head;\n    while (curr) {\n        const newNode = oldToNew.get(curr);\n        \n        // Get the new 'next' node from the map\n        newNode.next = oldToNew.get(curr.next) || null;\n        // Get the new 'random' node from the map\n        newNode.random = oldToNew.get(curr.random) || null;\n        \n        curr = curr.next;\n    }\n\n    // Return the head of the new list\n    return oldToNew.get(head);\n};",
        "explanation": "This solution uses a two-pass approach with a hash map (`oldToNew`). In the first pass, we iterate through the original list and create a new, copied node for each old node. We store this mapping (`oldNode -> newNode`) in our map. In the second pass, we iterate through the original list again. For each `oldNode`, we get its corresponding `newNode` from the map. We then set `newNode.next` by looking up `oldNode.next` in the map, and we set `newNode.random` by looking up `oldNode.random` in the map. This ensures all pointers in the new list point to other *new* nodes. Finally, we return the new head by getting `oldToNew.get(head)`.",
        "timeComplexity": "O(n)",
        "spaceComplexity": "O(n)"
      }
    ],
    "acceptanceRate": 47.9,
    "totalSubmissions": 9000,
    "correctSubmissions": 4311,
    "averageTime": 18
  },
  {
    "title": "Search in a Binary Search Tree",
    "description": "You are given the `root` of a binary search tree (BST) and an integer `val`.\n\nFind the node in the BST that the node's value equals `val` and return the subtree rooted with that node. If such a node does not exist, return `null`.\n\n**Example 1:**\nInput: root = [4,2,7,1,3], val = 2\nOutput: [2,1,3]\n\n**Example 2:**\nInput: root = [4,2,7,1,3], val = 5\nOutput: []\n\n**Constraints:**\n- The number of nodes in the tree is in the range [1, 5000].\n- 1 <= Node.val <= 10^7\n- `root` is a binary search tree.\n- 1 <= val <= 10^7",
    "difficulty": "easy",
    "topics": [
      "Tree",
      "Binary Search Tree",
      "Recursion"
    ],
    "companies": [
      "Amazon",
      "Microsoft",
      "Facebook"
    ],
    "constraints": [
      "The number of nodes in the tree is in the range [1, 5000].",
      "1 <= Node.val <= 10^7",
      "root is a binary search tree.",
      "1 <= val <= 10^7"
    ],
    "examples": [
      {
        "input": "root = [4,2,7,1,3], val = 2",
        "output": "[2,1,3]",
        "explanation": "The node with value 2 is found, and its subtree [2,1,3] is returned."
      },
      {
        "input": "root = [4,2,7,1,3], val = 5",
        "output": "[]",
        "explanation": "The value 5 does not exist in the tree."
      }
    ],
    "testCases": [
      {
        "input": "[4,2,7,1,3]\n2",
        "expectedOutput": "[2,1,3]",
        "isHidden": false
      },
      {
        "input": "[4,2,7,1,3]\n5",
        "expectedOutput": "[]",
        "isHidden": false
      }
    ],
    "hints": [
      "This problem is about leveraging the core property of a BST.",
      "Start at the `root`.",
      "If `root` is `null` or `root.val == val`, return `root`.",
      "If `val < root.val`, the value must be in the left subtree. Recurse on `root.left`.",
      "If `val > root.val`, the value must be in the right subtree. Recurse on `root.right`.",
      "This can be done recursively or iteratively."
    ],
    "solutions": [
      {
        "language": "javascript",
        "code": "/**\n * Definition for a binary tree node.\n * function TreeNode(val, left, right) {\n * this.val = (val===undefined ? 0 : val)\n * this.left = (left===undefined ? null : left)\n * this.right = (right===undefined ? null : right)\n * }\n */\n\n// Iterative Solution\nvar searchBST = function(root, val) {\n    let curr = root;\n    \n    while (curr !== null) {\n        if (val === curr.val) {\n            // Found it\n            return curr;\n        } else if (val < curr.val) {\n            // Go left\n            curr = curr.left;\n        } else {\n            // Go right\n            curr = curr.right;\n        }\n    }\n    \n    // Not found\n    return null;\n};",
        "explanation": "This is an efficient iterative solution that leverages the BST property. We start a pointer `curr` at the `root`. We loop as long as `curr` is not `null`. Inside the loop, we compare `val` to `curr.val`. If they are equal, we've found the node and return `curr`. If `val` is less than `curr.val`, we know the target (if it exists) must be in the left subtree, so we move `curr = curr.left`. If `val` is greater, we move `curr = curr.right`. If the loop finishes (meaning `curr` became `null`), the value was not found, and we return `null`.",
        "timeComplexity": "O(H)",
        "spaceComplexity": "O(1)"
      }
    ],
    "acceptanceRate": 72.8,
    "totalSubmissions": 10000,
    "correctSubmissions": 7280,
    "averageTime": 12
  },
  {
    "title": "Majority Element",
    "description": "Given an array `nums` of size `n`, return the majority element.\n\nThe majority element is the element that appears more than `⌊n / 2⌋` times. You may assume that the majority element always exists in the array.\n\n**Example 1:**\nInput: nums = [3,2,3]\nOutput: 3\n\n**Example 2:**\nInput: nums = [2,2,1,1,1,2,2]\nOutput: 2\n\n**Constraints:**\n- n == nums.length\n- 1 <= n <= 5 * 10^4\n- -10^9 <= nums[i] <= 10^9",
    "difficulty": "easy",
    "topics": [
      "Array",
      "Hash Table",
      "Sorting",
      "Counting",
      "Divide and Conquer"
    ],
    "companies": [
      "Amazon",
      "Microsoft",
      "Adobe",
      "Google"
    ],
    "constraints": [
      "n == nums.length",
      "1 <= n <= 5 * 10^4",
      "-10^9 <= nums[i] <= 10^9",
      "The majority element always exists."
    ],
    "examples": [
      {
        "input": "nums = [3,2,3]",
        "output": "3",
        "explanation": "3 appears 2 times, which is > floor(3/2) = 1."
      },
      {
        "input": "nums = [2,2,1,1,1,2,2]",
        "output": "2",
        "explanation": "2 appears 4 times, which is > floor(7/2) = 3."
      }
    ],
    "testCases": [
      {
        "input": "[3,2,3]",
        "expectedOutput": "3",
        "isHidden": false
      },
      {
        "input": "[2,2,1,1,1,2,2]",
        "expectedOutput": "2",
        "isHidden": false
      },
      {
        "input": "[1]",
        "expectedOutput": "1",
        "isHidden": true
      }
    ],
    "hints": [
      "A simple solution is to use a Hash Map to count frequencies (O(n) time, O(n) space).",
      "Another is to sort the array (O(n log n) time, O(1) or O(n) space). The majority element will always be at index `n/2` after sorting.",
      "Can you do it in O(n) time and O(1) space? Think about the Boyer-Moore Voting Algorithm.",
      "Maintain a `candidate` and a `count`. Iterate through `nums`. If `count` is 0, set `candidate = num` and `count = 1`. If `num == candidate`, increment `count`. If `num != candidate`, decrement `count`."
    ],
    "solutions": [
      {
        "language": "javascript",
        "code": "var majorityElement = function(nums) {\n    let candidate = null;\n    let count = 0;\n\n    for (const num of nums) {\n        if (count === 0) {\n            candidate = num;\n        }\n        \n        if (num === candidate) {\n            count++;\n        } else {\n            count--;\n        }\n    }\n\n    // Since the majority element is guaranteed to exist,\n    // the final candidate will be the answer.\n    return candidate;\n};",
        "explanation": "This solution implements the Boyer-Moore Voting Algorithm. It maintains a `candidate` element and a `count`. It iterates through the array. If the `count` is zero, the current number becomes the new `candidate`. If the current number matches the `candidate`, the `count` is incremented; otherwise, it's decremented. Because the majority element appears more than n/2 times, it's guaranteed to 'win' this voting process and remain the `candidate` at the end.",
        "timeComplexity": "O(n)",
        "spaceComplexity": "O(1)"
      }
    ],
    "acceptanceRate": 60.5,
    "totalSubmissions": 18000,
    "correctSubmissions": 10890,
    "averageTime": 11
  },
  {
    "title": "Move Zeroes",
    "description": "Given an integer array `nums`, move all 0's to the end of it while maintaining the relative order of the non-zero elements.\n\nNote that you must do this in-place without making a copy of the array.\n\n**Example 1:**\nInput: nums = [0,1,0,3,12]\nOutput: [1,3,12,0,0]\n\n**Example 2:**\nInput: nums = [0]\nOutput: [0]\n\n**Constraints:**\n- 1 <= nums.length <= 10^4\n- -2^31 <= nums[i] <= 2^31 - 1",
    "difficulty": "easy",
    "topics": [
      "Array",
      "Two Pointers"
    ],
    "companies": [
      "Facebook",
      "Amazon",
      "Microsoft",
      "Bloomberg"
    ],
    "constraints": [
      "1 <= nums.length <= 10^4",
      "-2^31 <= nums[i] <= 2^31 - 1",
      "Must be done in-place."
    ],
    "examples": [
      {
        "input": "nums = [0,1,0,3,12]",
        "output": "[1,3,12,0,0]",
        "explanation": "Non-zero elements 1, 3, 12 maintain their order."
      },
      {
        "input": "nums = [0]",
        "output": "[0]",
        "explanation": "No change needed."
      }
    ],
    "testCases": [
      {
        "input": "[0,1,0,3,12]",
        "expectedOutput": "[1,3,12,0,0]",
        "isHidden": false
      },
      {
        "input": "[0]",
        "expectedOutput": "[0]",
        "isHidden": false
      },
      {
        "input": "[1,0,1]",
        "expectedOutput": "[1,1,0]",
        "isHidden": true
      }
    ],
    "hints": [
      "This requires an in-place modification.",
      "Use a 'Two Pointer' approach, similar to 'Remove Duplicates'.",
      "One pointer (`writeIndex` or `lastNonZeroFoundAt`) keeps track of the position where the next non-zero element should be placed.",
      "The other pointer (`i`) iterates through the array.",
      "Iterate `i` from 0 to n-1. If `nums[i]` is *not* zero, place it at `nums[writeIndex]` and increment `writeIndex`.",
      "After the first pass, all non-zero elements are at the beginning in the correct order. Fill the rest of the array (from `writeIndex` to `n-1`) with zeroes."
    ],
    "solutions": [
      {
        "language": "javascript",
        "code": "var moveZeroes = function(nums) {\n    // 'writeIndex' tracks where the next non-zero element should go.\n    let writeIndex = 0;\n    \n    // First pass: Move all non-zero elements to the front\n    for (let i = 0; i < nums.length; i++) {\n        if (nums[i] !== 0) {\n            nums[writeIndex] = nums[i];\n            writeIndex++;\n        }\n    }\n    \n    // Second pass: Fill the remaining positions with zeros\n    for (let i = writeIndex; i < nums.length; i++) {\n        nums[i] = 0;\n    }\n};",
        "explanation": "This solution uses a two-pass approach with a 'write pointer' (`writeIndex`). In the first pass, we iterate through the array. Whenever we encounter a non-zero element (`nums[i] !== 0`), we place it at the `writeIndex` position and increment `writeIndex`. This effectively pushes all non-zero elements to the front while maintaining their relative order. After the first pass, `writeIndex` holds the count (and the index after the last non-zero element). In the second pass, we simply fill the rest of the array, from `writeIndex` to the end, with zeroes.",
        "timeComplexity": "O(n)",
        "spaceComplexity": "O(1)"
      }
    ],
    "acceptanceRate": 60.1,
    "totalSubmissions": 20000,
    "correctSubmissions": 12020,
    "averageTime": 12
  },
  {
    "title": "Best Time to Buy and Sell Stock II",
    "description": "You are given an integer array `prices` where `prices[i]` is the price of a given stock on the `i`-th day.\n\nOn each day, you may decide to buy and/or sell the stock. You can only hold **at most one share** of the stock at any time. However, you can buy it then immediately sell it on the **same day**.\n\nFind and return the **maximum profit** you can achieve.\n\n**Example 1:**\nInput: prices = [7,1,5,3,6,4]\nOutput: 7\nExplanation: Buy on day 2 (price = 1) and sell on day 3 (price = 5), profit = 5-1 = 4. Then buy on day 4 (price = 3) and sell on day 5 (price = 6), profit = 6-3 = 3. Total profit = 4 + 3 = 7.\n\n**Example 2:**\nInput: prices = [1,2,3,4,5]\nOutput: 4\nExplanation: Buy on day 1 (price = 1) and sell on day 5 (price = 5), profit = 5-1 = 4.\n\n**Constraints:**\n- 1 <= prices.length <= 3 * 10^4\n- 0 <= prices[i] <= 10^4",
    "difficulty": "medium",
    "topics": [
      "Array",
      "Greedy"
    ],
    "companies": [
      "Amazon",
      "Microsoft",
      "Facebook",
      "Bloomberg"
    ],
    "constraints": [
      "1 <= prices.length <= 3 * 10^4",
      "0 <= prices[i] <= 10^4"
    ],
    "examples": [
      {
        "input": "prices = [7,1,5,3,6,4]",
        "output": "7",
        "explanation": "Profit from 1->5 is 4. Profit from 3->6 is 3. Total 7."
      },
      {
        "input": "prices = [1,2,3,4,5]",
        "output": "4",
        "explanation": "Buy at 1, sell at 5. Or, buy/sell daily: (2-1)+(3-2)+(4-3)+(5-4) = 4."
      }
    ],
    "testCases": [
      {
        "input": "[7,1,5,3,6,4]",
        "expectedOutput": "7",
        "isHidden": false
      },
      {
        "input": "[1,2,3,4,5]",
        "expectedOutput": "4",
        "isHidden": false
      },
      {
        "input": "[7,6,4,3,1]",
        "expectedOutput": "0",
        "isHidden": true
      }
    ],
    "hints": [
      "Since you can buy and sell on the same day, you don't need to worry about holding periods.",
      "Think greedily. If the price goes up tomorrow, you should buy today and sell tomorrow.",
      "Iterate through the `prices` array from the second day (`i = 1`).",
      "If `prices[i] > prices[i-1]`, it means there was a profit opportunity. Add the difference (`prices[i] - prices[i-1]`) to your total profit.",
      "This is equivalent to capturing all the upward trends."
    ],
    "solutions": [
      {
        "language": "javascript",
        "code": "var maxProfit = function(prices) {\n    let totalProfit = 0;\n\n    // Iterate starting from the second day\n    for (let i = 1; i < prices.length; i++) {\n        // If yesterday's price was lower than today's price,\n        // we can make a profit by buying yesterday and selling today.\n        if (prices[i] > prices[i - 1]) {\n            totalProfit += prices[i] - prices[i - 1];\n        }\n    }\n\n    return totalProfit;\n};",
        "explanation": "This solution uses a simple Greedy approach. Since we can buy and sell multiple times (even on the same day), we want to capture every single upward price movement. We iterate through the `prices` starting from the second day (`i = 1`). In each iteration, we check if the current day's price (`prices[i]`) is greater than the previous day's price (`prices[i-1]`). If it is, we add the difference (`prices[i] - prices[i-1]`) to our `totalProfit`. This accumulates all the positive gains from day to day.",
        "timeComplexity": "O(n)",
        "spaceComplexity": "O(1)"
      }
    ],
    "acceptanceRate": 60.2,
    "totalSubmissions": 15000,
    "correctSubmissions": 9030,
    "averageTime": 13
  },
  {
    "title": "Intersection of Two Arrays II",
    "description": "Given two integer arrays `nums1` and `nums2`, return an array of their intersection. Each element in the result must appear as many times as it shows in both arrays, and you may return the result in any order.\n\n**Example 1:**\nInput: nums1 = [1,2,2,1], nums2 = [2,2]\nOutput: [2,2]\n\n**Example 2:**\nInput: nums1 = [4,9,5], nums2 = [9,4,9,8,4]\nOutput: [4,9] or [9,4]\n\n**Constraints:**\n- 1 <= nums1.length, nums2.length <= 1000\n- 0 <= nums1[i], nums2[j] <= 1000",
    "difficulty": "easy",
    "topics": [
      "Array",
      "Hash Table",
      "Sorting",
      "Two Pointers"
    ],
    "companies": [
      "Amazon",
      "Facebook",
      "Google",
      "Microsoft"
    ],
    "constraints": [
      "1 <= nums1.length, nums2.length <= 1000",
      "0 <= nums1[i], nums2[j] <= 1000"
    ],
    "examples": [
      {
        "input": "nums1 = [1,2,2,1], nums2 = [2,2]",
        "output": "[2,2]",
        "explanation": "2 appears twice in both arrays."
      },
      {
        "input": "nums1 = [4,9,5], nums2 = [9,4,9,8,4]",
        "output": "[4,9]",
        "explanation": "4 appears once in nums1, twice in nums2 (use once). 9 appears once in nums1, twice in nums2 (use once)."
      }
    ],
    "testCases": [
      {
        "input": "[1,2,2,1]\n[2,2]",
        "expectedOutput": "[2,2]",
        "isHidden": false
      },
      {
        "input": "[4,9,5]\n[9,4,9,8,4]",
        "expectedOutput": "[4,9]",
        "isHidden": false
      }
    ],
    "hints": [
      "A simple approach uses Hash Maps.",
      "Create a frequency map for `nums1`.",
      "Iterate through `nums2`. For each `num` in `nums2`, check if it exists in the map and its count is > 0.",
      "If yes, add `num` to the result list and decrement its count in the map.",
      "What if the arrays are already sorted? Can you use Two Pointers?",
      "If sorted, use `p1` for `nums1` and `p2` for `nums2`. If `nums1[p1] == nums2[p2]`, add to result and increment both. If `nums1[p1] < nums2[p2]`, increment `p1`. Else, increment `p2`."
    ],
    "solutions": [
      {
        "language": "javascript",
        "code": "var intersect = function(nums1, nums2) {\n    // 1. Create a frequency map for the smaller array (optimization)\n    const counts = new Map();\n    const smaller = (nums1.length < nums2.length) ? nums1 : nums2;\n    const larger = (nums1.length < nums2.length) ? nums2 : nums1;\n\n    for (const num of smaller) {\n        counts.set(num, (counts.get(num) || 0) + 1);\n    }\n\n    const result = [];\n    // 2. Iterate through the larger array\n    for (const num of larger) {\n        const count = counts.get(num);\n        // Check if the number exists in the map and has a count > 0\n        if (count && count > 0) {\n            result.push(num);\n            counts.set(num, count - 1); // Decrement the count\n        }\n    }\n\n    return result;\n};",
        "explanation": "This solution uses a hash map (`counts`) for efficiency. It first creates a frequency map of the *smaller* of the two arrays (as an optimization). Then, it iterates through the *larger* array. For each number in the larger array, it checks if that number exists in the frequency map and if its count is greater than zero. If both are true, it means this number is part of the intersection. We add the number to the `result` array and decrement its count in the map (to account for frequency).",
        "timeComplexity": "O(m + n)",
        "spaceComplexity": "O(min(m, n))"
      }
    ],
    "acceptanceRate": 55.2,
    "totalSubmissions": 11000,
    "correctSubmissions": 6072,
    "averageTime": 12
  },
  {
    "title": "First Unique Character in a String",
    "description": "Given a string `s`, find the first non-repeating character in it and return its index. If it does not exist, return -1.\n\n**Example 1:**\nInput: s = \"leetcode\"\nOutput: 0\nExplanation: 'l' is the first unique character.\n\n**Example 2:**\nInput: s = \"loveleetcode\"\nOutput: 2\nExplanation: 'v' is the first unique character.\n\n**Example 3:**\nInput: s = \"aabb\"\nOutput: -1\nExplanation: All characters repeat.\n\n**Constraints:**\n- 1 <= s.length <= 10^5\n- `s` consists of only lowercase English letters.",
    "difficulty": "easy",
    "topics": [
      "String",
      "Hash Table",
      "Counting"
    ],
    "companies": [
      "Amazon",
      "Microsoft",
      "Google",
      "Bloomberg"
    ],
    "constraints": [
      "1 <= s.length <= 10^5",
      "s consists of only lowercase English letters."
    ],
    "examples": [
      {
        "input": "s = \"leetcode\"",
        "output": "0",
        "explanation": "'l' at index 0 is the first non-repeating character."
      },
      {
        "input": "s = \"loveleetcode\"",
        "output": "2",
        "explanation": "'v' at index 2 is the first non-repeating character."
      },
      {
        "input": "s = \"aabb\"",
        "output": "-1",
        "explanation": "No unique characters exist."
      }
    ],
    "testCases": [
      {
        "input": "\"leetcode\"",
        "expectedOutput": "0",
        "isHidden": false
      },
      {
        "input": "\"loveleetcode\"",
        "expectedOutput": "2",
        "isHidden": false
      },
      {
        "input": "\"aabb\"",
        "expectedOutput": "-1",
        "isHidden": false
      }
    ],
    "hints": [
      "Use a hash map (or a 26-element array) to store character frequencies.",
      "Pass 1: Iterate through the string `s` and build the frequency map.",
      "Pass 2: Iterate through the string `s` *again*. For each character, check its count in the map. The *first* character you encounter with a count of 1 is your answer. Return its index.",
      "If you finish the second pass without finding a character with count 1, return -1."
    ],
    "solutions": [
      {
        "language": "javascript",
        "code": "var firstUniqChar = function(s) {\n    const counts = new Map();\n\n    // Pass 1: Build frequency map\n    for (const char of s) {\n        counts.set(char, (counts.get(char) || 0) + 1);\n    }\n\n    // Pass 2: Find the first character with count 1\n    for (let i = 0; i < s.length; i++) {\n        if (counts.get(s[i]) === 1) {\n            return i;\n        }\n    }\n\n    // No unique character found\n    return -1;\n};",
        "explanation": "This solution uses a two-pass approach with a hash map (`counts`). In the first pass, we iterate through the input string `s` and build a frequency map of all its characters. In the second pass, we iterate through the string `s` *again*, this time checking the frequency of each character in our `counts` map. The first time we find a character whose count is exactly 1, we return its current index `i`. If we complete the second loop without finding such a character, it means no unique character exists, so we return -1.",
        "timeComplexity": "O(n)",
        "spaceComplexity": "O(1)"
      }
    ],
    "acceptanceRate": 55.6,
    "totalSubmissions": 13000,
    "correctSubmissions": 7228,
    "averageTime": 14
  },
  {
    "title": "Number of 1 Bits",
    "description": "Write a function that takes an unsigned integer and returns the number of '1' bits it has (also known as the Hamming weight).\n\n**Example 1:**\nInput: n = 11 (binary: 00000000000000000000000000001011)\nOutput: 3\n\n**Example 2:**\nInput: n = 128 (binary: 00000000000000000000000010000000)\nOutput: 1\n\n**Constraints:**\n- The input must be a **binary string** of length 32.",
    "difficulty": "easy",
    "topics": [
      "Bit Manipulation"
    ],
    "companies": [
      "Microsoft",
      "Apple",
      "Amazon"
    ],
    "constraints": [
      "The input must be treated as an unsigned 32-bit integer."
    ],
    "examples": [
      {
        "input": "n = 11 (0...01011)",
        "output": "3",
        "explanation": "The binary representation has three '1' bits."
      },
      {
        "input": "n = 128 (0...010000000)",
        "output": "1",
        "explanation": "The binary representation has one '1' bit."
      }
    ],
    "testCases": [
      {
        "input": "11",
        "expectedOutput": "3",
        "isHidden": false
      },
      {
        "input": "128",
        "expectedOutput": "1",
        "isHidden": false
      },
      {
        "input": "4294967293",
        "expectedOutput": "31",
        "isHidden": true
      }
    ],
    "hints": [
      "You can loop 32 times, checking the last bit in each iteration.",
      "Check the last bit using the bitwise AND operator: `n & 1`.",
      "Shift the number to the right in each iteration: `n = n >>> 1` (use unsigned right shift `>>>`).",
      "A clever trick: `n & (n - 1)` removes the rightmost '1' bit. You can loop while `n != 0`, apply this operation, and count how many times you loop."
    ],
    "solutions": [
      {
        "language": "javascript",
        "code": "var hammingWeight = function(n) {\n    let count = 0;\n    while (n !== 0) {\n        // This operation removes the rightmost '1' bit\n        n = n & (n - 1);\n        count++;\n    }\n    return count;\n};",
        "explanation": "This solution uses a clever bit manipulation trick. The operation `n & (n - 1)` effectively removes (turns to zero) the rightmost '1' bit in the binary representation of `n`. For example, if `n` is 6 (110), `n-1` is 5 (101). `110 & 101` is `100` (4). The rightmost '1' was removed. We repeat this process in a loop, incrementing a `count` each time, until `n` becomes 0. The final `count` is the total number of '1' bits.",
        "timeComplexity": "O(k)",
        "spaceComplexity": "O(1)"
      }
    ],
    "acceptanceRate": 78.1,
    "totalSubmissions": 10000,
    "correctSubmissions": 7810,
    "averageTime": 8
  },
  {
    "title": "Reverse Bits",
    "description": "Reverse bits of a given 32-bit unsigned integer.\n\n**Example 1:**\nInput: n = 43261596 (binary: 00000010100101000001111010011100)\nOutput: 964176192 (binary: 00111001011110000010100101000000)\n\n**Constraints:**\n- The input must be a **binary string** of length 32.",
    "difficulty": "easy",
    "topics": [
      "Bit Manipulation"
    ],
    "companies": [
      "Apple",
      "Microsoft",
      "Amazon"
    ],
    "constraints": [
      "Input is treated as an unsigned 32-bit integer."
    ],
    "examples": [
      {
        "input": "n = 43261596",
        "output": "964176192",
        "explanation": "The binary representation is reversed."
      }
    ],
    "testCases": [
      {
        "input": "43261596",
        "expectedOutput": "964176192",
        "isHidden": false
      },
      {
        "input": "0",
        "expectedOutput": "0",
        "isHidden": true
      }
    ],
    "hints": [
      "Iterate 32 times.",
      "In each iteration, get the *last* bit of the input `n`.",
      "Shift the `result` to the *left* by 1.",
      "Add the extracted bit to the `result` (using bitwise OR `|`).",
      "Shift the input `n` to the *right* by 1 (unsigned `>>>`)."
    ],
    "solutions": [
      {
        "language": "javascript",
        "code": "var reverseBits = function(n) {\n    let result = 0;\n    for (let i = 0; i < 32; i++) {\n        // 1. Shift result left to make space for the next bit\n        result <<= 1;\n        \n        // 2. Get the last bit of n\n        const lastBit = n & 1;\n        \n        // 3. Add the last bit to the result\n        result |= lastBit;\n        \n        // 4. Shift n right to process the next bit\n        n >>>= 1;\n    }\n    // JavaScript handles numbers weirdly with bitwise ops sometimes,\n    // force it back to unsigned 32-bit.\n    return result >>> 0;\n};",
        "explanation": "This solution iterates 32 times, once for each bit. In each iteration `i`: 1. It shifts the `result` one bit to the left (`result <<= 1`), creating space at the least significant bit position. 2. It extracts the least significant bit of `n` using `n & 1`. 3. It adds this extracted bit to `result` using the bitwise OR operator (`|=`). 4. It shifts `n` one bit to the right using unsigned right shift (`>>>= 1`) to prepare for the next iteration. After 32 iterations, `result` holds the reversed bits. The final `>>> 0` forces JavaScript to treat the result as an unsigned 32-bit integer.",
        "timeComplexity": "O(1)",
        "spaceComplexity": "O(1)"
      }
    ],
    "acceptanceRate": 61.9,
    "totalSubmissions": 9000,
    "correctSubmissions": 5571,
    "averageTime": 10
  },
  {
    "title": "Single Number",
    "description": "Given a non-empty array of integers `nums`, every element appears twice except for one. Find that single one.\n\nYou must implement a solution with a linear runtime complexity and use only constant extra space.\n\n**Example 1:**\nInput: nums = [2,2,1]\nOutput: 1\n\n**Example 2:**\nInput: nums = [4,1,2,1,2]\nOutput: 4\n\n**Constraints:**\n- 1 <= nums.length <= 3 * 10^4\n- -3 * 10^4 <= nums[i] <= 3 * 10^4\n- Each element in the array appears twice except for one element which appears only once.",
    "difficulty": "easy",
    "topics": [
      "Array",
      "Bit Manipulation"
    ],
    "companies": [
      "Amazon",
      "Facebook",
      "Google",
      "Apple"
    ],
    "constraints": [
      "1 <= nums.length <= 3 * 10^4",
      "Each element appears twice except for one.",
      "O(n) time and O(1) space."
    ],
    "examples": [
      {
        "input": "nums = [2,2,1]",
        "output": "1",
        "explanation": "1 appears only once."
      },
      {
        "input": "nums = [4,1,2,1,2]",
        "output": "4",
        "explanation": "4 appears only once."
      }
    ],
    "testCases": [
      {
        "input": "[2,2,1]",
        "expectedOutput": "1",
        "isHidden": false
      },
      {
        "input": "[4,1,2,1,2]",
        "expectedOutput": "4",
        "isHidden": false
      },
      {
        "input": "[1]",
        "expectedOutput": "1",
        "isHidden": true
      }
    ],
    "hints": [
      "The constraints O(n) time and O(1) space rule out Hash Sets and sorting.",
      "Think about the properties of the XOR (^) bitwise operator.",
      "Key properties: `x ^ x = 0` and `x ^ 0 = x`.",
      "Also, XOR is commutative and associative: `a ^ b ^ a = (a ^ a) ^ b = 0 ^ b = b`.",
      "What happens if you XOR all the numbers in the array together?"
    ],
    "solutions": [
      {
        "language": "javascript",
        "code": "var singleNumber = function(nums) {\n    let result = 0;\n    for (const num of nums) {\n        result ^= num;\n    }\n    return result;\n};",
        "explanation": "This solution leverages the XOR bitwise operator. XOR has the properties that `x ^ x = 0` and `x ^ 0 = x`. Since every element in the array appears twice except for one, if we XOR all elements together, all the pairs will cancel each other out (become 0), leaving only the unique number XORed with 0, which is the unique number itself.",
        "timeComplexity": "O(n)",
        "spaceComplexity": "O(1)"
      }
    ],
    "acceptanceRate": 68.3,
    "totalSubmissions": 19000,
    "correctSubmissions": 12977,
    "averageTime": 10
  },
  {
    "title": "Happy Number",
    "description": "Write an algorithm to determine if a number `n` is happy.\n\nA happy number is a number defined by the following process:\n- Starting with any positive integer, replace the number by the sum of the squares of its digits.\n- Repeat the process until the number equals 1 (where it will stay), or it loops endlessly in a cycle which does not include 1.\n- Those numbers for which this process ends in 1 are happy.\n\nReturn `true` if `n` is a happy number, and `false` if not.\n\n**Example 1:**\nInput: n = 19\nOutput: true\nExplanation:\n1^2 + 9^2 = 82\n8^2 + 2^2 = 68\n6^2 + 8^2 = 100\n1^2 + 0^2 + 0^2 = 1\n\n**Example 2:**\nInput: n = 2\nOutput: false\n\n**Constraints:**\n- 1 <= n <= 2^31 - 1",
    "difficulty": "easy",
    "topics": [
      "Hash Table",
      "Math",
      "Two Pointers"
    ],
    "companies": [
      "Uber",
      "Google",
      "Apple"
    ],
    "constraints": [
      "1 <= n <= 2^31 - 1"
    ],
    "examples": [
      {
        "input": "n = 19",
        "output": "true",
        "explanation": "The process leads to 1."
      },
      {
        "input": "n = 2",
        "output": "false",
        "explanation": "The process enters a cycle: 2 -> 4 -> 16 -> 37 -> 58 -> 89 -> 145 -> 42 -> 20 -> 4..."
      }
    ],
    "testCases": [
      {
        "input": "19",
        "expectedOutput": "true",
        "isHidden": false
      },
      {
        "input": "2",
        "expectedOutput": "false",
        "isHidden": false
      },
      {
        "input": "1",
        "expectedOutput": "true",
        "isHidden": true
      }
    ],
    "hints": [
      "How do you detect if the process loops endlessly?",
      "If you encounter a number that you have seen before during the process, it means you are in a cycle.",
      "Use a Hash Set to store the numbers you have already encountered.",
      "In a loop: calculate the 'next' number (sum of squares of digits). If `next == 1`, return `true`. If `next` is already in the set, return `false`. Otherwise, add `next` to the set and continue.",
      "Alternatively, use the 'Floyd's Cycle-Finding Algorithm' (slow/fast pointers) to detect the cycle without using extra space."
    ],
    "solutions": [
      {
        "language": "javascript",
        "code": "var isHappy = function(n) {\n    const seen = new Set();\n\n    // Helper function to calculate sum of squares of digits\n    function getNext(num) {\n        let sum = 0;\n        while (num > 0) {\n            const digit = num % 10;\n            sum += digit * digit;\n            num = Math.floor(num / 10);\n        }\n        return sum;\n    }\n\n    while (n !== 1 && !seen.has(n)) {\n        seen.add(n);\n        n = getNext(n);\n    }\n\n    return n === 1;\n};",
        "explanation": "This solution uses a Hash Set (`seen`) to detect cycles. It defines a helper function `getNext` to calculate the sum of the squares of a number's digits. The main loop continues as long as the current number `n` is not 1 and has not been `seen` before. Inside the loop, we add `n` to the `seen` set and then update `n` to the next number in the sequence using `getNext(n)`. The loop terminates either when `n` becomes 1 (happy number) or when `n` is found in the `seen` set (cycle detected). Finally, we return `true` only if `n === 1`.",
        "timeComplexity": "O(log n)",
        "spaceComplexity": "O(log n)"
      }
    ],
    "acceptanceRate": 53.6,
    "totalSubmissions": 10000,
    "correctSubmissions": 5360,
    "averageTime": 11
  },
  {
    "title": "Isomorphic Strings",
    "description": "Given two strings `s` and `t`, determine if they are isomorphic.\n\nTwo strings `s` and `t` are isomorphic if the characters in `s` can be replaced to get `t`.\n\nAll occurrences of a character must be replaced with another character while preserving the order of characters. No two characters may map to the same character, but a character may map to itself.\n\n**Example 1:**\nInput: s = \"egg\", t = \"add\"\nOutput: true\n\n**Example 2:**\nInput: s = \"foo\", t = \"bar\"\nOutput: false\n\n**Example 3:**\nInput: s = \"paper\", t = \"title\"\nOutput: true\n\n**Constraints:**\n- 1 <= s.length <= 5 * 10^4\n- t.length == s.length\n- `s` and `t` consist of any valid ascii character.",
    "difficulty": "easy",
    "topics": [
      "String",
      "Hash Table"
    ],
    "companies": [
      "LinkedIn",
      "Google",
      "Amazon"
    ],
    "constraints": [
      "1 <= s.length <= 5 * 10^4",
      "t.length == s.length",
      "s and t consist of any valid ascii character."
    ],
    "examples": [
      {
        "input": "s = \"egg\", t = \"add\"",
        "output": "true",
        "explanation": "e -> a, g -> d. Mapping is consistent."
      },
      {
        "input": "s = \"foo\", t = \"bar\"",
        "output": "false",
        "explanation": "f -> b, but the second o maps to r (not b). Inconsistent."
      },
      {
        "input": "s = \"paper\", t = \"title\"",
        "output": "true",
        "explanation": "p -> t, a -> i, e -> l, r -> e. Mapping is consistent."
      }
    ],
    "testCases": [
      {
        "input": "\"egg\"\n\"add\"",
        "expectedOutput": "true",
        "isHidden": false
      },
      {
        "input": "\"foo\"\n\"bar\"",
        "expectedOutput": "false",
        "isHidden": false
      },
      {
        "input": "\"paper\"\n\"title\"",
        "expectedOutput": "true",
        "isHidden": false
      },
      {
        "input": "\"badc\"\n\"baba\"",
        "expectedOutput": "false",
        "isHidden": true
      }
    ],
    "hints": [
      "We need to check two conditions: 1. The mapping from `s` to `t` is consistent. 2. The mapping from `t` to `s` is consistent (no two chars in `s` map to the same char in `t`).",
      "Use two hash maps: `s_to_t` and `t_to_s`.",
      "Iterate through the strings using an index `i`.",
      "For each `s[i]` and `t[i]`:\n  - Check `s_to_t`: If `s[i]` is mapped, does it map to `t[i]`? If not, return `false`. If not mapped, map `s[i] -> t[i]`.\n  - Check `t_to_s`: If `t[i]` is mapped, does it map to `s[i]`? If not, return `false`. If not mapped, map `t[i] -> s[i]`.",
      "If the loop finishes, return `true`."
    ],
    "solutions": [
      {
        "language": "javascript",
        "code": "var isIsomorphic = function(s, t) {\n    if (s.length !== t.length) {\n        return false;\n    }\n\n    const s_to_t = new Map();\n    const t_to_s = new Map();\n\n    for (let i = 0; i < s.length; i++) {\n        const sChar = s[i];\n        const tChar = t[i];\n\n        // Check mapping s -> t\n        if (s_to_t.has(sChar)) {\n            if (s_to_t.get(sChar) !== tChar) {\n                return false; // Inconsistent mapping\n            }\n        } else {\n            s_to_t.set(sChar, tChar);\n        }\n\n        // Check mapping t -> s (ensures no two s chars map to the same t char)\n        if (t_to_s.has(tChar)) {\n            if (t_to_s.get(tChar) !== sChar) {\n                return false; // Two different s chars mapping to the same t char\n            }\n        } else {\n            t_to_s.set(tChar, sChar);\n        }\n    }\n\n    return true;\n};",
        "explanation": "This solution uses two hash maps, `s_to_t` and `t_to_s`, to track the character mappings in both directions. It iterates through the strings simultaneously. For each pair of characters `sChar` and `tChar` at index `i`, it checks: 1. If `sChar` is already in `s_to_t`, is its mapping equal to `tChar`? If not, return `false`. If `sChar` is not mapped, create the mapping `sChar -> tChar`. 2. If `tChar` is already in `t_to_s`, is its mapping equal to `sChar`? If not, return `false` (this prevents two different `s` characters from mapping to the same `t` character). If `tChar` is not mapped, create the mapping `tChar -> sChar`. If the loop completes without returning `false`, the strings are isomorphic.",
        "timeComplexity": "O(n)",
        "spaceComplexity": "O(k)"
      }
    ],
    "acceptanceRate": 41.5,
    "totalSubmissions": 11000,
    "correctSubmissions": 4565,
    "averageTime": 13
  },
  {
    "title": "Min Stack",
    "description": "Design a stack that supports push, pop, top, and retrieving the minimum element in constant time.\n\nImplement the `MinStack` class:\n- `MinStack()` initializes the stack object.\n- `void push(int val)` pushes the element `val` onto the stack.\n- `void pop()` removes the element on the top of the stack.\n- `int top()` gets the top element of the stack.\n- `int getMin()` retrieves the minimum element in the stack.\n\nEach function should operate in O(1) time.\n\n**Example 1:**\n`MinStack minStack = new MinStack();`\n`minStack.push(-2);`\n`minStack.push(0);`\n`minStack.push(-3);`\n`minStack.getMin();` // return -3\n`minStack.pop();`\n`minStack.top();`    // return 0\n`minStack.getMin();` // return -2\n\n**Constraints:**\n- -2^31 <= val <= 2^31 - 1\n- Methods `pop`, `top` and `getMin` operations will always be called on **non-empty** stacks.\n- At most 3 * 10^4 calls will be made to `push`, `pop`, `top`, and `getMin`.",
    "difficulty": "easy",
    "topics": [
      "Stack",
      "Design"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Bloomberg",
      "Microsoft"
    ],
    "constraints": [
      "-2^31 <= val <= 2^31 - 1",
      "pop, top, getMin will be called on non-empty stacks.",
      "At most 3 * 10^4 calls.",
      "All operations must be O(1)."
    ],
    "examples": [
      {
        "input": "[\"MinStack\",\"push\",\"push\",\"push\",\"getMin\",\"pop\",\"top\",\"getMin\"]\n[[],[-2],[0],[-3],[],[],[],[]]",
        "output": "[null,null,null,null,-3,null,0,-2]",
        "explanation": "See problem description."
      }
    ],
    "testCases": [
      {
        "input": "[\"MinStack\",\"push\",\"push\",\"push\",\"getMin\",\"pop\",\"top\",\"getMin\"]\n[[],[-2],[0],[-3],[],[],[],[]]",
        "expectedOutput": "[null,null,null,null,-3,null,0,-2]",
        "isHidden": false
      }
    ],
    "hints": [
      "Use two stacks. One regular stack for push/pop/top, and another stack (`minStack`) to track the minimum.",
      "When pushing `val` onto the main stack, also push onto `minStack`.",
      "What value should you push onto `minStack`? It should be the minimum of `val` and the *current* minimum (which is the top of `minStack`).",
      "When popping from the main stack, also pop from `minStack`.",
      "`getMin()` simply returns the top of `minStack`.",
      "Alternatively, store pairs `[value, currentMin]` on a single stack."
    ],
    "solutions": [
      {
        "language": "javascript",
        "code": "var MinStack = function() {\n    this.stack = [];\n    this.minStack = []; // Stores the minimum up to that point\n};\n\nMinStack.prototype.push = function(val) {\n    this.stack.push(val);\n    \n    // Update the minStack\n    let currentMin;\n    if (this.minStack.length === 0) {\n        currentMin = val;\n    } else {\n        // The new minimum is the smaller of 'val' and the previous minimum\n        currentMin = Math.min(val, this.minStack[this.minStack.length - 1]);\n    }\n    this.minStack.push(currentMin);\n};\n\nMinStack.prototype.pop = function() {\n    this.stack.pop();\n    this.minStack.pop(); // Keep minStack synchronized\n};\n\nMinStack.prototype.top = function() {\n    return this.stack[this.stack.length - 1];\n};\n\nMinStack.prototype.getMin = function() {\n    return this.minStack[this.minStack.length - 1];\n};",
        "explanation": "This solution uses two stacks. `this.stack` is the main stack storing all values. `this.minStack` runs in parallel. When `push(val)` is called, `val` is pushed onto the main stack. We then determine the *new* minimum: it's either `val` itself (if `minStack` is empty) or the smaller value between `val` and the current top of `minStack`. This new minimum is pushed onto `minStack`. When `pop()` is called, we pop from *both* stacks to keep them synchronized. `top()` returns the top of the main stack, and `getMin()` returns the top of `minStack`, both in O(1) time.",
        "timeComplexity": "O(1)",
        "spaceComplexity": "O(n)"
      }
    ],
    "acceptanceRate": 48.9,
    "totalSubmissions": 12000,
    "correctSubmissions": 5868,
    "averageTime": 15
  },
  {
    "title": "Design HashMap",
    "description": "Design a HashMap without using any built-in hash table libraries.\n\nImplement the `MyHashMap` class:\n- `MyHashMap()` Initializes the object with an empty map.\n- `void put(int key, int value)` Inserts a `(key, value)` pair into the HashMap. If the `key` already exists, update the corresponding `value`.\n- `int get(int key)` Returns the `value` to which the specified `key` is mapped, or -1 if this map contains no mapping for the `key`.\n- `void remove(int key)` Removes the `key` and its corresponding `value` if the map contains the mapping for the `key`.\n\n**Example 1:**\n`MyHashMap myHashMap = new MyHashMap();`\n`myHashMap.put(1, 1);` // map is {1=1}\n`myHashMap.put(2, 2);` // map is {1=1, 2=2}\n`myHashMap.get(1);`    // return 1\n`myHashMap.get(3);`    // return -1 (not found)\n`myHashMap.put(2, 1);` // map is {1=1, 2=1} (update)\n`myHashMap.get(2);`    // return 1\n`myHashMap.remove(2);` // remove mapping for 2, map is {1=1}\n`myHashMap.get(2);`    // return -1 (not found)\n\n**Constraints:**\n- 0 <= key, value <= 10^6\n- At most 10^4 calls will be made to `put`, `get`, and `remove`.",
    "difficulty": "easy",
    "topics": [
      "Design",
      "Hash Table",
      "Array"
    ],
    "companies": [
      "Amazon",
      "Microsoft",
      "Facebook",
      "Apple"
    ],
    "constraints": [
      "0 <= key, value <= 10^6",
      "At most 10^4 calls."
    ],
    "examples": [
      {
        "input": "[\"MyHashMap\", \"put\", \"put\", \"get\", \"get\", \"put\", \"get\", \"remove\", \"get\"]\n[[], [1, 1], [2, 2], [1], [3], [2, 1], [2], [2], [2]]",
        "output": "[null, null, null, 1, -1, null, 1, null, -1]",
        "explanation": "See problem description."
      }
    ],
    "testCases": [
      {
        "input": "[\"MyHashMap\",\"put\",\"put\",\"get\",\"get\",\"put\",\"get\",\"remove\",\"get\"]\n[[],[1,1],[2,2],[1],[3],[2,1],[2],[2],[2]]",
        "expectedOutput": "[null,null,null,1,-1,null,1,null,-1]",
        "isHidden": false
      }
    ],
    "hints": [
      "The simplest approach (given the constraints) is to use a large array.",
      "Since `key` is up to 10^6, create an array `data` of size 10^6 + 1.",
      "Initialize all values to -1 (or another indicator for 'not present').",
      "`put(key, value)`: Set `data[key] = value`.",
      "`get(key)`: Return `data[key]`.",
      "`remove(key)`: Set `data[key] = -1`.",
      "A more realistic HashMap would use hashing and handle collisions (e.g., with chaining using Linked Lists)."
    ],
    "solutions": [
      {
        "language": "javascript",
        "code": "var MyHashMap = function() {\n    // Simple array-based approach due to constraints\n    this.size = 1000001; // Max key is 10^6\n    this.data = new Array(this.size).fill(-1);\n};\n\n/** \n * @param {number} key \n * @param {number} value\n * @return {void}\n */\nMyHashMap.prototype.put = function(key, value) {\n    this.data[key] = value;\n};\n\n/** \n * @param {number} key\n * @return {number}\n */\nMyHashMap.prototype.get = function(key) {\n    return this.data[key];\n};\n\n/** \n * @param {number} key\n * @return {void}\n */\nMyHashMap.prototype.remove = function(key) {\n    this.data[key] = -1;\n};",
        "explanation": "This solution takes advantage of the problem constraints (key range 0 to 10^6). It uses a large array `data` where the index directly corresponds to the key. It initializes the array with -1 to signify that a key is not present. `put(key, value)` simply sets `data[key]` to `value`. `get(key)` returns `data[key]` (which will be -1 if the key wasn't inserted). `remove(key)` sets `data[key]` back to -1. This provides O(1) average time complexity for all operations but uses O(N) space where N is the maximum possible key value.",
        "timeComplexity": "O(1)",
        "spaceComplexity": "O(N)"
      }
    ],
    "acceptanceRate": 66.2,
    "totalSubmissions": 5000,
    "correctSubmissions": 3310,
    "averageTime": 15
  },
  {
    "title": "Design HashSet",
    "description": "Design a HashSet without using any built-in hash table libraries.\n\nImplement the `MyHashSet` class:\n- `MyHashSet()` Initializes the object with an empty set.\n- `void add(int key)` Inserts the value `key` into the HashSet.\n- `bool contains(int key)` Returns whether the value `key` exists in the HashSet or not.\n- `void remove(int key)` Removes the value `key` in the HashSet. If `key` does not exist, do nothing.\n\n**Example 1:**\n`MyHashSet myHashSet = new MyHashSet();`\n`myHashSet.add(1);`      // set = [1]\n`myHashSet.add(2);`      // set = [1, 2]\n`myHashSet.contains(1);` // return True\n`myHashSet.contains(3);` // return False\n`myHashSet.add(2);`      // set = [1, 2]\n`myHashSet.contains(2);` // return True\n`myHashSet.remove(2);`   // set = [1]\n`myHashSet.contains(2);` // return False\n\n**Constraints:**\n- 0 <= key <= 10^6\n- At most 10^4 calls will be made to `add`, `remove`, and `contains`.",
    "difficulty": "easy",
    "topics": [
      "Design",
      "Hash Table",
      "Array"
    ],
    "companies": [
      "Amazon",
      "Microsoft",
      "Facebook",
      "Apple"
    ],
    "constraints": [
      "0 <= key <= 10^6",
      "At most 10^4 calls."
    ],
    "examples": [
      {
        "input": "[\"MyHashSet\", \"add\", \"add\", \"contains\", \"contains\", \"add\", \"contains\", \"remove\", \"contains\"]\n[[], [1], [2], [1], [3], [2], [2], [2], [2]]",
        "output": "[null, null, null, true, false, null, true, null, false]",
        "explanation": "See problem description."
      }
    ],
    "testCases": [
      {
        "input": "[\"MyHashSet\",\"add\",\"add\",\"contains\",\"contains\",\"add\",\"contains\",\"remove\",\"contains\"]\n[[],[1],[2],[1],[3],[2],[2],[2],[2]]",
        "expectedOutput": "[null,null,null,true,false,null,true,null,false]",
        "isHidden": false
      }
    ],
    "hints": [
      "Similar to 'Design HashMap', the constraints allow a simple array-based solution.",
      "Use a boolean array `data` of size 10^6 + 1.",
      "Initialize all values to `false`.",
      "`add(key)`: Set `data[key] = true`.",
      "`contains(key)`: Return `data[key]`.",
      "`remove(key)`: Set `data[key] = false`."
    ],
    "solutions": [
      {
        "language": "javascript",
        "code": "var MyHashSet = function() {\n    // Simple boolean array approach due to constraints\n    this.size = 1000001; // Max key is 10^6\n    this.data = new Array(this.size).fill(false);\n};\n\n/** \n * @param {number} key\n * @return {void}\n */\nMyHashSet.prototype.add = function(key) {\n    this.data[key] = true;\n};\n\n/** \n * @param {number} key\n * @return {void}\n */\nMyHashSet.prototype.remove = function(key) {\n    this.data[key] = false;\n};\n\n/** \n * @param {number} key\n * @return {boolean}\n */\nMyHashSet.prototype.contains = function(key) {\n    return this.data[key];\n};",
        "explanation": "This solution uses a large boolean array `data` where the index directly corresponds to the key, leveraging the problem constraints. It initializes the array with `false` to signify absence. `add(key)` sets `data[key]` to `true`. `remove(key)` sets `data[key]` to `false`. `contains(key)` simply returns the boolean value at `data[key]`. This achieves O(1) time complexity but uses O(N) space, where N is the maximum possible key value.",
        "timeComplexity": "O(1)",
        "spaceComplexity": "O(N)"
      }
    ],
    "acceptanceRate": 68.1,
    "totalSubmissions": 5000,
    "correctSubmissions": 3405,
    "averageTime": 14
  },
  {
    "title": "Search a 2D Matrix II",
    "description": "Write an efficient algorithm that searches for a `target` value in an `m x n` integer matrix `matrix`. This matrix has the following properties:\n\n- Integers in each row are sorted in ascending from left to right.\n- Integers in each column are sorted in ascending from top to bottom.\n\n**Example 1:**\nInput: matrix = [[1,4,7,11,15],[2,5,8,12,19],[3,6,9,16,22],[10,13,14,17,24],[18,21,23,26,30]], target = 5\nOutput: true\n\n**Example 2:**\nInput: matrix = [[1,4,7,11,15],[2,5,8,12,19],[3,6,9,16,22],[10,13,14,17,24],[18,21,23,26,30]], target = 20\nOutput: false\n\n**Constraints:**\n- m == matrix.length\n- n == matrix[i].length\n- 1 <= n, m <= 300\n- -10^9 <= matrix[i][j] <= 10^9\n- -10^9 <= target <= 10^9",
    "difficulty": "medium",
    "topics": [
      "Array",
      "Binary Search",
      "Matrix"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Microsoft",
      "Facebook"
    ],
    "constraints": [
      "m == matrix.length",
      "n == matrix[i].length",
      "1 <= n, m <= 300",
      "Rows sorted L-R.",
      "Columns sorted T-B."
    ],
    "examples": [
      {
        "input": "matrix = [[1,4,7],[2,5,8],[3,6,9]], target = 5",
        "output": "true",
        "explanation": "5 is present at (1,1)."
      },
      {
        "input": "matrix = [[1,4,7],[2,5,8],[3,6,9]], target = 20",
        "output": "false",
        "explanation": "20 is not present."
      }
    ],
    "testCases": [
      {
        "input": "[[1,4,7,11,15],[2,5,8,12,19],[3,6,9,16,22],[10,13,14,17,24],[18,21,23,26,30]]\n5",
        "expectedOutput": "true",
        "isHidden": false
      },
      {
        "input": "[[1,4,7,11,15],[2,5,8,12,19],[3,6,9,16,22],[10,13,14,17,24],[18,21,23,26,30]]\n20",
        "expectedOutput": "false",
        "isHidden": false
      },
      {
        "input": "[[-5]]\n-5",
        "expectedOutput": "true",
        "isHidden": true
      }
    ],
    "hints": [
      "You cannot simply treat this as a 1D array like in 'Search a 2D Matrix I'.",
      "Think about where to start searching. Consider the corners.",
      "If you start at the top-right corner (or bottom-left):",
      "Let the current element be `matrix[row][col]`.",
      "If `target == matrix[row][col]`, return `true`.",
      "If `target < matrix[row][col]`, the target cannot be in the current column (because columns are sorted). Move left: `col--`.",
      "If `target > matrix[row][col]`, the target cannot be in the current row (because rows are sorted). Move down: `row++`.",
      "Repeat until you find the target or go out of bounds."
    ],
    "solutions": [
      {
        "language": "javascript",
        "code": "var searchMatrix = function(matrix, target) {\n    if (!matrix || matrix.length === 0) {\n        return false;\n    }\n\n    const ROWS = matrix.length;\n    const COLS = matrix[0].length;\n\n    // Start search from the top-right corner\n    let row = 0;\n    let col = COLS - 1;\n\n    while (row < ROWS && col >= 0) {\n        const currentVal = matrix[row][col];\n\n        if (currentVal === target) {\n            return true;\n        } else if (currentVal > target) {\n            // Target must be to the left (smaller values)\n            col--;\n        } else {\n            // Target must be below (larger values)\n            row++;\n        }\n    }\n\n    // Target not found\n    return false;\n};",
        "explanation": "This solution uses an efficient search pattern starting from the top-right corner. Because rows are sorted left-to-right and columns top-to-bottom, comparing the `target` with the value at `matrix[row][col]` tells us exactly where to go next. If the `target` is smaller than the current value, it cannot be in the current column (everything below is larger), so we move left (`col--`). If the `target` is larger, it cannot be in the current row (everything left is smaller), so we move down (`row++`). We continue this process until we find the `target` or move out of the matrix bounds.",
        "timeComplexity": "O(m + n)",
        "spaceComplexity": "O(1)"
      }
    ],
    "acceptanceRate": 45.2,
    "totalSubmissions": 10000,
    "correctSubmissions": 4520,
    "averageTime": 16
  },
  {
    "title": "Path Sum II",
    "description": "Given the `root` of a binary tree and an integer `targetSum`, return all **root-to-leaf** paths where the sum of the node values in the path equals `targetSum`. Each path should be returned as a list of the node values, not node references.\n\nA root-to-leaf path is a path starting from the root and ending at any leaf node. A leaf is a node with no children.\n\n**Example 1:**\nInput: root = [5,4,8,11,null,13,4,7,2,null,null,5,1], targetSum = 22\nOutput: [[5,4,11,2],[5,8,4,5]]\n\n**Example 2:**\nInput: root = [1,2,3], targetSum = 5\nOutput: []\n\n**Example 3:**\nInput: root = [1,2], targetSum = 0\nOutput: []\n\n**Constraints:**\n- The number of nodes in the tree is in the range [0, 5000].\n- -1000 <= Node.val <= 1000\n- -1000 <= targetSum <= 1000",
    "difficulty": "medium",
    "topics": [
      "Tree",
      "Depth-First Search",
      "Backtracking"
    ],
    "companies": [
      "Amazon",
      "Microsoft",
      "Facebook",
      "LinkedIn"
    ],
    "constraints": [
      "The number of nodes in the tree is in the range [0, 5000].",
      "-1000 <= Node.val <= 1000",
      "-1000 <= targetSum <= 1000"
    ],
    "examples": [
      {
        "input": "root = [5,4,8,11,null,13,4,7,2,null,null,5,1], targetSum = 22",
        "output": "[[5,4,11,2],[5,8,4,5]]",
        "explanation": "Two root-to-leaf paths sum to 22."
      },
      {
        "input": "root = [1,2,3], targetSum = 5",
        "output": "[]",
        "explanation": "No path sums to 5."
      }
    ],
    "testCases": [
      {
        "input": "[5,4,8,11,null,13,4,7,2,null,null,5,1]\n22",
        "expectedOutput": "[[5,4,11,2],[5,8,4,5]]",
        "isHidden": false
      },
      {
        "input": "[1,2,3]\n5",
        "expectedOutput": "[]",
        "isHidden": false
      },
      {
        "input": "[]\n0",
        "expectedOutput": "[]",
        "isHidden": true
      }
    ],
    "hints": [
      "This is a variation of 'Path Sum I', requiring backtracking to collect the paths.",
      "Use a DFS helper function `dfs(node, remainingSum, currentPath)`.",
      "Base case: If `node` is null, return.",
      "Add `node.val` to `currentPath`.",
      "Check if it's a leaf node: `if (!node.left && !node.right)`.",
      "If it's a leaf, check if `remainingSum == node.val`. If yes, add a *copy* of `currentPath` to the results.",
      "Recursive step: Call `dfs(node.left, remainingSum - node.val, currentPath)` and `dfs(node.right, remainingSum - node.val, currentPath)`.",
      "**Crucially**, after the recursive calls for a node return, you must *backtrack* by removing `node.val` from `currentPath`."
    ],
    "solutions": [
      {
        "language": "javascript",
        "code": "/**\n * Definition for a binary tree node.\n * function TreeNode(val, left, right) {\n * this.val = (val===undefined ? 0 : val)\n * this.left = (left===undefined ? null : left)\n * this.right = (right===undefined ? null : right)\n * }\n */\nvar pathSum = function(root, targetSum) {\n    const results = [];\n\n    /**\n     * @param {TreeNode} node\n     * @param {number} currentSum\n     * @param {number[]} currentPath\n     */\n    function dfs(node, currentSum, currentPath) {\n        if (node === null) {\n            return;\n        }\n\n        // 1. Choose (add node to path)\n        currentPath.push(node.val);\n        currentSum += node.val;\n\n        // Check if it's a leaf and the sum matches\n        if (node.left === null && node.right === null && currentSum === targetSum) {\n            results.push([...currentPath]); // Add a copy!\n        }\n\n        // 2. Explore children\n        dfs(node.left, currentSum, currentPath);\n        dfs(node.right, currentSum, currentPath);\n\n        // 3. Unchoose (Backtrack)\n        currentPath.pop();\n    }\n\n    dfs(root, 0, []);\n    return results;\n};",
        "explanation": "This solution uses Depth-First Search (DFS) with backtracking. The `dfs` function explores paths from the root. It takes the `node`, the `currentSum` accumulated so far, and the `currentPath` (list of node values). When visiting a `node`, it adds the node's value to `currentPath` and `currentSum`. It then checks if the node is a leaf and if `currentSum` equals `targetSum`. If both are true, a valid path is found, and a *copy* of `currentPath` is added to `results`. Then, it recursively calls `dfs` for the left and right children. After the recursive calls return, it *backtracks* by removing the current node's value from `currentPath` using `pop()`, allowing other paths to be explored.",
        "timeComplexity": "O(n^2)",
        "spaceComplexity": "O(n)"
      }
    ],
    "acceptanceRate": 49.5,
    "totalSubmissions": 9000,
    "correctSubmissions": 4455,
    "averageTime": 19
  },
  {
    "title": "Find Minimum in Rotated Sorted Array II",
    "description": "Suppose an array of length `n` sorted in ascending order is rotated between 1 and `n` times.\n\nGiven the sorted rotated array `nums` that may contain **duplicates**, return the minimum element of this array.\n\nYou must decrease the overall operation steps as much as possible.\n\n**Example 1:**\nInput: nums = [1,3,5]\nOutput: 1\n\n**Example 2:**\nInput: nums = [2,2,2,0,1]\nOutput: 0\n\n**Constraints:**\n- n == nums.length\n- 1 <= n <= 5000\n- -5000 <= nums[i] <= 5000\n- `nums` is sorted and rotated and **may contain duplicates**.",
    "difficulty": "hard",
    "topics": [
      "Array",
      "Binary Search"
    ],
    "companies": [
      "Amazon",
      "Microsoft",
      "Facebook",
      "Google"
    ],
    "constraints": [
      "n == nums.length",
      "1 <= n <= 5000",
      "nums is sorted and rotated and may contain duplicates."
    ],
    "examples": [
      {
        "input": "nums = [1,3,5]",
        "output": "1",
        "explanation": "Not rotated, minimum is first element."
      },
      {
        "input": "nums = [2,2,2,0,1]",
        "output": "0",
        "explanation": "The minimum element is 0."
      }
    ],
    "testCases": [
      {
        "input": "[1,3,5]",
        "expectedOutput": "1",
        "isHidden": false
      },
      {
        "input": "[2,2,2,0,1]",
        "expectedOutput": "0",
        "isHidden": false
      },
      {
        "input": "[3,3,1,3]",
        "expectedOutput": "1",
        "isHidden": true
      }
    ],
    "hints": [
      "This is a variation of 'Find Minimum in Rotated Sorted Array I', but with duplicates.",
      "The binary search approach still works, but needs modification for the duplicate case.",
      "The difficult case is when `nums[mid] == nums[right]` (or `nums[mid] == nums[left]`). In this case, you don't know which side the minimum is on.",
      "Example: `[3, 3, 1, 3]` (mid=3, right=3, min is left) vs `[3, 1, 3, 3]` (mid=1, right=3, min is mid). vs `[3, 3, 3, 1]` (mid=3, right=1, min is right)",
      "When `nums[mid] == nums[right]`, you can safely decrement `right` by 1 (`right--`). This might discard the minimum if `right` was the minimum, but it doesn't matter because `nums[mid]` has the same value. In the worst case, this degrades to O(n), but it's still better on average."
    ],
    "solutions": [
      {
        "language": "javascript",
        "code": "var findMin = function(nums) {\n    let left = 0;\n    let right = nums.length - 1;\n\n    while (left < right) {\n        let mid = Math.floor((left + right) / 2);\n\n        if (nums[mid] > nums[right]) {\n            // Minimum is in the right half\n            left = mid + 1;\n        } else if (nums[mid] < nums[right]) {\n            // Minimum is in the left half (including mid)\n            right = mid;\n        } else {\n            // nums[mid] === nums[right]\n            // We can't be sure which side the minimum is on.\n            // Safely discard the rightmost element.\n            right--;\n        }\n    }\n\n    // 'left' (or 'right') points to the minimum element\n    return nums[left];\n};",
        "explanation": "This solution modifies the binary search for the case with duplicates. We compare `nums[mid]` with `nums[right]`. If `nums[mid] > nums[right]`, the minimum must be to the right of `mid`. If `nums[mid] < nums[right]`, the minimum must be at `mid` or to its left. The tricky case is when `nums[mid] === nums[right]`. In this scenario, we don't know where the pivot (minimum) lies. However, we can safely discard `nums[right]` by decrementing `right`. We lose the O(log n) guarantee in the worst case (e.g., all elements are the same), but it remains efficient on average.",
        "timeComplexity": "O(log n) average, O(n) worst",
        "spaceComplexity": "O(1)"
      }
    ],
    "acceptanceRate": 41.8,
    "totalSubmissions": 6000,
    "correctSubmissions": 2508,
    "averageTime": 16
  },
  {
    "title": "Maximum Frequency Stack",
    "description": "Design a stack-like data structure to push elements onto the stack and pop the most frequent element from the stack.\n\nImplement the `FreqStack` class:\n- `FreqStack()` Constructs an empty frequency stack.\n- `void push(int val)` Pushes `val` onto the top of the stack.\n- `int pop()` Removes and returns the most frequent element. If there is a tie, return the element closest to the stack's top.",
    "difficulty": "hard",
    "topics": [
      "Stack",
      "Design",
      "Hash Table"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Microsoft",
      "Facebook"
    ],
    "constraints": [
      "0 <= val <= 10^9",
      "At most 2 * 10^4 calls will be made to push and pop.",
      "It is guaranteed that there will be at least one element in the stack before calling pop."
    ],
    "examples": [
      {
        "input": "[\"FreqStack\", \"push\", \"push\", \"push\", \"push\", \"push\", \"push\", \"pop\", \"pop\", \"pop\", \"pop\"] \n[[], [5], [7], [5], [7], [4], [5], [], [], [], []]",
        "output": "[null, null, null, null, null, null, null, 5, 7, 5, 4]",
        "explanation": "Stack: [5,7,5,7,4,5]. Pop 5 (freq 3, top). Stack: [5,7,5,7,4]. Pop 7 (freq 2, top). Stack: [5,7,5,4]. Pop 5 (freq 2, top). Stack: [5,7,4]. Pop 4 (freq 1, top)."
      }
    ],
    "testCases": [
      {
        "input": "[\"FreqStack\",\"push\",\"push\",\"push\",\"push\",\"push\",\"push\",\"pop\",\"pop\",\"pop\",\"pop\"]\n[[],[5],[7],[5],[7],[4],[5],[],[],[],[]]",
        "expectedOutput": "[null,null,null,null,null,null,null,5,7,5,4]",
        "isHidden": false
      }
    ],
    "hints": [
      "We need two pieces of information: the frequency of each element and the order (stack order) for tie-breaking.",
      "Use a hash map `freqMap` to store `element -> frequency`.",
      "Use another hash map `groupMap` to store `frequency -> stack_of_elements`. This second map groups elements by their frequency.",
      "Keep track of the `maxFreq` seen so far.",
      "`push(val)`: Increment `val`'s frequency in `freqMap`. Update `maxFreq`. Add `val` to the stack associated with its *new* frequency in `groupMap`.",
      "`pop()`: Get the stack associated with `maxFreq` from `groupMap`. Pop an element `val` from this stack. Decrement `val`'s frequency in `freqMap`. If the `maxFreq` stack in `groupMap` becomes empty *and* the popped `val` was the last element with `maxFreq`, decrement `maxFreq`."
    ],
    "solutions": [
      {
        "language": "javascript",
        "code": "var FreqStack = function() {\n    this.freqMap = new Map(); // val -> frequency\n    // Map: frequency -> stack of values with that frequency\n    this.groupMap = new Map(); \n    this.maxFreq = 0;\n};\n\n/** \n * @param {number} val\n * @return {void}\n */\nFreqStack.prototype.push = function(val) {\n    // 1. Update frequency of val\n    const newFreq = (this.freqMap.get(val) || 0) + 1;\n    this.freqMap.set(val, newFreq);\n    \n    // 2. Update maxFreq\n    this.maxFreq = Math.max(this.maxFreq, newFreq);\n    \n    // 3. Add val to the group stack for its new frequency\n    if (!this.groupMap.has(newFreq)) {\n        this.groupMap.set(newFreq, []);\n    }\n    this.groupMap.get(newFreq).push(val);\n};\n\n/**\n * @return {number}\n */\nFreqStack.prototype.pop = function() {\n    // 1. Get the stack for the highest frequency\n    const group = this.groupMap.get(this.maxFreq);\n    \n    // 2. Pop the most recently added element with this frequency\n    const val = group.pop();\n    \n    // 3. Decrement the frequency of the popped element\n    this.freqMap.set(val, this.freqMap.get(val) - 1);\n    \n    // 4. If the maxFreq group is now empty, decrement maxFreq\n    //    (while ensuring maxFreq doesn't go below 0)\n    if (group.length === 0 && this.maxFreq > 0) {\n         this.maxFreq--;\n    }\n    \n    return val;\n};",
        "explanation": "This design uses two hash maps and a variable to track the maximum frequency. `freqMap` stores the frequency of each value pushed. `groupMap` maps a frequency to a *stack* containing all values that currently have that frequency (pushed in order). `maxFreq` tracks the highest frequency currently present. `push(val)` increments the value's frequency, updates `maxFreq`, and pushes the value onto the stack corresponding to its *new* frequency in `groupMap`. `pop()` retrieves the stack for `maxFreq`, pops the top value (most recent for tie-breaking), decrements its frequency in `freqMap`, and if the stack for `maxFreq` becomes empty, it decrements `maxFreq`.",
        "timeComplexity": "O(1)",
        "spaceComplexity": "O(n)"
      }
    ],
    "acceptanceRate": 59.8,
    "totalSubmissions": 5000,
    "correctSubmissions": 2990,
    "averageTime": 35
  },
  {
    "title": "Next Permutation",
    "description": "Implement `next permutation`, which rearranges numbers into the lexicographically next greater permutation of numbers.\n\nIf such an arrangement is not possible, it must rearrange it as the lowest possible order (i.e., sorted in ascending order).\n\nThe replacement must be in-place and use only constant extra memory.\n\n**Example 1:**\nInput: nums = [1,2,3]\nOutput: [1,3,2]\n\n**Example 2:**\nInput: nums = [3,2,1]\nOutput: [1,2,3]\n\n**Example 3:**\nInput: nums = [1,1,5]\nOutput: [1,5,1]\n\n**Constraints:**\n- 1 <= nums.length <= 100\n- 0 <= nums[i] <= 100",
    "difficulty": "medium",
    "topics": [
      "Array",
      "Two Pointers"
    ],
    "companies": [
      "Google",
      "Microsoft",
      "Amazon",
      "Facebook"
    ],
    "constraints": [
      "1 <= nums.length <= 100",
      "0 <= nums[i] <= 100",
      "In-place, O(1) extra memory."
    ],
    "examples": [
      {
        "input": "nums = [1,2,3]",
        "output": "[1,3,2]",
        "explanation": "The next permutation after [1,2,3] is [1,3,2]."
      },
      {
        "input": "nums = [3,2,1]",
        "output": "[1,2,3]",
        "explanation": "[3,2,1] is the largest permutation, so wrap around to the smallest."
      },
      {
        "input": "nums = [1,1,5]",
        "output": "[1,5,1]",
        "explanation": "The next permutation after [1,1,5] is [1,5,1]."
      }
    ],
    "testCases": [
      {
        "input": "[1,2,3]",
        "expectedOutput": "[1,3,2]",
        "isHidden": false
      },
      {
        "input": "[3,2,1]",
        "expectedOutput": "[1,2,3]",
        "isHidden": false
      },
      {
        "input": "[1,3,2]",
        "expectedOutput": "[2,1,3]",
        "isHidden": true
      }
    ],
    "hints": [
      "Consider the properties of the next lexicographical permutation.",
      "Scan the array from *right to left*.",
      "Find the first index `i` such that `nums[i] < nums[i+1]`. This is the 'pivot' where the sequence starts decreasing.",
      "If no such `i` is found, the array is already in descending order (largest permutation). Reverse the entire array and return.",
      "If `i` is found, scan again from *right to left*, starting from the end, to find the first index `j` such that `nums[j] > nums[i]`.",
      "Swap `nums[i]` and `nums[j]`.",
      "Finally, *reverse* the subarray *after* index `i` (from `i+1` to the end)."
    ],
    "solutions": [
      {
        "language": "javascript",
        "code": "var nextPermutation = function(nums) {\n    const n = nums.length;\n\n    // Helper to swap elements\n    const swap = (i, j) => {[nums[i], nums[j]] = [nums[j], nums[i]];};\n    // Helper to reverse subarray\n    const reverse = (start) => {\n        let end = n - 1;\n        while (start < end) {\n            swap(start, end);\n            start++;\n            end--;\n        }\n    };\n\n    // 1. Find the first decreasing element from the right (the pivot)\n    let i = n - 2;\n    while (i >= 0 && nums[i] >= nums[i + 1]) {\n        i--;\n    }\n\n    // 2. If a pivot is found...\n    if (i >= 0) {\n        // 3. Find the rightmost element greater than the pivot\n        let j = n - 1;\n        while (nums[j] <= nums[i]) {\n            j--;\n        }\n        // 4. Swap the pivot and the found element\n        swap(i, j);\n    }\n\n    // 5. Reverse the subarray *after* the pivot index 'i'\n    // (If no pivot was found, i is -1, and we reverse the whole array)\n    reverse(i + 1);\n};",
        "explanation": "This solution implements the standard algorithm for finding the next permutation in-place. It first scans from right-to-left to find the 'pivot' index `i` (the first element `nums[i]` smaller than `nums[i+1]`). If no such pivot exists (`i < 0`), the array is sorted descending, so we reverse the whole array to get the smallest permutation. If a pivot `i` is found, we scan again from right-to-left to find the smallest element `nums[j]` that is *larger* than `nums[i]`. We swap `nums[i]` and `nums[j]`. Finally, we reverse the portion of the array *after* index `i` (from `i+1` to the end) to make it the smallest possible sequence following the new `nums[i]`.",
        "timeComplexity": "O(n)",
        "spaceComplexity": "O(1)"
      }
    ],
    "acceptanceRate": 36.5,
    "totalSubmissions": 16000,
    "correctSubmissions": 5840,
    "averageTime": 15
  },
  {
    "title": "Partition Labels",
    "description": "You are given a string `s`. We want to partition the string into as many parts as possible so that each letter appears in at most one part.\n\nReturn a list of integers representing the size of these parts.\n\n**Example 1:**\nInput: s = \"ababcbacadefegdehijhklij\"\nOutput: [9,7,8]\nExplanation: The partition is \"ababcbaca\", \"defegde\", \"hijhklij\".\n\n**Example 2:**\nInput: s = \"eccbbbbdec\"\nOutput: [10]\n\n**Constraints:**\n- 1 <= s.length <= 500\n- `s` consists of lowercase English letters.",
    "difficulty": "medium",
    "topics": [
      "String",
      "Greedy",
      "Two Pointers",
      "Hash Table"
    ],
    "companies": [
      "Amazon",
      "Facebook",
      "Google",
      "Microsoft"
    ],
    "constraints": [
      "1 <= s.length <= 500",
      "s consists of lowercase English letters."
    ],
    "examples": [
      {
        "input": "s = \"ababcbacadefegdehijhklij\"",
        "output": "[9,7,8]",
        "explanation": "Partition: \"ababcbaca\" | \"defegde\" | \"hijhklij\"."
      },
      {
        "input": "s = \"eccbbbbdec\"",
        "output": "[10]",
        "explanation": "Cannot partition further, as 'e' and 'c' appear throughout."
      }
    ],
    "testCases": [
      {
        "input": "\"ababcbacadefegdehijhklij\"",
        "expectedOutput": "[9,7,8]",
        "isHidden": false
      },
      {
        "input": "\"eccbbbbdec\"",
        "expectedOutput": "[10]",
        "isHidden": false
      }
    ],
    "hints": [
      "This is a Greedy problem.",
      "We need to know the *last* occurrence of each character in the string.",
      "First pass: Create a map or array storing the last index for each character.",
      "Second pass: Iterate through the string with a pointer `i`. Maintain two other variables: `partitionEnd` (the farthest reach of any character seen in the current partition) and `partitionStart` (the start index of the current partition).",
      "For each character `s[i]`, update `partitionEnd = max(partitionEnd, lastIndex[s[i]])`.",
      "If `i == partitionEnd`, it means all characters encountered so far *only* appear within the range `[partitionStart, i]`. This is the end of a valid partition.",
      "Add the size (`i - partitionStart + 1`) to the result, and update `partitionStart = i + 1`."
    ],
    "solutions": [
      {
        "language": "javascript",
        "code": "var partitionLabels = function(s) {\n    // 1. Find the last occurrence index for each character\n    const lastIndex = new Map();\n    for (let i = 0; i < s.length; i++) {\n        lastIndex.set(s[i], i);\n    }\n\n    const result = [];\n    let partitionStart = 0;\n    let partitionEnd = 0;\n\n    // 2. Iterate through the string to find partition boundaries\n    for (let i = 0; i < s.length; i++) {\n        // Update the farthest reach for the current partition\n        partitionEnd = Math.max(partitionEnd, lastIndex.get(s[i]));\n\n        // If the current index 'i' is the end of the partition...\n        if (i === partitionEnd) {\n            // ...record the size and start the next partition\n            result.push(i - partitionStart + 1);\n            partitionStart = i + 1;\n        }\n    }\n\n    return result;\n};",
        "explanation": "This solution uses a Greedy approach. First, it makes a pass through the string to record the last index of each character in the `lastIndex` map. Then, it makes a second pass. It uses `partitionStart` to mark the beginning of the current partition and `partitionEnd` to track the farthest index any character *within* the current partition reaches. As it iterates with `i`, it updates `partitionEnd` using the `lastIndex` map. When the current index `i` *equals* `partitionEnd`, it means all characters encountered since `partitionStart` do not appear beyond `i`. Thus, we've found the end of a valid partition. We add its size (`i - partitionStart + 1`) to the `result` and update `partitionStart` for the next segment.",
        "timeComplexity": "O(n)",
        "spaceComplexity": "O(1)"
      }
    ],
    "acceptanceRate": 77.5,
    "totalSubmissions": 7000,
    "correctSubmissions": 5425,
    "averageTime": 17
  },
  {
    "title": "Gas Station",
    "description": "There are `n` gas stations along a circular route, where the amount of gas at the `i`-th station is `gas[i]`.\n\nYou have a car with an unlimited gas tank and it costs `cost[i]` of gas to travel from the `i`-th station to its next (`i + 1`)-th station. You begin the journey with an empty tank at one of the gas stations.\n\nGiven two integer arrays `gas` and `cost`, return the starting gas station's index if you can travel around the circuit once in the clockwise direction, otherwise return -1. If a solution exists, it is guaranteed to be unique.\n\n**Example 1:**\nInput: gas = [1,2,3,4,5], cost = [3,4,5,1,2]\nOutput: 3\nExplanation: Start at station 3 (index 3) and fill up with 4 gas. Tank = 4. Travel to station 4. Cost = 1. Tank = 3. Fill up with 5 gas. Tank = 8. Travel to station 0. Cost = 2. Tank = 6. ...\n\n**Example 2:**\nInput: gas = [2,3,4], cost = [3,4,3]\nOutput: -1\nExplanation: You can't start at any station.\n\n**Constraints:**\n- gas.length == n\n- cost.length == n\n- 1 <= n <= 10^5\n- 0 <= gas[i], cost[i] <= 10^4",
    "difficulty": "medium",
    "topics": [
      "Array",
      "Greedy"
    ],
    "companies": [
      "Amazon",
      "Microsoft",
      "Google",
      "Bloomberg"
    ],
    "constraints": [
      "gas.length == n",
      "cost.length == n",
      "1 <= n <= 10^5",
      "0 <= gas[i], cost[i] <= 10^4"
    ],
    "examples": [
      {
        "input": "gas = [1,2,3,4,5], cost = [3,4,5,1,2]",
        "output": "3",
        "explanation": "Starting at index 3 allows completion of the circuit."
      },
      {
        "input": "gas = [2,3,4], cost = [3,4,3]",
        "output": "-1",
        "explanation": "Not possible to complete the circuit from any start point."
      }
    ],
    "testCases": [
      {
        "input": "[1,2,3,4,5]\n[3,4,5,1,2]",
        "expectedOutput": "3",
        "isHidden": false
      },
      {
        "input": "[2,3,4]\n[3,4,3]",
        "expectedOutput": "-1",
        "isHidden": false
      },
      {
        "input": "[5,1,2,3,4]\n[4,4,1,5,1]",
        "expectedOutput": "4",
        "isHidden": true
      }
    ],
    "hints": [
      "First, check if a solution is even possible. If the `sum(gas)` is less than `sum(cost)`, it's impossible. Return -1.",
      "If a solution *is* possible, it is guaranteed to be unique.",
      "Consider a single pass (Greedy approach).",
      "Maintain `currentTank` and `totalTank` (or `totalDiff`). Also track `startStation`.",
      "Iterate through the stations `i` from 0 to n-1.",
      "Calculate the difference `diff = gas[i] - cost[i]`.",
      "Add `diff` to both `totalTank` and `currentTank`.",
      "If `currentTank` ever becomes negative, it means we cannot reach the *next* station starting from the current `startStation`. Reset `currentTank = 0` and update `startStation = i + 1`.",
      "After the loop, if `totalTank >= 0`, return `startStation`. Otherwise return -1 (though the first check handles this)."
    ],
    "solutions": [
      {
        "language": "javascript",
        "code": "var canCompleteCircuit = function(gas, cost) {\n    let totalGas = 0;\n    let totalCost = 0;\n    let currentTank = 0;\n    let startStation = 0;\n\n    for (let i = 0; i < gas.length; i++) {\n        totalGas += gas[i];\n        totalCost += cost[i];\n\n        // Calculate gas needed for this segment\n        currentTank += gas[i] - cost[i];\n\n        // If we can't reach the next station from the current 'startStation'\n        if (currentTank < 0) {\n            // Reset the tank and try starting from the *next* station\n            currentTank = 0;\n            startStation = i + 1;\n        }\n    }\n\n    // If total gas is less than total cost, it's impossible\n    if (totalGas < totalCost) {\n        return -1;\n    } else {\n        // Otherwise, the last 'startStation' we recorded is the answer\n        // (guaranteed to be unique if a solution exists)\n        return startStation;\n    }\n};",
        "explanation": "This solution uses a single-pass Greedy approach. It tracks `totalGas`, `totalCost`, the `currentTank` level for the current attempt, and the potential `startStation`. It iterates through all stations. In each iteration, it updates the totals and calculates the net gain/loss for the current segment, adding it to `currentTank`. If `currentTank` drops below zero, it means the current `startStation` is invalid, so we reset `currentTank` to zero and set the *next* station (`i + 1`) as the new potential `startStation`. After the loop, we check if `totalGas < totalCost`. If so, no solution is possible. Otherwise, the `startStation` recorded when the loop finished is the unique valid starting point.",
        "timeComplexity": "O(n)",
        "spaceComplexity": "O(1)"
      }
    ],
    "acceptanceRate": 41.9,
    "totalSubmissions": 10000,
    "correctSubmissions": 4190,
    "averageTime": 17
  },
  {
    "title": "Reverse Integer",
    "description": "Given a signed 32-bit integer `x`, return `x` with its digits reversed. If reversing `x` causes the value to go outside the signed 32-bit integer range `[-2^31, 2^31 - 1]`, then return 0.\n\nAssume the environment does not allow you to store 64-bit integers.\n\n**Example 1:**\nInput: x = 123\nOutput: 321\n\n**Example 2:**\nInput: x = -123\nOutput: -321\n\n**Example 3:**\nInput: x = 120\nOutput: 21\n\n**Constraints:**\n- -2^31 <= x <= 2^31 - 1",
    "difficulty": "medium",
    "topics": [
      "Math"
    ],
    "companies": [
      "Amazon",
      "Apple",
      "Microsoft",
      "Google"
    ],
    "constraints": [
      "-2^31 <= x <= 2^31 - 1"
    ],
    "examples": [
      {
        "input": "x = 123",
        "output": "321"
      },
      {
        "input": "x = -123",
        "output": "-321"
      },
      {
        "input": "x = 120",
        "output": "21",
        "explanation": "Trailing zero is dropped."
      },
      {
        "input": "x = 1534236469",
        "output": "0",
        "explanation": "Reversed value overflows 32-bit integer."
      }
    ],
    "testCases": [
      {
        "input": "123",
        "expectedOutput": "321",
        "isHidden": false
      },
      {
        "input": "-123",
        "expectedOutput": "-321",
        "isHidden": false
      },
      {
        "input": "120",
        "expectedOutput": "21",
        "isHidden": false
      },
      {
        "input": "1534236469",
        "expectedOutput": "0",
        "isHidden": true
      }
    ],
    "hints": [
      "You need to build the reversed number digit by digit.",
      "Use the modulo operator (`% 10`) to get the last digit.",
      "Use integer division (`/ 10`) to remove the last digit.",
      "Build the `reversed` number: `reversed = reversed * 10 + digit`.",
      "The main challenge is handling potential 32-bit integer overflow *before* it happens.",
      "Before `reversed = reversed * 10 + digit`, check if `reversed > MAX_INT / 10` or if `reversed == MAX_INT / 10` and `digit > 7`. Similar check for `MIN_INT`."
    ],
    "solutions": [
      {
        "language": "javascript",
        "code": "var reverse = function(x) {\n    const MIN_INT = -2147483648; // -2^31\n    const MAX_INT = 2147483647;  // 2^31 - 1\n    \n    let reversed = 0;\n    const sign = x < 0 ? -1 : 1;\n    x = Math.abs(x); // Work with positive numbers\n\n    while (x !== 0) {\n        const digit = x % 10;\n        x = Math.floor(x / 10);\n\n        // Check for potential overflow BEFORE the multiplication/addition\n        // Check positive overflow\n        if (reversed > Math.floor(MAX_INT / 10) || \n           (reversed === Math.floor(MAX_INT / 10) && digit > 7)) {\n            return 0;\n        }\n        // Check negative overflow (using positive 'reversed' and MIN_INT's magnitude)\n        // MIN_INT ends in 8\n        if (reversed > Math.floor(Math.abs(MIN_INT) / 10) || \n           (reversed === Math.floor(Math.abs(MIN_INT) / 10) && digit > 8)) {\n             // This check is slightly different if sign is -1 but covers both\n             // if we check against positive reversed value.\n             // Simpler: Check after applying sign in the MAX check is sufficient\n             // for typical JS number behavior, but being explicit is better.\n             // Let's refine the check slightly:\n             // For negative final result:\n             if (sign === -1 && (reversed > Math.floor(Math.abs(MIN_INT) / 10) || \n                 (reversed === Math.floor(Math.abs(MIN_INT) / 10) && digit > 8))) {\n                 return 0;\n             }\n              // For positive final result:\n              if (sign === 1 && (reversed > Math.floor(MAX_INT / 10) || \n                 (reversed === Math.floor(MAX_INT / 10) && digit > 7))) {\n                 return 0;\n              }\n        }\n        \n\n        reversed = reversed * 10 + digit;\n    }\n\n    return reversed * sign;\n};",
        "explanation": "This solution reverses the integer mathematically. It first determines the `sign` and makes `x` positive. It then iterates while `x` is not zero. In each iteration, it extracts the last `digit` using modulo 10 and removes it using integer division. Crucially, *before* updating `reversed = reversed * 10 + digit`, it checks for potential 32-bit integer overflow. It compares `reversed` against `MAX_INT / 10` and `MIN_INT / 10` (considering the sign) to see if adding the next digit would exceed the limits. If overflow is detected, it returns 0. Otherwise, it updates `reversed`. Finally, it returns `reversed` multiplied by the original `sign`.",
        "timeComplexity": "O(log10 x)",
        "spaceComplexity": "O(1)"
      }
    ],
    "acceptanceRate": 26.9,
    "totalSubmissions": 25000,
    "correctSubmissions": 6725,
    "averageTime": 14
  },
  {
    "title": "Palindrome Linked List",
    "description": "Given the `head` of a singly linked list, return `true` if it is a palindrome.\n\n**Example 1:**\nInput: head = [1,2,2,1]\nOutput: true\n\n**Example 2:**\nInput: head = [1,2]\nOutput: false\n\n**Constraints:**\n- The number of nodes in the list is in the range [1, 10^5].\n- 0 <= Node.val <= 9\n\n**Follow up:** Could you do it in O(n) time and O(1) space?",
    "difficulty": "easy",
    "topics": [
      "Linked List",
      "Two Pointers"
    ],
    "companies": [
      "Amazon",
      "Facebook",
      "Microsoft"
    ],
    "constraints": [
      "The number of nodes in the list is in the range [1, 10^5].",
      "0 <= Node.val <= 9"
    ],
    "examples": [
      {
        "input": "head = [1,2,2,1]",
        "output": "true",
        "explanation": "Reads the same forwards and backwards."
      },
      {
        "input": "head = [1,2]",
        "output": "false",
        "explanation": "Reads 2,1 backwards."
      }
    ],
    "testCases": [
      {
        "input": "[1,2,2,1]",
        "expectedOutput": "true",
        "isHidden": false
      },
      {
        "input": "[1,2]",
        "expectedOutput": "false",
        "isHidden": false
      },
      {
        "input": "[1,0,1]",
        "expectedOutput": "true",
        "isHidden": true
      }
    ],
    "hints": [
      "An O(n) space solution is to copy the list values into an array and check if the array is a palindrome.",
      "To achieve O(1) space: Find the middle of the linked list using slow/fast pointers.",
      "Reverse the second half of the linked list.",
      "Compare the first half with the reversed second half.",
      "Optionally, restore the list by reversing the second half back."
    ],
    "solutions": [
      {
        "language": "javascript",
        "code": "/**\n * Definition for singly-linked list.\n * function ListNode(val, next) {\n * this.val = (val===undefined ? 0 : val)\n * this.next = (next===undefined ? null : next)\n * }\n */\nvar isPalindrome = function(head) {\n    if (!head || !head.next) return true;\n\n    // 1. Find the middle (slow will be middle or just before)\n    let slow = head, fast = head;\n    while (fast && fast.next) {\n        slow = slow.next;\n        fast = fast.next.next;\n    }\n\n    // 2. Reverse the second half\n    let prev = null;\n    let curr = slow;\n    while (curr) {\n        let nextNode = curr.next;\n        curr.next = prev;\n        prev = curr;\n        curr = nextNode;\n    }\n    // 'prev' is now the head of the reversed second half\n\n    // 3. Compare first half (head) with reversed second half (prev)\n    let firstHalf = head;\n    let secondHalf = prev;\n    while (secondHalf) { // Only need to compare up to the reversed half's length\n        if (firstHalf.val !== secondHalf.val) {\n            return false;\n        }\n        firstHalf = firstHalf.next;\n        secondHalf = secondHalf.next;\n    }\n\n    return true;\n};",
        "explanation": "This O(1) space solution first finds the middle of the linked list using slow and fast pointers. Then, it reverses the second half of the list starting from the middle node (`slow`). Finally, it compares the node values of the original first half (starting from `head`) with the reversed second half (starting from `prev`). If all values match, it's a palindrome.",
        "timeComplexity": "O(n)",
        "spaceComplexity": "O(1)"
      }
    ],
    "acceptanceRate": 45.2,
    "totalSubmissions": 10000,
    "correctSubmissions": 4520,
    "averageTime": 15
  },
  {
    "title": "Meeting Rooms",
    "description": "Given an array of meeting time intervals `intervals` where `intervals[i] = [starti, endi]`, determine if a person could attend all meetings.\n\n**Example 1:**\nInput: intervals = [[0,30],[5,10],[15,20]]\nOutput: false\n\n**Example 2:**\nInput: intervals = [[7,10],[2,4]]\nOutput: true\n\n**Constraints:**\n- 0 <= intervals.length <= 10^4\n- intervals[i].length == 2\n- 0 <= starti < endi <= 10^6",
    "difficulty": "easy",
    "topics": [
      "Array",
      "Sorting",
      "Greedy"
    ],
    "companies": [
      "Facebook",
      "Amazon",
      "Microsoft",
      "Google"
    ],
    "constraints": [
      "0 <= intervals.length <= 10^4",
      "intervals[i].length == 2",
      "0 <= starti < endi <= 10^6"
    ],
    "examples": [
      {
        "input": "intervals = [[0,30],[5,10],[15,20]]",
        "output": "false",
        "explanation": "[0,30] overlaps with [5,10] and [15,20]."
      },
      {
        "input": "intervals = [[7,10],[2,4]]",
        "output": "true",
        "explanation": "No overlaps."
      }
    ],
    "testCases": [
      {
        "input": "[[0,30],[5,10],[15,20]]",
        "expectedOutput": "false",
        "isHidden": false
      },
      {
        "input": "[[7,10],[2,4]]",
        "expectedOutput": "true",
        "isHidden": false
      },
      {
        "input": "[[13,15],[1,13]]",
        "expectedOutput": "true",
        "isHidden": true
      }
    ],
    "hints": [
      "If you sort the intervals by start time, how can you easily check for overlaps?",
      "Sort the `intervals` array based on the start time.",
      "Iterate through the sorted intervals starting from the second one (`i=1`).",
      "Compare the start time of the current interval (`intervals[i][0]`) with the end time of the previous interval (`intervals[i-1][1]`).",
      "If `intervals[i][0] < intervals[i-1][1]`, you've found an overlap. Return `false`.",
      "If the loop finishes without finding overlaps, return `true`."
    ],
    "solutions": [
      {
        "language": "javascript",
        "code": "var canAttendMeetings = function(intervals) {\n    if (intervals.length <= 1) {\n        return true;\n    }\n\n    // 1. Sort intervals by start time\n    intervals.sort((a, b) => a[0] - b[0]);\n\n    // 2. Check for overlaps\n    for (let i = 1; i < intervals.length; i++) {\n        const currentStart = intervals[i][0];\n        const previousEnd = intervals[i - 1][1];\n\n        // If the current meeting starts before the previous one ends, overlap!\n        if (currentStart < previousEnd) {\n            return false;\n        }\n    }\n\n    // No overlaps found\n    return true;\n};",
        "explanation": "This solution first sorts the intervals based on their start times. This allows us to easily check for overlaps by comparing adjacent intervals. We iterate through the sorted intervals, starting from the second one. In each iteration, we compare the start time of the current interval (`intervals[i][0]`) with the end time of the *previous* interval (`intervals[i-1][1]`). If the current start time is less than the previous end time, it means there's an overlap, and we can immediately return `false`. If the loop completes without finding any such overlaps, it means all meetings can be attended, so we return `true`.",
        "timeComplexity": "O(n log n)",
        "spaceComplexity": "O(1)"
      }
    ],
    "acceptanceRate": 57.3,
    "totalSubmissions": 8000,
    "correctSubmissions": 4584,
    "averageTime": 14
  },
  {
    "title": "Meeting Rooms II",
    "description": "Given an array of meeting time intervals `intervals` where `intervals[i] = [starti, endi]`, return the minimum number of conference rooms required.\n\n**Example 1:**\nInput: intervals = [[0,30],[5,10],[15,20]]\nOutput: 2\nExplanation: [5,10] and [15,20] can use one room. [0,30] needs another.\n\n**Example 2:**\nInput: intervals = [[7,10],[2,4]]\nOutput: 1\n\n**Constraints:**\n- 1 <= intervals.length <= 10^4\n- 0 <= starti < endi <= 10^6",
    "difficulty": "medium",
    "topics": [
      "Array",
      "Sorting",
      "Greedy",
      "Heap (Priority Queue)"
    ],
    "companies": [
      "Facebook",
      "Amazon",
      "Microsoft",
      "Google"
    ],
    "constraints": [
      "1 <= intervals.length <= 10^4",
      "0 <= starti < endi <= 10^6"
    ],
    "examples": [
      {
        "input": "intervals = [[0,30],[5,10],[15,20]]",
        "output": "2",
        "explanation": "At time 5, [0,30] and [5,10] overlap. At time 15, [0,30] and [15,20] overlap. Max overlap is 2."
      },
      {
        "input": "intervals = [[7,10],[2,4]]",
        "output": "1",
        "explanation": "No overlaps."
      }
    ],
    "testCases": [
      {
        "input": "[[0,30],[5,10],[15,20]]",
        "expectedOutput": "2",
        "isHidden": false
      },
      {
        "input": "[[7,10],[2,4]]",
        "expectedOutput": "1",
        "isHidden": false
      },
      {
        "input": "[[1,5],[8,9],[8,9]]",
        "expectedOutput": "2",
        "isHidden": true
      }
    ],
    "hints": [
      "Think about tracking when rooms become free.",
      "Sort the intervals by **start** time.",
      "Use a Min-Heap (Priority Queue) to store the **end** times of the meetings currently in progress.",
      "Iterate through the sorted intervals. For each interval:\n  - Check the minimum end time in the heap (the earliest time a room becomes free).\n  - If the current interval's start time is >= the minimum end time, it means a room is free. Remove the minimum end time from the heap (reuse the room).\n  - Add the current interval's **end** time to the heap (occupy a room).\n- The maximum size the heap reaches during this process is the minimum number of rooms required."
    ],
    "solutions": [
      {
        "language": "javascript",
        "code": "// Note: Assumes a MinPriorityQueue class is available.\n\nvar minMeetingRooms = function(intervals) {\n    if (!intervals || intervals.length === 0) {\n        return 0;\n    }\n\n    // 1. Sort intervals by start time\n    intervals.sort((a, b) => a[0] - b[0]);\n\n    // 2. Use a Min-Heap to track meeting end times\n    // The heap stores the time when a room becomes free.\n    const minHeap = new MinPriorityQueue();\n    \n    // Add the end time of the first meeting\n    minHeap.enqueue(intervals[0][1]);\n    let roomCount = 1;\n\n    // 3. Iterate through the remaining intervals\n    for (let i = 1; i < intervals.length; i++) {\n        const [currentStart, currentEnd] = intervals[i];\n        \n        // Get the earliest end time from the heap\n        const earliestEnd = minHeap.front().element;\n\n        if (currentStart >= earliestEnd) {\n            // A room has become free, reuse it.\n            // Remove the old end time.\n            minHeap.dequeue();\n        } else {\n            // No room is free yet, need a new room.\n            roomCount++; \n            // NOTE: Even if we need a new room, we still push the end time. The heap size represents allocated rooms.\n        }\n\n        // Add the current meeting's end time to the heap\n        minHeap.enqueue(currentEnd);\n        \n        // Alternative logic: The number of rooms is simply the heap size at any point.\n        // roomCount = Math.max(roomCount, minHeap.size());\n    }\n\n    // The final size of the heap IS the number of rooms needed.\n    return minHeap.size(); // Or return the max size reached during iteration\n};",
        "explanation": "This solution sorts the intervals by start time. It then uses a Min-Heap to keep track of the end times of meetings currently occupying rooms. The heap's root always represents the earliest time a room will become free. We iterate through the sorted intervals. For each `current` interval, we compare its `start` time with the `earliestEnd` time from the heap. If `currentStart >= earliestEnd`, it means the room that finishes earliest is now free, so we can reuse it; we `dequeue` the `earliestEnd` from the heap. Regardless of whether we reused a room or not, we `enqueue` the `current` interval's `end` time, signifying that a room is occupied until that time. The minimum number of rooms needed is the maximum size the heap reaches during this process, which is simply the final size of the heap after processing all intervals.",
        "timeComplexity": "O(n log n)",
        "spaceComplexity": "O(n)"
      }
    ],
    "acceptanceRate": 48.1,
    "totalSubmissions": 9000,
    "correctSubmissions": 4329,
    "averageTime": 25
  },
  {
    "title": "Insert Interval",
    "description": "You are given an array of non-overlapping intervals `intervals` where `intervals[i] = [starti, endi]` represent the start and the end of the `i`-th interval and `intervals` is sorted in ascending order by `starti`. You are also given an interval `newInterval = [start, end]` that represents the start and end of another interval.\n\nInsert `newInterval` into `intervals` such that `intervals` is still sorted in ascending order by `starti` and `intervals` still does not have any overlapping intervals (merge overlapping intervals if necessary).\n\nReturn `intervals` after the insertion.\n\n**Example 1:**\nInput: intervals = [[1,3],[6,9]], newInterval = [2,5]\nOutput: [[1,5],[6,9]]\n\n**Example 2:**\nInput: intervals = [[1,2],[3,5],[6,7],[8,10],[12,16]], newInterval = [4,8]\nOutput: [[1,2],[3,10],[12,16]]\nExplanation: [4,8] overlaps with [3,5],[6,7],[8,10].\n\n**Constraints:**\n- 0 <= intervals.length <= 10^4\n- intervals[i].length == 2\n- 0 <= starti <= endi <= 10^5\n- `intervals` is sorted by `starti` in ascending order.\n- newInterval.length == 2\n- 0 <= start <= end <= 10^5",
    "difficulty": "medium",
    "topics": [
      "Array",
      "Sorting"
    ],
    "companies": [
      "LinkedIn",
      "Google",
      "Facebook",
      "Amazon"
    ],
    "constraints": [
      "0 <= intervals.length <= 10^4",
      "intervals is sorted by starti.",
      "newInterval.length == 2",
      "0 <= start <= end <= 10^5"
    ],
    "examples": [
      {
        "input": "intervals = [[1,3],[6,9]], newInterval = [2,5]",
        "output": "[[1,5],[6,9]]",
        "explanation": "[2,5] overlaps with [1,3], merging them into [1,5]."
      },
      {
        "input": "intervals = [[1,2],[3,5],[6,7],[8,10],[12,16]], newInterval = [4,8]",
        "output": "[[1,2],[3,10],[12,16]]",
        "explanation": "[4,8] overlaps and merges with [3,5], [6,7], and [8,10]."
      }
    ],
    "testCases": [
      {
        "input": "[[1,3],[6,9]]\n[2,5]",
        "expectedOutput": "[[1,5],[6,9]]",
        "isHidden": false
      },
      {
        "input": "[[1,2],[3,5],[6,7],[8,10],[12,16]]\n[4,8]",
        "expectedOutput": "[[1,2],[3,10],[12,16]]",
        "isHidden": false
      },
      {
        "input": "[]\n[5,7]",
        "expectedOutput": "[[5,7]]",
        "isHidden": true
      },
      {
        "input": "[[1,5]]\n[0,0]",
        "expectedOutput": "[[0,0],[1,5]]",
        "isHidden": true
      }
    ],
    "hints": [
      "Iterate through the `intervals` list and compare each `interval` with `newInterval`.",
      "You'll have three phases:\n  1. Intervals completely *before* `newInterval` (no overlap). Add them directly to the result.",
      "2. Intervals that *overlap* with `newInterval`. Don't add them yet, but *merge* `newInterval` with them by updating `newInterval`'s start and end (`newStart = min(newStart, currentStart)`, `newEnd = max(newEnd, currentEnd)`).",
      "3. Intervals completely *after* `newInterval` (no overlap).",
      "After finding all overlapping intervals and updating `newInterval`, add the merged `newInterval` to the result.",
      "Finally, add all the remaining intervals (phase 3) to the result."
    ],
    "solutions": [
      {
        "language": "javascript",
        "code": "var insert = function(intervals, newInterval) {\n    const result = [];\n    let i = 0;\n    const n = intervals.length;\n\n    // 1. Add all intervals ending before newInterval starts\n    while (i < n && intervals[i][1] < newInterval[0]) {\n        result.push(intervals[i]);\n        i++;\n    }\n\n    // 2. Merge overlapping intervals\n    // Start with newInterval and merge with subsequent overlapping ones\n    let mergedInterval = [...newInterval]; // Use a copy\n    while (i < n && intervals[i][0] <= mergedInterval[1]) {\n        mergedInterval[0] = Math.min(mergedInterval[0], intervals[i][0]);\n        mergedInterval[1] = Math.max(mergedInterval[1], intervals[i][1]);\n        i++;\n    }\n    // Add the final merged interval\n    result.push(mergedInterval);\n\n    // 3. Add remaining intervals\n    while (i < n) {\n        result.push(intervals[i]);\n        i++;\n    }\n\n    return result;\n};",
        "explanation": "This solution iterates through the sorted `intervals` in three stages. First, it adds all intervals that end *before* `newInterval` starts directly to the `result`. Second, it enters a loop for intervals that *overlap* with `newInterval`. It initializes a `mergedInterval` with `newInterval`. As long as the current interval `intervals[i]` starts before or at the `mergedInterval`'s end, it merges them by updating `mergedInterval`'s start to the minimum start and end to the maximum end. After this loop finishes, the fully merged interval is added to `result`. Third, any remaining intervals in `intervals` (which start after the merged interval ends) are added to `result`.",
        "timeComplexity": "O(n)",
        "spaceComplexity": "O(n)"
      }
    ],
    "acceptanceRate": 38.6,
    "totalSubmissions": 10000,
    "correctSubmissions": 3860,
    "averageTime": 17
  },
  {
    "title": "Kth Largest Element in a Stream",
    "description": "Design a class to find the `k`-th largest element in a stream of numbers. Note that it is the `k`-th largest element in the sorted order, not the `k`-th distinct element.\n\nImplement `KthLargest` class:\n- `KthLargest(int k, int[] nums)` Initializes the object with integer `k` and stream `nums`.\n- `int add(int val)` Appends `val` to the stream and returns the `k`-th largest element.\n\n**Example 1:**\nInput:\n[\"KthLargest\", \"add\", \"add\", \"add\", \"add\", \"add\"]\n[[3, [4, 5, 8, 2]], [3], [5], [10], [9], [4]]\nOutput:\n[null, 4, 5, 5, 8, 8]\n\n**Constraints:**\n- 1 <= k <= 10^4\n- 0 <= nums.length <= 10^4\n- -10^4 <= nums[i] <= 10^4\n- -10^4 <= val <= 10^4\n- At most 10^4 calls will be made to `add`.\n- It is guaranteed that there will be at least `k` elements in the stream when you search for the `k`-th element.",
    "difficulty": "easy",
    "topics": [
      "Heap (Priority Queue)",
      "Design",
      "Data Stream"
    ],
    "companies": [
      "Amazon",
      "Facebook",
      "Google"
    ],
    "constraints": [
      "1 <= k <= 10^4",
      "0 <= nums.length <= 10^4",
      "At most 10^4 calls will be made to add.",
      "Guaranteed k elements when add is called."
    ],
    "examples": [
      {
        "input": "k=3, nums=[4,5,8,2]",
        "output": "add(3)->4, add(5)->5, add(10)->5, add(9)->8, add(4)->8",
        "explanation": "Stream: [4,5,8,2] -> [4,5,8,2,3](k-th=4) -> [4,5,8,2,3,5](k-th=5) -> [4,5,8,2,3,5,10](k-th=5) -> [4,5,8,2,3,5,10,9](k-th=8) -> [4,5,8,2,3,5,10,9,4](k-th=8)"
      }
    ],
    "testCases": [
      {
        "input": "[\"KthLargest\",\"add\",\"add\",\"add\",\"add\",\"add\"]\n[[3,[4,5,8,2]],[3],[5],[10],[9],[4]]",
        "expectedOutput": "[null,4,5,5,8,8]",
        "isHidden": false
      }
    ],
    "hints": [
      "How can you efficiently maintain the `k` largest elements seen so far?",
      "Use a Min-Heap (Priority Queue) of size `k`.",
      "In the constructor, add all initial `nums` to the heap. If the heap size exceeds `k`, remove the minimum element.",
      "In the `add(val)` function: Add `val` to the heap. If the heap size now exceeds `k`, remove the minimum element.",
      "The `k`-th largest element will always be the element at the *top* of the Min-Heap."
    ],
    "solutions": [
      {
        "language": "javascript",
        "code": "// Note: Assumes a MinPriorityQueue class is available.\n\n/**\n * @param {number} k\n * @param {number[]} nums\n */\nvar KthLargest = function(k, nums) {\n    this.k = k;\n    this.minHeap = new MinPriorityQueue();\n    \n    // Initialize heap with initial numbers\n    for (const num of nums) {\n        this.add(num); // Use the add method to maintain heap size\n    }\n};\n\n/** \n * @param {number} val\n * @return {number}\n */\nKthLargest.prototype.add = function(val) {\n    // Add the new value\n    this.minHeap.enqueue(val);\n    \n    // If heap size exceeds k, remove the smallest\n    if (this.minHeap.size() > this.k) {\n        this.minHeap.dequeue();\n    }\n    \n    // The root of the min-heap is the k-th largest element\n    // (only if heap size is exactly k)\n    if (this.minHeap.size() === this.k) {\n        return this.minHeap.front().element;\n    } else {\n        // Should not happen based on constraints, but handles initial phase\n        return null; // Or throw error, or handle as needed\n    }\n};",
        "explanation": "This class uses a Min-Heap (`this.minHeap`) to efficiently store the `k` largest elements encountered so far. The constructor initializes `k` and populates the heap with the initial `nums`, using the `add` method to ensure the heap size constraint. The `add(val)` method enqueues the new `val` onto the heap. It then checks if the heap size has exceeded `k`. If it has, it `dequeue`s the smallest element (the root of the Min-Heap). This maintains the property that the heap always contains the `k` largest elements. The function then returns the current root of the heap (`minHeap.front().element`), which is the `k`-th largest element overall.",
        "timeComplexity": "O(N log k + M log k)",
        "spaceComplexity": "O(k)"
      }
    ],
    "acceptanceRate": 53.1,
    "totalSubmissions": 7000,
    "correctSubmissions": 3717,
    "averageTime": 18
  },
  {
    "title": "Longest Consecutive Sequence",
    "description": "Given an unsorted array of integers `nums`, return the length of the longest consecutive elements sequence.\n\nYou must write an algorithm that runs in O(n) time.\n\n**Example 1:**\nInput: nums = [100,4,200,1,3,2]\nOutput: 4\nExplanation: The longest consecutive sequence is [1, 2, 3, 4]. Length is 4.\n\n**Example 2:**\nInput: nums = [0,3,7,2,5,8,4,6,0,1]\nOutput: 9\n\n**Constraints:**\n- 0 <= nums.length <= 10^5\n- -10^9 <= nums[i] <= 10^9",
    "difficulty": "medium",
    "topics": [
      "Array",
      "Hash Table",
      "Union Find"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Facebook",
      "Microsoft"
    ],
    "constraints": [
      "0 <= nums.length <= 10^5",
      "-10^9 <= nums[i] <= 10^9",
      "Must run in O(n) time."
    ],
    "examples": [
      {
        "input": "nums = [100,4,200,1,3,2]",
        "output": "4",
        "explanation": "The sequence [1, 2, 3, 4] is the longest."
      },
      {
        "input": "nums = [0,3,7,2,5,8,4,6,0,1]",
        "output": "9",
        "explanation": "The sequence [0, 1, 2, 3, 4, 5, 6, 7, 8] is the longest."
      }
    ],
    "testCases": [
      {
        "input": "[100,4,200,1,3,2]",
        "expectedOutput": "4",
        "isHidden": false
      },
      {
        "input": "[0,3,7,2,5,8,4,6,0,1]",
        "expectedOutput": "9",
        "isHidden": false
      },
      {
        "input": "[]",
        "expectedOutput": "0",
        "isHidden": true
      }
    ],
    "hints": [
      "Sorting takes O(n log n). We need O(n).",
      "Use a Hash Set for O(1) lookups.",
      "First pass: Add all numbers from `nums` into a set.",
      "Second pass: Iterate through `nums` again. For each `num`, check if it's the *start* of a sequence (i.e., `num - 1` is *not* in the set).",
      "If it *is* the start of a sequence, start counting upwards (`currentNum = num`, `currentLength = 1`). While `set.has(currentNum + 1)`, increment `currentNum` and `currentLength`.",
      "Update the `maxLength` found so far.",
      "This works because each sequence is only counted once, starting from its beginning."
    ],
    "solutions": [
      {
        "language": "javascript",
        "code": "var longestConsecutive = function(nums) {\n    if (nums.length === 0) {\n        return 0;\n    }\n\n    // 1. Add all numbers to a Set for O(1) lookup\n    const numSet = new Set(nums);\n    let maxLength = 0;\n\n    // 2. Iterate through the *set* (or original array)\n    for (const num of numSet) {\n        // Check if 'num' is the start of a sequence\n        // (i.e., num - 1 is NOT in the set)\n        if (!numSet.has(num - 1)) {\n            let currentNum = num;\n            let currentLength = 1;\n\n            // Count the length of the sequence starting from 'num'\n            while (numSet.has(currentNum + 1)) {\n                currentNum++;\n                currentLength++;\n            }\n            \n            // Update the max length found\n            maxLength = Math.max(maxLength, currentLength);\n        }\n    }\n\n    return maxLength;\n};",
        "explanation": "This O(n) solution uses a Hash Set (`numSet`). First, it adds all numbers from the input `nums` into the set. Then, it iterates through the numbers in the set. For each `num`, it checks if `num - 1` is *also* in the set. If `num - 1` is *not* present, it means `num` is the potential *start* of a consecutive sequence. We then enter a `while` loop, checking for `num + 1`, `num + 2`, etc., in the set, incrementing `currentLength` until the sequence breaks. We update `maxLength` with the longest `currentLength` found. This ensures that each consecutive sequence is counted only once, starting from its smallest element.",
        "timeComplexity": "O(n)",
        "spaceComplexity": "O(n)"
      }
    ],
    "acceptanceRate": 47.3,
    "totalSubmissions": 11000,
    "correctSubmissions": 5203,
    "averageTime": 19
  },
  {
    "title": "Encode and Decode Strings",
    "description": "Design an algorithm to encode a list of strings to a single string. The encoded string is then sent over the network and decoded back to the original list of strings.\n\nImplement the `encode` and `decode` methods.\n\n**Example 1:**\nInput: `[\"lint\",\"code\",\"love\",\"you\"]`\nOutput: `[\"lint\",\"code\",\"love\",\"you\"]`\nExplanation: One possible `encode` result is: `\"4#lint4#code4#love3#you\"`\n\n**Example 2:**\nInput: `[\"we\", \"say\", \":\", \"yes\"]`\nOutput: `[\"we\", \"say\", \":\", \"yes\"]`\nExplanation: One possible `encode` result is: `\"2#we3#say1#:3#yes\"`\n\n**Constraints:**\n- The string may contain any possible characters out of 256 valid ASCII characters.",
    "difficulty": "medium",
    "topics": [
      "String",
      "Design"
    ],
    "companies": [
      "Facebook",
      "Google",
      "Amazon",
      "Microsoft"
    ],
    "constraints": [
      "The string may contain any possible characters out of 256 valid ASCII characters."
    ],
    "examples": [
      {
        "input": "strs = [\"lint\",\"code\",\"love\",\"you\"]",
        "output": "[\"lint\",\"code\",\"love\",\"you\"]",
        "explanation": "Encode to a single string, then decode back."
      }
    ],
    "testCases": [
      {
        "input": "[\"Hello\", \"World\"]",
        "expectedOutput": "[\"Hello\", \"World\"]",
        "isHidden": false
      },
      {
        "input": "[\"\", \"\"]",
        "expectedOutput": "[\"\", \"\"]",
        "isHidden": false
      }
    ],
    "hints": [
      "How can you represent the boundaries between strings?",
      "Simply joining with a delimiter (like ',') won't work if the strings themselves contain the delimiter.",
      "You need a way to know the *length* of each string.",
      "One common encoding format is: `<length>#<string>`. For example, `\"hello\"` becomes `\"5#hello\"`.",
      "`encode`: Iterate through the list. For each string `s`, append `s.length + '#' + s` to the result.",
      "`decode`: Use a pointer `i`. While `i < encodedString.length`:\n  1. Find the delimiter '#' starting from `i`.\n  2. Parse the number *before* '#' to get the `length`.\n  3. Read the next `length` characters *after* '#' to get the string.\n  4. Add the string to the result list.\n  5. Update `i` to point after the decoded string."
    ],
    "solutions": [
      {
        "language": "javascript",
        "code": "class Codec {\n    /**\n     * @param {string[]} strs\n     * @returns {string}\n     */\n    encode(strs) {\n        let encoded = \"\";\n        for (const str of strs) {\n            encoded += `${str.length}#${str}`;\n        }\n        return encoded;\n    }\n\n    /**\n     * @param {string} s\n     * @returns {string[]}\n     */\n    decode(s) {\n        const decoded = [];\n        let i = 0;\n        while (i < s.length) {\n            // Find the delimiter '#'\n            let j = i;\n            while (s[j] !== '#') {\n                j++;\n            }\n            \n            // Get the length (number before '#')\n            const length = parseInt(s.substring(i, j));\n            \n            // Get the string itself (starts after '#')\n            const str = s.substring(j + 1, j + 1 + length);\n            decoded.push(str);\n            \n            // Move the pointer 'i' to the start of the next length\n            i = j + 1 + length;\n        }\n        return decoded;\n    }\n}",
        "explanation": "This solution uses the `<length>#<string>` format. The `encode` function iterates through the input array `strs`. For each string, it appends its length, followed by '#', followed by the string itself, to the `encoded` result string. The `decode` function uses a pointer `i` to traverse the encoded string `s`. In a loop, it finds the next '#' delimiter (using pointer `j`). It parses the substring between `i` and `j` to get the `length` of the next string. It then extracts the actual string using `substring(j + 1, j + 1 + length)`. This extracted string is added to the `decoded` array. Finally, `i` is updated to the position immediately after the extracted string, ready for the next iteration.",
        "timeComplexity": "O(N)",
        "spaceComplexity": "O(N)"
      }
    ],
    "acceptanceRate": 65.1,
    "totalSubmissions": 5000,
    "correctSubmissions": 3255,
    "averageTime": 15
  },
  {
    "title": "Find First and Last Position of Element in Sorted Array",
    "description": "Given an array of integers `nums` sorted in non-decreasing order, find the starting and ending position of a given `target` value.\n\nIf `target` is not found in the array, return `[-1, -1]`.\n\nYou must write an algorithm with O(log n) runtime complexity.\n\n**Example 1:**\nInput: nums = [5,7,7,8,8,10], target = 8\nOutput: [3,4]\n\n**Example 2:**\nInput: nums = [5,7,7,8,8,10], target = 6\nOutput: [-1,-1]\n\n**Example 3:**\nInput: nums = [], target = 0\nOutput: [-1,-1]\n\n**Constraints:**\n- 0 <= nums.length <= 10^5\n- -10^9 <= nums[i] <= 10^9\n- `nums` is a non-decreasing array.\n- -10^9 <= target <= 10^9",
    "difficulty": "medium",
    "topics": [
      "Array",
      "Binary Search"
    ],
    "companies": [
      "Amazon",
      "Facebook",
      "Google",
      "Microsoft"
    ],
    "constraints": [
      "0 <= nums.length <= 10^5",
      "nums is non-decreasing.",
      "Must be O(log n) time."
    ],
    "examples": [
      {
        "input": "nums = [5,7,7,8,8,10], target = 8",
        "output": "[3,4]",
        "explanation": "8 first appears at index 3 and last appears at index 4."
      },
      {
        "input": "nums = [5,7,7,8,8,10], target = 6",
        "output": "[-1,-1]",
        "explanation": "6 is not in the array."
      }
    ],
    "testCases": [
      {
        "input": "[5,7,7,8,8,10]\n8",
        "expectedOutput": "[3,4]",
        "isHidden": false
      },
      {
        "input": "[5,7,7,8,8,10]\n6",
        "expectedOutput": "[-1,-1]",
        "isHidden": false
      },
      {
        "input": "[1]\n1",
        "expectedOutput": "[0,0]",
        "isHidden": true
      }
    ],
    "hints": [
      "The O(log n) requirement points to Binary Search.",
      "You need to find the *leftmost* occurrence and the *rightmost* occurrence.",
      "Perform two modified binary searches.",
      "For the leftmost position: Use a binary search. When you find `nums[mid] == target`, don't stop. Store the index and try searching *further left* (`right = mid - 1`).",
      "For the rightmost position: Use another binary search. When you find `nums[mid] == target`, don't stop. Store the index and try searching *further right* (`left = mid + 1`).",
      "Handle the case where the target is not found at all."
    ],
    "solutions": [
      {
        "language": "javascript",
        "code": "var searchRange = function(nums, target) {\n    let first = -1, last = -1;\n\n    // Helper function for binary search\n    // 'findFirst' flag determines if we are looking for the leftmost or rightmost occurrence\n    function binarySearch(findFirst) {\n        let left = 0, right = nums.length - 1;\n        let index = -1;\n        \n        while (left <= right) {\n            let mid = Math.floor((left + right) / 2);\n            \n            if (nums[mid] === target) {\n                index = mid; // Found a potential match\n                if (findFirst) {\n                    right = mid - 1; // Try to find an earlier one\n                } else {\n                    left = mid + 1;  // Try to find a later one\n                }\n            } else if (nums[mid] < target) {\n                left = mid + 1;\n            } else {\n                right = mid - 1;\n            }\n        }\n        return index;\n    }\n\n    first = binarySearch(true);  // Find the leftmost occurrence\n    last = binarySearch(false); // Find the rightmost occurrence\n    \n    return [first, last];\n};",
        "explanation": "This solution uses two separate binary searches, optimized within a single helper function. The `binarySearch` function takes a `findFirst` boolean flag. When `findFirst` is `true`, and we find a match (`nums[mid] === target`), we store the `index` but continue searching in the *left* half (`right = mid - 1`) to find an even earlier occurrence. When `findFirst` is `false`, and we find a match, we store the `index` and continue searching in the *right* half (`left = mid + 1`) to find a later occurrence. We call `binarySearch(true)` to get the `first` index and `binarySearch(false)` to get the `last` index.",
        "timeComplexity": "O(log n)",
        "spaceComplexity": "O(1)"
      }
    ],
    "acceptanceRate": 39.7,
    "totalSubmissions": 16000,
    "correctSubmissions": 6352,
    "averageTime": 14
  },
  {
    "title": "Task Scheduler",
    "description": "Given a characters array `tasks`, representing the tasks a CPU needs to do, where each letter represents a different task. Tasks could be done in any order. Each task is done in one unit of time. For each unit of time, the CPU could complete either one task or just be idle.\n\nHowever, there is a non-negative integer `n` that represents the cooldown period between two **same tasks** (the same letter in the array), that is that there must be at least `n` units of time between any two same tasks.\n\nReturn the least number of units of times that the CPU will take to finish all the given tasks.\n\n**Example 1:**\nInput: tasks = [\"A\",\"A\",\"A\",\"B\",\"B\",\"B\"], n = 2\nOutput: 8\nExplanation: A -> B -> idle -> A -> B -> idle -> A -> B. There are 2 idle slots.\n\n**Example 2:**\nInput: tasks = [\"A\",\"A\",\"A\",\"B\",\"B\",\"B\"], n = 0\nOutput: 6\nExplanation: No cooldown needed. A -> A -> A -> B -> B -> B.\n\n**Constraints:**\n- 1 <= task.length <= 10^4\n- `tasks[i]` is upper-case English letter.\n- The integer `n` is in the range [0, 100].",
    "difficulty": "medium",
    "topics": [
      "Array",
      "Greedy",
      "Heap (Priority Queue)",
      "Counting"
    ],
    "companies": [
      "Facebook",
      "Amazon",
      "Google",
      "Microsoft"
    ],
    "constraints": [
      "1 <= task.length <= 10^4",
      "tasks[i] is upper-case English letter.",
      "0 <= n <= 100"
    ],
    "examples": [
      {
        "input": "tasks = [\"A\",\"A\",\"A\",\"B\",\"B\",\"B\"], n = 2",
        "output": "8",
        "explanation": "A->B->idle->A->B->idle->A->B. Cooldown is 2 units."
      },
      {
        "input": "tasks = [\"A\",\"A\",\"A\",\"B\",\"B\",\"B\"], n = 0",
        "output": "6",
        "explanation": "No cooldown: AAABBB."
      }
    ],
    "testCases": [
      {
        "input": "[\"A\",\"A\",\"A\",\"B\",\"B\",\"B\"]\n2",
        "expectedOutput": "8",
        "isHidden": false
      },
      {
        "input": "[\"A\",\"A\",\"A\",\"B\",\"B\",\"B\"]\n0",
        "expectedOutput": "6",
        "isHidden": false
      },
      {
        "input": "[\"A\",\"A\",\"A\",\"A\",\"A\",\"A\",\"B\",\"C\",\"D\",\"E\",\"F\",\"G\"]\n2",
        "expectedOutput": "16",
        "isHidden": true
      }
    ],
    "hints": [
      "The most frequent task determines the minimum time due to cooldown.",
      "Consider the task with the highest frequency (`maxFreq`).",
      "There will be `maxFreq - 1` gaps between the occurrences of this task.",
      "Each gap needs to be filled with `n` slots (either other tasks or idle time).",
      "The total time will be at least `(maxFreq - 1) * (n + 1)` (gaps + the `maxFreq` task itself) + `numMaxFreqTasks` (number of tasks *having* the max frequency).",
      "For example, AAABBC, n=2. maxFreq=3 ('A'). Gaps = 2. Each gap needs n=2 slots. `(3-1)*(2+1)` = 6. Plus `numMaxFreqTasks=1` ('A'). Total = 7. A->B->C->A->idle->idle->A.",
      "However, if there are many tasks, the total time might just be the total number of tasks (if cooldowns can always be filled by other tasks).",
      "The answer is `max(total number of tasks, calculated time based on maxFreq)`."
    ],
    "solutions": [
      {
        "language": "javascript",
        "code": "var leastInterval = function(tasks, n) {\n    if (n === 0) return tasks.length;\n\n    // 1. Count frequencies\n    const counts = new Array(26).fill(0);\n    const baseCode = 'A'.charCodeAt(0);\n    for (const task of tasks) {\n        counts[task.charCodeAt(0) - baseCode]++;\n    }\n\n    // 2. Find max frequency\n    let maxFreq = 0;\n    for (const count of counts) {\n        maxFreq = Math.max(maxFreq, count);\n    }\n\n    // 3. Count how many tasks have the max frequency\n    let numMaxFreqTasks = 0;\n    for (const count of counts) {\n        if (count === maxFreq) {\n            numMaxFreqTasks++;\n        }\n    }\n\n    // 4. Calculate time based on cooldown and max frequency\n    // (maxFreq - 1) gaps, each of size (n + 1) including one maxFreq task\n    // Then add the count of tasks that *also* have maxFreq\n    const time = (maxFreq - 1) * (n + 1) + numMaxFreqTasks;\n\n    // 5. The result is the max of this calculated time and the total tasks\n    // (because if there are many tasks, cooldown might not matter)\n    return Math.max(tasks.length, time);\n};",
        "explanation": "This solution calculates the minimum time based on the most frequent task. First, it counts the frequency of each task. Then, it finds the `maxFreq` and counts how many tasks (`numMaxFreqTasks`) share this maximum frequency. The core idea is that the schedule is constrained by the `maxFreq` task. There will be `maxFreq - 1` 'gaps' between instances of this task. Each gap must be at least `n` slots long. Including the task itself, each block (except possibly the last) is `n + 1` slots long. So, the time is at least `(maxFreq - 1) * (n + 1)`. We also need to add slots for all tasks that have the maximum frequency (`numMaxFreqTasks`), as they will occupy the last slots. This gives `time = (maxFreq - 1) * (n + 1) + numMaxFreqTasks`. However, if `n` is small or there are many other tasks, the total time might simply be `tasks.length` (if no idle time is needed). Therefore, the final answer is `Math.max(tasks.length, time)`.",
        "timeComplexity": "O(N)",
        "spaceComplexity": "O(1)"
      }
    ],
    "acceptanceRate": 53.9,
    "totalSubmissions": 8000,
    "correctSubmissions": 4312,
    "averageTime": 22
  },
  {
    "title": "Design Tic-Tac-Toe",
    "description": "Design a Tic-tac-toe game that is played between two players on an `n x n` grid.\n\nImplement the `TicTacToe` class:\n- `TicTacToe(int n)` Initializes the object with an empty board `n x n`.\n- `int move(int row, int col, int player)` Indicates that `player` places their mark at `(row, col)`. Returns:\n  - `0` if no one wins.\n  - `1` if player 1 wins.\n  - `2` if player 2 wins.\n\n**Example 1:**\nInput: `[\"TicTacToe\", \"move\", \"move\", \"move\", \"move\", \"move\", \"move\", \"move\"]`\n`[[3], [0, 0, 1], [0, 2, 2], [2, 2, 1], [1, 1, 2], [2, 0, 1], [1, 0, 2], [2, 1, 1]]`\nOutput: `[null, 0, 0, 0, 0, 0, 0, 1]`\nExplanation: Player 1 wins with the last move.\n\n**Constraints:**\n- 2 <= n <= 100\n- player is 1 or 2.\n- `0 <= row, col < n`\n- All moves are valid.",
    "difficulty": "medium",
    "topics": [
      "Design",
      "Array",
      "Matrix"
    ],
    "companies": [
      "Microsoft",
      "Amazon",
      "Facebook",
      "Google"
    ],
    "constraints": [
      "2 <= n <= 100",
      "player is 1 or 2.",
      "0 <= row, col < n",
      "All moves are valid."
    ],
    "examples": [
      {
        "input": "n=3, moves=[[0,0,1],[0,2,2],[2,2,1],[1,1,2],[2,0,1],[1,0,2],[2,1,1]]",
        "output": "Player 1 wins on the last move.",
        "explanation": "Sequence: X at (0,0), O at (0,2), X at (2,2), O at (1,1), X at (2,0), O at (1,0), X at (2,1). Player 1 wins via column 1."
      }
    ],
    "testCases": [
      {
        "input": "[\"TicTacToe\",\"move\",\"move\",\"move\",\"move\",\"move\",\"move\",\"move\"]\n[[3],[0,0,1],[0,2,2],[2,2,1],[1,1,2],[2,0,1],[1,0,2],[2,1,1]]",
        "expectedOutput": "[null,0,0,0,0,0,0,1]",
        "isHidden": false
      }
    ],
    "hints": [
      "Storing the whole `n x n` board is too slow for checking wins (O(n) per move).",
      "We only need to know if a player has completed a row, column, or diagonal.",
      "Maintain arrays to track the counts for each player in each row, column, and the two main diagonals.",
      "Use `rows[n]` and `cols[n]`. For player 1, add 1; for player 2, subtract 1.",
      "Also track `diag1` and `diag2` counts similarly.",
      "After a move at `(row, col)` by `player`, update `rows[row]`, `cols[col]`, and potentially `diag1` or `diag2`.",
      "Check if any of these counts reach `n` (for player 1) or `-n` (for player 2)."
    ],
    "solutions": [
      {
        "language": "javascript",
        "code": "/**\n * @param {number} n\n */\nvar TicTacToe = function(n) {\n    this.n = n;\n    // +1 for player 1, -1 for player 2\n    this.rows = new Array(n).fill(0);\n    this.cols = new Array(n).fill(0);\n    this.diag1 = 0; // Top-left to bottom-right\n    this.diag2 = 0; // Top-right to bottom-left\n};\n\n/** \n * @param {number} row \n * @param {number} col \n * @param {number} player\n * @return {number}\n */\nTicTacToe.prototype.move = function(row, col, player) {\n    const n = this.n;\n    const add = (player === 1) ? 1 : -1;\n\n    // Update counts\n    this.rows[row] += add;\n    this.cols[col] += add;\n    \n    // Check diagonals\n    if (row === col) {\n        this.diag1 += add;\n    }\n    if (row + col === n - 1) {\n        this.diag2 += add;\n    }\n\n    // Check for win condition\n    if (Math.abs(this.rows[row]) === n ||\n        Math.abs(this.cols[col]) === n ||\n        Math.abs(this.diag1) === n ||\n        Math.abs(this.diag2) === n) {\n        return player; // The current player wins\n    }\n\n    // No winner yet\n    return 0;\n};",
        "explanation": "This O(1) time solution avoids storing the whole board. It maintains counts for each row, column, and the two main diagonals. When player 1 moves, it adds 1 to the corresponding counts; when player 2 moves, it subtracts 1. After each `move(row, col, player)`, it updates `rows[row]`, `cols[col]`, and potentially `diag1` (if `row == col`) and `diag2` (if `row + col == n - 1`). It then checks if the absolute value of any of these updated counts equals `n`. If it does, the current `player` has won, and their number (1 or 2) is returned. Otherwise, 0 is returned.",
        "timeComplexity": "O(1)",
        "spaceComplexity": "O(n)"
      }
    ],
    "acceptanceRate": 56.4,
    "totalSubmissions": 6000,
    "correctSubmissions": 3384,
    "averageTime": 16
  },
  {
    "title": "Alien Dictionary",
    "description": "There is a new alien language that uses the English alphabet. However, the order among the letters is unknown to you.\n\nYou are given a list of strings `words` from the alien language's dictionary, where the strings in `words` are sorted lexicographically by the rules of this new language.\n\nReturn a string of the unique letters in the new alien language sorted in lexicographically increasing order by the new language's rules. If there is no solution, return \"\". If there are multiple solutions, return any of them.\n\n**Example 1:**\nInput: words = [\"wrt\",\"wrf\",\"er\",\"ett\",\"rftt\"]\nOutput: \"wertf\"\n\n**Example 2:**\nInput: words = [\"z\",\"x\"]\nOutput: \"zx\"\n\n**Example 3:**\nInput: words = [\"z\",\"x\",\"z\"]\nOutput: \"\"\nExplanation: The order is invalid, so return \"\".\n\n**Constraints:**\n- 1 <= words.length <= 100\n- 1 <= words[i].length <= 100\n- `words[i]` consists of only lowercase English letters.",
    "difficulty": "hard",
    "topics": [
      "Graph",
      "Topological Sort",
      "Depth-First Search",
      "Breadth-First Search"
    ],
    "companies": [
      "Facebook",
      "Google",
      "Amazon",
      "Microsoft"
    ],
    "constraints": [
      "1 <= words.length <= 100",
      "1 <= words[i].length <= 100",
      "words[i] consists of only lowercase English letters."
    ],
    "examples": [
      {
        "input": "words = [\"wrt\",\"wrf\",\"er\",\"ett\",\"rftt\"]",
        "output": "\"wertf\"",
        "explanation": "From 'wrt', 'wrf' -> t before f. From 'wrf', 'er' -> w before e. From 'er','ett' -> r before t. From 'ett','rftt' -> e before r. Order: w->e->r->t->f"
      },
      {
        "input": "words = [\"z\",\"x\",\"z\"]",
        "output": "\"\"",
        "explanation": "Invalid order: z before x, then x before z."
      }
    ],
    "testCases": [
      {
        "input": "[\"wrt\",\"wrf\",\"er\",\"ett\",\"rftt\"]",
        "expectedOutput": "\"wertf\"",
        "isHidden": false
      },
      {
        "input": "[\"z\",\"x\"]",
        "expectedOutput": "\"zx\"",
        "isHidden": false
      },
      {
        "input": "[\"z\",\"x\",\"z\"]",
        "expectedOutput": "\"\"",
        "isHidden": true
      },
      {
        "input": "[\"abc\",\"ab\"]",
        "expectedOutput": "\"\"",
        "isHidden": true
      }
    ],
    "hints": [
      "This problem requires finding a valid topological sort of the characters.",
      "Build a directed graph where characters are nodes.",
      "An edge `u -> v` means character `u` comes before character `v`.",
      "How do you find the edges? Compare adjacent words in the `words` list (e.g., `words[i]` and `words[i+1]`).",
      "Find the *first* differing character between two adjacent words. That gives you an edge. `word1[j] -> word2[j]`.",
      "Be careful: if `word1` is a prefix of `word2` but `word1.length > word2.length` (e.g., \"abc\" before \"ab\"), the order is invalid.",
      "After building the graph (adjacency list and in-degrees), perform a topological sort (Kahn's algorithm using BFS is common).",
      "If the topological sort result includes all unique characters present in the words, return the result. Otherwise (cycle detected or invalid prefix case), return \"\"."
    ],
    "solutions": [
      {
        "language": "javascript",
        "code": "var alienOrder = function(words) {\n    // 1. Initialize graph (adj list) and in-degrees for all chars present\n    const adj = new Map();\n    const inDegree = new Map();\n    for (const word of words) {\n        for (const char of word) {\n            if (!adj.has(char)) adj.set(char, new Set());\n            if (!inDegree.has(char)) inDegree.set(char, 0);\n        }\n    }\n\n    // 2. Build graph edges and in-degrees by comparing adjacent words\n    for (let i = 0; i < words.length - 1; i++) {\n        const w1 = words[i];\n        const w2 = words[i + 1];\n        const minLen = Math.min(w1.length, w2.length);\n        let diffFound = false;\n\n        for (let j = 0; j < minLen; j++) {\n            const c1 = w1[j];\n            const c2 = w2[j];\n            if (c1 !== c2) {\n                // Found the first difference, add edge c1 -> c2\n                if (!adj.get(c1).has(c2)) {\n                    adj.get(c1).add(c2);\n                    inDegree.set(c2, inDegree.get(c2) + 1);\n                }\n                diffFound = true;\n                break; // Only the first difference matters\n            }\n        }\n        \n        // Check for invalid prefix case (e.g., \"abc\" before \"ab\")\n        if (!diffFound && w1.length > w2.length) {\n            return \"\";\n        }\n    }\n\n    // 3. Topological Sort (Kahn's Algorithm using BFS)\n    const queue = [];\n    const result = [];\n    for (const [char, degree] of inDegree.entries()) {\n        if (degree === 0) {\n            queue.push(char);\n        }\n    }\n\n    while (queue.length > 0) {\n        const char = queue.shift();\n        result.push(char);\n\n        if (adj.has(char)) {\n            for (const neighbor of adj.get(char)) {\n                inDegree.set(neighbor, inDegree.get(neighbor) - 1);\n                if (inDegree.get(neighbor) === 0) {\n                    queue.push(neighbor);\n                }\n            }\n        }\n    }\n\n    // 4. Check if all characters were included (detects cycles)\n    if (result.length === inDegree.size) {\n        return result.join('');\n    } else {\n        return \"\";\n    }\n};",
        "explanation": "This solution performs a topological sort. First, it initializes an adjacency list (`adj`) and an in-degree map (`inDegree`) for all unique characters found in the words. Second, it builds the graph by comparing adjacent words (`w1`, `w2`). It finds the first differing character (`c1`, `c2`) and adds a directed edge `c1 -> c2`, incrementing `c2`'s in-degree. It also checks for the invalid prefix case (like `\"abc\", \"ab\"`). Third, it performs Kahn's algorithm: initialize a queue with all characters having an in-degree of 0. While the queue is not empty, dequeue a character, add it to the `result`, and decrement the in-degree of all its neighbors. If a neighbor's in-degree becomes 0, enqueue it. Finally, it checks if the length of the `result` matches the total number of unique characters. If yes, it returns the sorted string; otherwise (cycle detected or invalid prefix), it returns \"\".",
        "timeComplexity": "O(C)",
        "spaceComplexity": "O(V + E)"
      }
    ],
    "acceptanceRate": 35.1,
    "totalSubmissions": 5000,
    "correctSubmissions": 1755,
    "averageTime": 30
  },
  {
    "title": "Word Ladder",
    "description": "A transformation sequence from word `beginWord` to `endWord` using a dictionary `wordList` is a sequence of words `beginWord -> s1 -> s2 -> ... -> sk` such that:\n- Every adjacent pair of words differs by a single letter.\n- Every `si` is in `wordList`.\n\nGiven `beginWord`, `endWord`, and `wordList`, return the length of the shortest transformation sequence, or 0 if no such sequence exists.\n\n**Example 1:**\nInput: beginWord = \"hit\", endWord = \"cog\", wordList = [\"hot\",\"dot\",\"dog\",\"lot\",\"log\",\"cog\"]\nOutput: 5\nExplanation: \"hit\" -> \"hot\" -> \"dot\" -> \"dog\" -> \"cog\"\n\n**Example 2:**\nInput: beginWord = \"hit\", endWord = \"cog\", wordList = [\"hot\",\"dot\",\"dog\",\"lot\",\"log\"]\nOutput: 0\n\n**Constraints:**\n- 1 <= beginWord.length <= 10\n- endWord.length == beginWord.length\n- 1 <= wordList.length <= 5000\n- `wordList[i].length == beginWord.length`\n- `beginWord`, `endWord`, and `wordList[i]` consist of lowercase English letters.\n- `beginWord != endWord`\n- All words in `wordList` are **unique**.",
    "difficulty": "hard",
    "topics": [
      "Graph",
      "Breadth-First Search (BFS)",
      "String"
    ],
    "companies": [
      "Amazon",
      "Facebook",
      "Google",
      "Microsoft"
    ],
    "constraints": [
      "1 <= beginWord.length <= 10",
      "endWord.length == beginWord.length",
      "1 <= wordList.length <= 5000",
      "All words in wordList are unique."
    ],
    "examples": [
      {
        "input": "beginWord = \"hit\", endWord = \"cog\", wordList = [\"hot\",\"dot\",\"dog\",\"lot\",\"log\",\"cog\"]",
        "output": "5",
        "explanation": "Shortest path: hit -> hot -> dot -> dog -> cog (length 5)."
      },
      {
        "input": "beginWord = \"hit\", endWord = \"cog\", wordList = [\"hot\",\"dot\",\"dog\",\"lot\",\"log\"]",
        "output": "0",
        "explanation": "cog is not in wordList, sequence impossible."
      }
    ],
    "testCases": [
      {
        "input": "\"hit\"\n\"cog\"\n[\"hot\",\"dot\",\"dog\",\"lot\",\"log\",\"cog\"]",
        "expectedOutput": "5",
        "isHidden": false
      },
      {
        "input": "\"hit\"\n\"cog\"\n[\"hot\",\"dot\",\"dog\",\"lot\",\"log\"]",
        "expectedOutput": "0",
        "isHidden": false
      },
      {
        "input": "\"a\"\n\"c\"\n[\"a\",\"b\",\"c\"]",
        "expectedOutput": "2",
        "isHidden": true
      }
    ],
    "hints": [
      "This problem asks for the *shortest* path, which suggests Breadth-First Search (BFS).",
      "Think of words as nodes in a graph. An edge exists between two words if they differ by exactly one letter.",
      "Building the full graph explicitly can be slow.",
      "Instead, perform BFS starting from `beginWord`. Maintain a queue and a `visited` set.",
      "In each level of the BFS, explore neighbors: for the `currentWord`, generate all possible words that differ by one letter ('*' wildcard approach).",
      "For each generated `neighborWord`, check if it's in the `wordList` set and hasn't been visited.",
      "If `neighborWord == endWord`, return the current level + 1.",
      "If it's in the set and unvisited, add it to the queue and mark as visited.",
      "Preprocessing `wordList` into a Set is crucial for fast lookups."
    ],
    "solutions": [
      {
        "language": "javascript",
        "code": "var ladderLength = function(beginWord, endWord, wordList) {\n    const wordSet = new Set(wordList);\n    if (!wordSet.has(endWord)) {\n        return 0; // Target word not in the list\n    }\n\n    const queue = [[beginWord, 1]]; // [word, level]\n    const visited = new Set([beginWord]);\n\n    while (queue.length > 0) {\n        const [currentWord, level] = queue.shift();\n\n        if (currentWord === endWord) {\n            return level;\n        }\n\n        // Generate neighbors (differ by one letter)\n        for (let i = 0; i < currentWord.length; i++) {\n            const originalChar = currentWord[i];\n            for (let charCode = 97; charCode <= 122; charCode++) { // 'a' to 'z'\n                const newChar = String.fromCharCode(charCode);\n                if (newChar === originalChar) continue;\n\n                const nextWord = currentWord.substring(0, i) + newChar + currentWord.substring(i + 1);\n\n                if (wordSet.has(nextWord) && !visited.has(nextWord)) {\n                    visited.add(nextWord);\n                    queue.push([nextWord, level + 1]);\n                }\n            }\n        }\n    }\n\n    return 0; // No path found\n};",
        "explanation": "This solution uses Breadth-First Search (BFS) to find the shortest path. We first put the `wordList` into a `Set` for O(1) lookups and check if `endWord` exists. We initialize a `queue` with `[beginWord, 1]` (level 1) and a `visited` set. The main BFS loop continues while the queue is not empty. In each iteration, we dequeue a `[currentWord, level]`. If `currentWord` is the `endWord`, we return `level`. Otherwise, we generate all possible `nextWord` variations by changing one character at a time ('a' through 'z'). If a `nextWord` is in the `wordSet` and hasn't been `visited`, we add it to `visited` and enqueue `[nextWord, level + 1]`. If the queue becomes empty and we haven't found `endWord`, no path exists.",
        "timeComplexity": "O(N * M^2)",
        "spaceComplexity": "O(N * M)"
      }
    ],
    "acceptanceRate": 36.9,
    "totalSubmissions": 10000,
    "correctSubmissions": 3690,
    "averageTime": 45
  },
  {
    "title": "Coin Change II",
    "description": "You are given an integer array `coins` representing coins of different denominations and an integer `amount` representing a total amount of money.\n\nReturn the number of combinations that make up that amount. If that amount of money cannot be made up by any combination of the coins, return 0.\n\nYou may assume that you have an infinite number of each kind of coin.\n\n**Example 1:**\nInput: amount = 5, coins = [1,2,5]\nOutput: 4\nExplanation: 5=5, 5=2+2+1, 5=2+1+1+1, 5=1+1+1+1+1\n\n**Example 2:**\nInput: amount = 3, coins = [2]\nOutput: 0\n\n**Example 3:**\nInput: amount = 10, coins = [10]\nOutput: 1\n\n**Constraints:**\n- 1 <= coins.length <= 300\n- 1 <= coins[i] <= 5000\n- All the values of coins are unique.\n- 0 <= amount <= 5000",
    "difficulty": "medium",
    "topics": [
      "Dynamic Programming",
      "Array"
    ],
    "companies": [
      "Amazon",
      "Facebook",
      "Google",
      "Microsoft"
    ],
    "constraints": [
      "1 <= coins.length <= 300",
      "1 <= coins[i] <= 5000",
      "All values of coins are unique.",
      "0 <= amount <= 5000"
    ],
    "examples": [
      {
        "input": "amount = 5, coins = [1,2,5]",
        "output": "4",
        "explanation": "5 | 2+2+1 | 2+1+1+1 | 1+1+1+1+1"
      },
      {
        "input": "amount = 3, coins = [2]",
        "output": "0",
        "explanation": "Cannot make 3 with only 2s."
      }
    ],
    "testCases": [
      {
        "input": "5\n[1,2,5]",
        "expectedOutput": "4",
        "isHidden": false
      },
      {
        "input": "3\n[2]",
        "expectedOutput": "0",
        "isHidden": false
      },
      {
        "input": "10\n[10]",
        "expectedOutput": "1",
        "isHidden": false
      }
    ],
    "hints": [
      "This is a variation of 'Coin Change I' (minimum coins). Here we want the *number of ways*.",
      "This is an 'Unbounded Knapsack' type DP problem.",
      "Let `dp[i]` be the number of ways to make amount `i`.",
      "Initialize `dp` array of size `amount + 1` with 0s. Set `dp[0] = 1` (one way to make amount 0 - use no coins).",
      "Iterate through each `coin` in `coins`.",
      "For each `coin`, iterate through amounts `j` from `coin` up to `amount`.",
      "Update `dp[j] = dp[j] + dp[j - coin]`. This means the ways to make amount `j` include all the ways to make `j - coin`, plus using the current `coin`.",
      "The order of loops (coins outer, amounts inner) is important to count combinations, not permutations."
    ],
    "solutions": [
      {
        "language": "javascript",
        "code": "var change = function(amount, coins) {\n    // dp[i] = number of ways to make amount 'i'\n    const dp = new Array(amount + 1).fill(0);\n    \n    // Base case: 1 way to make amount 0 (use no coins)\n    dp[0] = 1;\n\n    // Iterate through each coin\n    for (const coin of coins) {\n        // Update dp table for amounts reachable with this coin\n        for (let j = coin; j <= amount; j++) {\n            // The number of ways to make amount 'j' is increased by\n            // the number of ways to make amount 'j - coin'.\n            dp[j] += dp[j - coin];\n        }\n    }\n\n    return dp[amount];\n};",
        "explanation": "This solution uses 1D Dynamic Programming. `dp[i]` stores the number of distinct combinations to make amount `i`. We initialize `dp[0] = 1`. We then iterate through each `coin` available. For each `coin`, we iterate through amounts `j` from the `coin`'s value up to the target `amount`. The core logic is `dp[j] += dp[j - coin]`. This means we are adding the number of ways we could make the amount `j - coin` to the number of ways we can make amount `j`, because we can now form amount `j` by taking all the combinations for `j - coin` and adding the current `coin` to them. The outer loop being the coins ensures we count combinations (e.g., 1+2) rather than permutations (1+2 and 2+1 separately).",
        "timeComplexity": "O(amount * n)",
        "spaceComplexity": "O(amount)"
      }
    ],
    "acceptanceRate": 56.4,
    "totalSubmissions": 7000,
    "correctSubmissions": 3948,
    "averageTime": 19
  },
  {
    "title": "Pow(x, n)",
    "description": "Implement `pow(x, n)`, which calculates `x` raised to the power `n` (i.e., x^n).\n\n**Example 1:**\nInput: x = 2.00000, n = 10\nOutput: 1024.00000\n\n**Example 2:**\nInput: x = 2.10000, n = 3\nOutput: 9.26100\n\n**Example 3:**\nInput: x = 2.00000, n = -2\nOutput: 0.25000\nExplanation: 2^-2 = 1/2^2 = 1/4 = 0.25\n\n**Constraints:**\n- -100.0 < x < 100.0\n- -2^31 <= n <= 2^31 - 1\n- n is an integer.",
    "difficulty": "medium",
    "topics": [
      "Math",
      "Recursion"
    ],
    "companies": [
      "LinkedIn",
      "Google",
      "Facebook",
      "Microsoft"
    ],
    "constraints": [
      "-100.0 < x < 100.0",
      "-2^31 <= n <= 2^31 - 1"
    ],
    "examples": [
      {
        "input": "x = 2.00000, n = 10",
        "output": "1024.00000"
      },
      {
        "input": "x = 2.00000, n = -2",
        "output": "0.25000",
        "explanation": "1 / (2^2) = 0.25"
      }
    ],
    "testCases": [
      {
        "input": "2.00000\n10",
        "expectedOutput": "1024.0",
        "isHidden": false
      },
      {
        "input": "2.10000\n3",
        "expectedOutput": "9.261",
        "isHidden": false
      },
      {
        "input": "2.00000\n-2",
        "expectedOutput": "0.25",
        "isHidden": false
      },
      {
        "input": "1.00000\n-2147483648",
        "expectedOutput": "1.0",
        "isHidden": true
      }
    ],
    "hints": [
      "A simple loop multiplying `x` `n` times will time out due to the large constraint on `n`.",
      "Think about exponentiation by squaring (also known as binary exponentiation).",
      "If `n` is even, `x^n = (x*x)^(n/2)`.",
      "If `n` is odd, `x^n = x * (x*x)^((n-1)/2)`.",
      "Use recursion with these properties.",
      "Handle the base cases: `n = 0` (result is 1) and `n = 1` (result is x).",
      "Handle negative `n` by calculating `pow(1/x, -n)`."
    ],
    "solutions": [
      {
        "language": "javascript",
        "code": "var myPow = function(x, n) {\n    // Base case: x^0 = 1\n    if (n === 0) {\n        return 1.0;\n    }\n\n    // Handle negative exponent\n    if (n < 0) {\n        x = 1 / x;\n        n = -n;\n    }\n\n    // Recursive helper using exponentiation by squaring\n    function power(base, exp) {\n        if (exp === 0) return 1.0;\n        if (exp === 1) return base;\n        \n        // Calculate result for exp / 2\n        const half = power(base, Math.floor(exp / 2));\n        \n        if (exp % 2 === 0) {\n            // If exp is even: result = half * half\n            return half * half;\n        } else {\n            // If exp is odd: result = base * half * half\n            return base * half * half;\n        }\n    }\n\n    return power(x, n);\n};",
        "explanation": "This solution uses exponentiation by squaring to achieve O(log n) time complexity. It first handles the `n=0` base case and the case where `n` is negative (by inverting `x` and making `n` positive). The recursive `power(base, exp)` function implements the core logic. The base cases are `exp=0` (return 1) and `exp=1` (return `base`). In the recursive step, it calculates the result for `exp / 2` by calling `power(base, Math.floor(exp / 2))`. If `exp` is even, the final result is `half * half`. If `exp` is odd, the result is `base * half * half`.",
        "timeComplexity": "O(log n)",
        "spaceComplexity": "O(log n)"
      }
    ],
    "acceptanceRate": 33.5,
    "totalSubmissions": 15000,
    "correctSubmissions": 5025,
    "averageTime": 10
  },
  {
    "title": "Minimum Path Sum",
    "description": "Given an `m x n` `grid` filled with non-negative numbers, find a path from the top-left corner to the bottom-right corner, which minimizes the sum of all numbers along its path.\n\nNote: You can only move either **down** or **right** at any point in time.\n\n**Example 1:**\nInput: grid = [[1,3,1],[1,5,1],[4,2,1]]\nOutput: 7\nExplanation: Because the path 1->3->1->1->1 minimizes the sum.\n\n**Example 2:**\nInput: grid = [[1,2,3],[4,5,6]]\nOutput: 12\n\n**Constraints:**\n- m == grid.length\n- n == grid[i].length\n- 1 <= m, n <= 200\n- 0 <= grid[i][j] <= 100",
    "difficulty": "medium",
    "topics": [
      "Array",
      "Dynamic Programming",
      "Matrix"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Microsoft",
      "Facebook"
    ],
    "constraints": [
      "m == grid.length",
      "n == grid[i].length",
      "1 <= m, n <= 200",
      "0 <= grid[i][j] <= 100"
    ],
    "examples": [
      {
        "input": "grid = [[1,3,1],[1,5,1],[4,2,1]]",
        "output": "7",
        "explanation": "Path 1->1->5->2->1 is not minimal. Path 1->3->1->1->1 is."
      },
      {
        "input": "grid = [[1,2,3],[4,5,6]]",
        "output": "12",
        "explanation": "Path 1->2->3->6 or 1->4->5->6."
      }
    ],
    "testCases": [
      {
        "input": "[[1,3,1],[1,5,1],[4,2,1]]",
        "expectedOutput": "7",
        "isHidden": false
      },
      {
        "input": "[[1,2,3],[4,5,6]]",
        "expectedOutput": "12",
        "isHidden": false
      }
    ],
    "hints": [
      "This is a typical 2D Dynamic Programming problem.",
      "Let `dp[i][j]` be the minimum path sum to reach cell `(i, j)`.",
      "Base case: `dp[0][0] = grid[0][0]`.",
      "Base cases for first row: `dp[0][j] = dp[0][j-1] + grid[0][j]`.",
      "Base cases for first column: `dp[i][0] = dp[i-1][0] + grid[i][0]`.",
      "Recurrence relation for other cells: `dp[i][j] = grid[i][j] + min(dp[i-1][j], dp[i][j-1])` (current cell value plus the minimum path sum from either above or left).",
      "The answer is `dp[m-1][n-1]`.",
      "You can optimize space by modifying the grid in-place or using only O(n) space."
    ],
    "solutions": [
      {
        "language": "javascript",
        "code": "var minPathSum = function(grid) {\n    const m = grid.length;\n    const n = grid[0].length;\n\n    // Modify the grid in-place to store DP results\n\n    // Initialize first row\n    for (let j = 1; j < n; j++) {\n        grid[0][j] += grid[0][j - 1];\n    }\n\n    // Initialize first column\n    for (let i = 1; i < m; i++) {\n        grid[i][0] += grid[i - 1][0];\n    }\n\n    // Fill the rest of the grid\n    for (let i = 1; i < m; i++) {\n        for (let j = 1; j < n; j++) {\n            // Current cell = current value + min path from top or left\n            grid[i][j] += Math.min(grid[i - 1][j], grid[i][j - 1]);\n        }\n    }\n\n    // The bottom-right cell contains the min path sum\n    return grid[m - 1][n - 1];\n};",
        "explanation": "This solution uses Dynamic Programming directly on the input `grid` to achieve O(1) extra space. It first calculates the minimum path sums for the first row (can only come from the left) and the first column (can only come from above). Then, it iterates through the rest of the grid cells `(i, j)`. For each cell, it updates its value to be `grid[i][j] + min(path_sum_from_above, path_sum_from_left)`, which translates to `grid[i][j] += Math.min(grid[i - 1][j], grid[i][j - 1])`. After filling the entire grid, the value at the bottom-right corner `grid[m - 1][n - 1]` holds the overall minimum path sum.",
        "timeComplexity": "O(m * n)",
        "spaceComplexity": "O(1)"
      }
    ],
    "acceptanceRate": 59.8,
    "totalSubmissions": 10000,
    "correctSubmissions": 5980,
    "averageTime": 16
  },
  {
    "title": "Implement strStr()",
    "description": "Implement `strStr()`. Return the index of the first occurrence of `needle` in `haystack`, or -1 if `needle` is not part of `haystack`.\n\nClarification: What should we return when `needle` is an empty string? Return 0.\n\n**Example 1:**\nInput: haystack = \"hello\", needle = \"ll\"\nOutput: 2\n\n**Example 2:**\nInput: haystack = \"aaaaa\", needle = \"bba\"\nOutput: -1\n\n**Example 3:**\nInput: haystack = \"\", needle = \"\"\nOutput: 0\n\n**Constraints:**\n- 0 <= haystack.length, needle.length <= 5 * 10^4\n- `haystack` and `needle` consist of only lower-case English characters.",
    "difficulty": "easy",
    "topics": [
      "String",
      "Two Pointers"
    ],
    "companies": [
      "Microsoft",
      "Amazon",
      "Facebook",
      "Apple"
    ],
    "constraints": [
      "0 <= haystack.length, needle.length <= 5 * 10^4",
      "haystack and needle consist of only lower-case English characters."
    ],
    "examples": [
      {
        "input": "haystack = \"hello\", needle = \"ll\"",
        "output": "2",
        "explanation": "\"ll\" starts at index 2."
      },
      {
        "input": "haystack = \"aaaaa\", needle = \"bba\"",
        "output": "-1",
        "explanation": "\"bba\" is not found."
      },
      {
        "input": "haystack = \"\", needle = \"\"",
        "output": "0",
        "explanation": "Empty needle is found at index 0."
      }
    ],
    "testCases": [
      {
        "input": "\"hello\"\n\"ll\"",
        "expectedOutput": "2",
        "isHidden": false
      },
      {
        "input": "\"aaaaa\"\n\"bba\"",
        "expectedOutput": "-1",
        "isHidden": false
      },
      {
        "input": "\"\"\n\"\"",
        "expectedOutput": "0",
        "isHidden": false
      },
      {
        "input": "\"mississippi\"\n\"issip\"",
        "expectedOutput": "4",
        "isHidden": true
      }
    ],
    "hints": [
      "Handle the edge case where `needle` is empty (return 0).",
      "Iterate through `haystack` with a pointer `i` from 0 up to `haystack.length - needle.length`.",
      "At each `i`, check if the substring `haystack.substring(i, i + needle.length)` is equal to `needle`.",
      "If it is, return `i`.",
      "If the loop finishes without finding a match, return -1.",
      "Consider more advanced algorithms like KMP for better performance on tricky inputs, although simple substring check is often sufficient."
    ],
    "solutions": [
      {
        "language": "javascript",
        "code": "var strStr = function(haystack, needle) {\n    if (needle.length === 0) {\n        return 0;\n    }\n    if (needle.length > haystack.length) {\n        return -1;\n    }\n\n    const hLen = haystack.length;\n    const nLen = needle.length;\n\n    // Iterate through possible starting points in haystack\n    for (let i = 0; i <= hLen - nLen; i++) {\n        // Check if the substring matches the needle\n        let match = true;\n        for (let j = 0; j < nLen; j++) {\n            if (haystack[i + j] !== needle[j]) {\n                match = false;\n                break;\n            }\n        }\n        if (match) {\n            return i;\n        }\n    }\n\n    return -1;\n};",
        "explanation": "This solution implements a straightforward sliding window check. It first handles the edge case where the `needle` is empty (returns 0). It then iterates through the `haystack` with index `i`, starting from 0 up to the last possible position where `needle` could begin (`hLen - nLen`). In each iteration, it uses a nested loop (with index `j`) to compare the substring of `haystack` starting at `i` with the `needle`, character by character. If a mismatch is found, the inner loop breaks. If the inner loop completes without breaking (`match` remains true), it means the `needle` was found at index `i`, which is returned. If the outer loop finishes without finding a match, -1 is returned.",
        "timeComplexity": "O(m * n)",
        "spaceComplexity": "O(1)"
      }
    ],
    "acceptanceRate": 36.9,
    "totalSubmissions": 20000,
    "correctSubmissions": 7380,
    "averageTime": 10
  },
  {
    "title": "String Compression",
    "description": "Given an array of characters `chars`, compress it using the following algorithm:\n\nBegin with an empty string `s`. For each group of consecutive repeating characters in `chars`:\n- If the group's length is 1, append the character to `s`.\n- Otherwise, append the character followed by the group's length.\n\nThe compressed string `s` should not be returned separately, but instead, be stored **in the input character array `chars`**. Note that group lengths that are 10 or longer will be split into multiple characters in `chars`.\n\nAfter you are done modifying the input array, return the new length of the array.\n\nYou must write an algorithm that uses only constant extra space.\n\n**Example 1:**\nInput: chars = [\"a\",\"a\",\"b\",\"b\",\"c\",\"c\",\"c\"]\nOutput: Return 6, and the first 6 characters of the input array should be: [\"a\",\"2\",\"b\",\"2\",\"c\",\"3\"]\n\n**Example 2:**\nInput: chars = [\"a\"]\nOutput: Return 1, and the first character is [\"a\"].\n\n**Example 3:**\nInput: chars = [\"a\",\"b\",\"b\",\"b\",\"b\",\"b\",\"b\",\"b\",\"b\",\"b\",\"b\",\"b\",\"b\"]\nOutput: Return 4, and the first 4 characters are [\"a\",\"b\",\"1\",\"2\"].\n\n**Constraints:**\n- 1 <= chars.length <= 2000\n- `chars[i]` is a lowercase English letter, uppercase English letter, digit, or symbol.",
    "difficulty": "medium",
    "topics": [
      "String",
      "Two Pointers"
    ],
    "companies": [
      "Amazon",
      "Microsoft",
      "Facebook",
      "Bloomberg"
    ],
    "constraints": [
      "1 <= chars.length <= 2000",
      "chars[i] is a lowercase/uppercase letter, digit, or symbol.",
      "Must use O(1) extra space."
    ],
    "examples": [
      {
        "input": "chars = [\"a\",\"a\",\"b\",\"b\",\"c\",\"c\",\"c\"]",
        "output": "6, chars = [\"a\",\"2\",\"b\",\"2\",\"c\",\"3\", ...]",
        "explanation": "Groups are \"aa\", \"bb\", \"ccc\"."
      },
      {
        "input": "chars = [\"a\",\"b\",\"b\",\"b\",\"b\",\"b\",\"b\",\"b\",\"b\",\"b\",\"b\",\"b\",\"b\"]",
        "output": "4, chars = [\"a\",\"b\",\"1\",\"2\", ...]",
        "explanation": "Group \"a\" (length 1), Group \"b\" (length 12)."
      }
    ],
    "testCases": [
      {
        "input": "[\"a\",\"a\",\"b\",\"b\",\"c\",\"c\",\"c\"]",
        "expectedOutput": "6",
        "isHidden": false
      },
      {
        "input": "[\"a\"]",
        "expectedOutput": "1",
        "isHidden": false
      },
      {
        "input": "[\"a\",\"b\",\"b\",\"b\",\"b\",\"b\",\"b\",\"b\",\"b\",\"b\",\"b\",\"b\",\"b\"]",
        "expectedOutput": "4",
        "isHidden": true
      }
    ],
    "hints": [
      "Use a 'read' pointer `i` and a 'write' pointer `writeIndex`.",
      "Iterate `i` through `chars`.",
      "At each `i`, find the end of the consecutive group of characters (`j`).",
      "Calculate the `count = j - i`.",
      "Write the character `chars[i]` at `writeIndex` and increment `writeIndex`.",
      "If `count > 1`, convert `count` to a string. Iterate through the digits of the count string, writing each digit char at `writeIndex` and incrementing `writeIndex`.",
      "Update `i` to `j` to start the next group."
    ],
    "solutions": [
      {
        "language": "javascript",
        "code": "var compress = function(chars) {\n    let writeIndex = 0; // Where to write the compressed char/count\n    let readIndex = 0; // Pointer to read the original array\n\n    while (readIndex < chars.length) {\n        const currentChar = chars[readIndex];\n        let count = 0;\n        \n        // Find the count of consecutive characters\n        let groupEndIndex = readIndex;\n        while (groupEndIndex < chars.length && chars[groupEndIndex] === currentChar) {\n            groupEndIndex++;\n            count++;\n        }\n\n        // Write the character\n        chars[writeIndex] = currentChar;\n        writeIndex++;\n\n        // Write the count if it's greater than 1\n        if (count > 1) {\n            const countStr = count.toString();\n            for (const digitChar of countStr) {\n                chars[writeIndex] = digitChar;\n                writeIndex++;\n            }\n        }\n\n        // Move readIndex to the start of the next group\n        readIndex = groupEndIndex;\n    }\n\n    // writeIndex is the new length\n    return writeIndex;\n};",
        "explanation": "This solution uses a 'read' pointer (`readIndex`) and a 'write' pointer (`writeIndex`) for in-place modification. It iterates through `chars` using `readIndex`. For each `currentChar`, it uses an inner loop to find the `count` of consecutive occurrences. It then writes the `currentChar` at `writeIndex`. If the `count` is greater than 1, it converts the `count` to a string and writes each digit character to `chars` starting at `writeIndex`. Finally, it updates `readIndex` to the end of the group it just processed. The loop continues until `readIndex` reaches the end. The final value of `writeIndex` represents the new length of the compressed array.",
        "timeComplexity": "O(n)",
        "spaceComplexity": "O(1)"
      }
    ],
    "acceptanceRate": 47.9,
    "totalSubmissions": 7000,
    "correctSubmissions": 3353,
    "averageTime": 16
  },
  {
    "title": "Accounts Merge",
    "description": "Given a list `accounts` where `accounts[i] = [namei, email1, email2, ...]`.\n\nReturn a list of accounts after merging accounts belonging to the same person. Two accounts belong to the same person if there is some common email between them.\n\nThe final list should be sorted by account name, and emails within each account should be sorted alphabetically.\n\n**Example 1:**\nInput: `accounts = [[\"John\",\"j@mail.com\",\"js@mail.com\"],[\"John\",\"jb@mail.com\"],[\"John\",\"js@mail.com\",\"jc@mail.com\"],[\"Mary\",\"m@mail.com\"]]`\nOutput: `[[\"John\",\"jb@mail.com\",\"jc@mail.com\",\"j@mail.com\",\"js@mail.com\"],[\"Mary\",\"m@mail.com\"]]`\nExplanation: The first and third John's accounts merge because they share \"js@mail.com\".\n\n**Constraints:**\n- 1 <= accounts.length <= 1000\n- 2 <= accounts[i].length <= 10\n- 1 <= accounts[i][j].length <= 30\n- `accounts[i][0]` consists of English letters.\n- `accounts[i][j]` (for j > 0) is a valid email.",
    "difficulty": "medium",
    "topics": [
      "Union Find",
      "Graph",
      "Depth-First Search",
      "String"
    ],
    "companies": [
      "Facebook",
      "Amazon",
      "Google",
      "Microsoft"
    ],
    "constraints": [
      "1 <= accounts.length <= 1000",
      "2 <= accounts[i].length <= 10",
      "accounts[i][0] consists of English letters.",
      "accounts[i][j] (for j > 0) is a valid email."
    ],
    "examples": [
      {
        "input": "[[\"John\",\"j@mail.com\",\"js@mail.com\"],[\"John\",\"jb@mail.com\"],[\"John\",\"js@mail.com\",\"jc@mail.com\"],[\"Mary\",\"m@mail.com\"]]",
        "output": "[[\"John\",\"jb@mail.com\",\"jc@mail.com\",\"j@mail.com\",\"js@mail.com\"],[\"Mary\",\"m@mail.com\"]]",
        "explanation": "John's accounts with \"js@mail.com\" are merged."
      }
    ],
    "testCases": [
      {
        "input": "[[\"John\",\"johnsmith@mail.com\",\"john_newyork@mail.com\"],[\"John\",\"johnsmith@mail.com\",\"john00@mail.com\"],[\"Mary\",\"mary@mail.com\"],[\"John\",\"johnnybravo@mail.com\"]]",
        "expectedOutput": "[[\"John\",\"john00@mail.com\",\"john_newyork@mail.com\",\"johnsmith@mail.com\"],[\"John\",\"johnnybravo@mail.com\"],[\"Mary\",\"mary@mail.com\"]]",
        "isHidden": false
      }
    ],
    "hints": [
      "This problem screams 'connected components'. Emails are nodes, and an account links all its emails together.",
      "Union-Find is a great fit.",
      "Create a Union-Find structure. You need a way to map each unique email to an integer ID.",
      "Also store a mapping `email -> name`.",
      "Iterate through `accounts`. For each account:\n  - Get the name and the first email (`email1`). Store `email -> name`.\n  - Iterate through the rest of the emails (`email_other`) in this account.\n  - Call `union(email1_id, email_other_id)`. Also store `email_other -> name`.",
      "After processing all accounts, create a map `componentRootId -> list_of_emails`.",
      "Iterate through all unique emails. Find the root `r = find(email_id)`. Add the email to the list `map[r]`.",
      "Finally, build the result. For each list of emails in the `componentRootId` map: get the name (using any email in the list and the `email -> name` map), sort the emails, and prepend the name."
    ],
    "solutions": [
      {
        "language": "javascript",
        "code": "// Assuming a UnionFind class is available (similar to previous problems)\n// UF constructor needs size, find(i), union(i, j)\n\nvar accountsMerge = function(accounts) {\n    const emailToId = new Map();\n    const idToEmail = new Map();\n    const emailToName = new Map();\n    let idCounter = 0;\n\n    // Preprocessing: Map emails to IDs and store email->name\n    for (const account of accounts) {\n        const name = account[0];\n        for (let i = 1; i < account.length; i++) {\n            const email = account[i];\n            if (!emailToId.has(email)) {\n                emailToId.set(email, idCounter);\n                idToEmail.set(idCounter, email);\n                idCounter++;\n            }\n            emailToName.set(email, name);\n        }\n    }\n\n    // Initialize Union-Find\n    const uf = new UnionFind(idCounter);\n\n    // Perform unions for emails within the same account\n    for (const account of accounts) {\n        const firstEmailId = emailToId.get(account[1]);\n        for (let i = 2; i < account.length; i++) {\n            const otherEmailId = emailToId.get(account[i]);\n            uf.union(firstEmailId, otherEmailId);\n        }\n    }\n\n    // Group emails by their component root ID\n    const mergedEmails = new Map(); // rootId -> Set<email>\n    for (const email of emailToId.keys()) {\n        const emailId = emailToId.get(email);\n        const rootId = uf.find(emailId);\n        if (!mergedEmails.has(rootId)) {\n            mergedEmails.set(rootId, new Set());\n        }\n        mergedEmails.get(rootId).add(email);\n    }\n\n    // Format the result\n    const result = [];\n    for (const emailSet of mergedEmails.values()) {\n        const sortedEmails = Array.from(emailSet).sort();\n        const name = emailToName.get(sortedEmails[0]); // Get name from any email\n        result.push([name, ...sortedEmails]);\n    }\n    \n    // Sort the final list by name (optional per description, but good practice)\n    // result.sort((a, b) => a[0].localeCompare(b[0]));\n\n    return result;\n};",
        "explanation": "This solution uses Union-Find. First, it preprocesses the accounts to map each unique email to an integer ID (`emailToId`, `idToEmail`) and also stores the name associated with each email (`emailToName`). It then initializes a Union-Find structure with the total number of unique emails. It iterates through the accounts again, performing `union` operations on the IDs of all emails belonging to the same account. After processing all accounts, emails belonging to the same person will be in the same set in the Union-Find structure. It then groups the emails based on their root ID using a map (`mergedEmails`). Finally, it formats the output: for each group of emails, it retrieves the name, sorts the emails alphabetically, and adds the `[name, ...sortedEmails]` list to the final `result`.",
        "timeComplexity": "O(N * K * log(NK) + N * K * \u03B1(NK))",
        "spaceComplexity": "O(N * K)"
      }
    ],
    "acceptanceRate": 50.1,
    "totalSubmissions": 6000,
    "correctSubmissions": 3006,
    "averageTime": 35
  },
  {
    "title": "Sliding Window Maximum",
    "description": "You are given an array of integers `nums`, there is a sliding window of size `k` which is moving from the very left of the array to the very right. You can only see the `k` numbers in the window. Each time the sliding window moves right by one position.\n\nReturn the max sliding window.\n\n**Example 1:**\nInput: nums = [1,3,-1,-3,5,3,6,7], k = 3\nOutput: [3,3,5,5,6,7]\nExplanation: Window position -> Max\n[1  3  -1] -3  5  3  6  7 -> 3\n 1 [3  -1  -3] 5  3  6  7 -> 3\n 1  3 [-1  -3  5] 3  6  7 -> 5\n 1  3  -1 [-3  5  3] 6  7 -> 5\n 1  3  -1  -3 [5  3  6] 7 -> 6\n 1  3  -1  -3  5 [3  6  7] -> 7\n\n**Constraints:**\n- 1 <= nums.length <= 10^5\n- -10^4 <= nums[i] <= 10^4\n- 1 <= k <= nums.length",
    "difficulty": "hard",
    "topics": [
      "Array",
      "Sliding Window",
      "Heap (Priority Queue)",
      "Monotonic Queue (Deque)"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Facebook",
      "Microsoft"
    ],
    "constraints": [
      "1 <= nums.length <= 10^5",
      "-10^4 <= nums[i] <= 10^4",
      "1 <= k <= nums.length"
    ],
    "examples": [
      {
        "input": "nums = [1,3,-1,-3,5,3,6,7], k = 3",
        "output": "[3,3,5,5,6,7]",
        "explanation": "Maximums for each window of size 3."
      },
      {
        "input": "nums = [1], k = 1",
        "output": "[1]"
      }
    ],
    "testCases": [
      {
        "input": "[1,3,-1,-3,5,3,6,7]\n3",
        "expectedOutput": "[3,3,5,5,6,7]",
        "isHidden": false
      },
      {
        "input": "[1]\n1",
        "expectedOutput": "[1]",
        "isHidden": false
      },
      {
        "input": "[9,11]\n2",
        "expectedOutput": "[11]",
        "isHidden": true
      }
    ],
    "hints": [
      "A naive solution is O(n*k). A max-heap is O(n log k). Can we do O(n)?",
      "Use a double-ended queue (Deque) to store *indices*.",
      "The deque should store indices in decreasing order of their corresponding values in `nums` (monotonic decreasing queue).",
      "Iterate through `nums` with index `i`.",
      "1. Clean the deque from the *front*: Remove indices from the front if they are outside the current window (`deque[0] <= i - k`).",
      "2. Clean the deque from the *back*: While the deque is not empty and `nums[i]` is greater than `nums[deque.back()]`, remove the index from the back (as it can never be the maximum anymore).",
      "3. Add the current index `i` to the back of the deque.",
      "4. If `i >= k - 1` (the window is fully formed), the maximum for this window is `nums[deque[0]]` (the front element). Add it to the result."
    ],
    "solutions": [
      {
        "language": "javascript",
        "code": "var maxSlidingWindow = function(nums, k) {\n    const result = [];\n    // Deque stores indices of potential max elements\n    // Values corresponding to indices are monotonically decreasing\n    const deque = []; \n\n    for (let i = 0; i < nums.length; i++) {\n        // 1. Remove indices from the front that are out of the window\n        while (deque.length > 0 && deque[0] <= i - k) {\n            deque.shift();\n        }\n\n        // 2. Remove indices from the back whose values are smaller than nums[i]\n        while (deque.length > 0 && nums[i] >= nums[deque[deque.length - 1]]) {\n            deque.pop();\n        }\n\n        // 3. Add the current index to the deque\n        deque.push(i);\n\n        // 4. If the window has reached size k, record the max (at the front)\n        if (i >= k - 1) {\n            result.push(nums[deque[0]]);\n        }\n    }\n\n    return result;\n};",
        "explanation": "This O(n) solution uses a Monotonic Decreasing Deque (Double-Ended Queue). The deque stores *indices* from `nums`, ensuring that the corresponding values `nums[deque[...]]` are always in decreasing order from front to back. When processing element `nums[i]`: 1. We remove indices from the *front* of the deque that are no longer within the sliding window. 2. We remove indices from the *back* whose corresponding values are less than or equal to `nums[i]` (because `nums[i]` is newer and larger, making the smaller elements irrelevant for future maximums). 3. We add the current index `i` to the back. 4. Once the window is fully formed (`i >= k - 1`), the maximum element for the current window is guaranteed to be at the *front* of the deque (`nums[deque[0]]`), which we add to the `result`.",
        "timeComplexity": "O(n)",
        "spaceComplexity": "O(k)"
      }
    ],
    "acceptanceRate": 45.3,
    "totalSubmissions": 10000,
    "correctSubmissions": 4530,
    "averageTime": 35
  },
  {
    "title": "Binary Tree Maximum Path Sum",
    "description": "A **path** in a binary tree is a sequence of nodes where each pair of adjacent nodes in the sequence has an edge connecting them. A node can only appear in the sequence **at most once**. Note that the path does not need to pass through the root.\n\nThe **path sum** of a path is the sum of the node's values in the path.\n\nGiven the `root` of a binary tree, return the maximum path sum of any **non-empty** path.\n\n**Example 1:**\nInput: root = [1,2,3]\nOutput: 6\nExplanation: The optimal path is 2 -> 1 -> 3 with sum 2 + 1 + 3 = 6.\n\n**Example 2:**\nInput: root = [-10,9,20,null,null,15,7]\nOutput: 42\nExplanation: The optimal path is 15 -> 20 -> 7 with sum 15 + 20 + 7 = 42.\n\n**Constraints:**\n- The number of nodes in the tree is in the range [1, 3 * 10^4].\n- -1000 <= Node.val <= 1000",
    "difficulty": "hard",
    "topics": [
      "Tree",
      "Depth-First Search",
      "Recursion"
    ],
    "companies": [
      "Google",
      "Facebook",
      "Amazon",
      "Microsoft"
    ],
    "constraints": [
      "The number of nodes in the tree is in the range [1, 3 * 10^4].",
      "-1000 <= Node.val <= 1000"
    ],
    "examples": [
      {
        "input": "root = [1,2,3]",
        "output": "6",
        "explanation": "Path 2 -> 1 -> 3 sums to 6."
      },
      {
        "input": "root = [-10,9,20,null,null,15,7]",
        "output": "42",
        "explanation": "Path 15 -> 20 -> 7 sums to 42."
      }
    ],
    "testCases": [
      {
        "input": "[1,2,3]",
        "expectedOutput": "6",
        "isHidden": false
      },
      {
        "input": "[-10,9,20,null,null,15,7]",
        "expectedOutput": "42",
        "isHidden": false
      },
      {
        "input": "[-3]",
        "expectedOutput": "-3",
        "isHidden": true
      }
    ],
    "hints": [
      "Use a recursive DFS (Postorder) approach.",
      "The key is what the recursive function should *return* vs what it *calculates* globally.",
      "Define `dfs(node)` that *returns* the maximum path sum starting at `node` and going *down* into *one* of its subtrees (or just the node itself if children paths are negative).",
      "Maintain a global `maxSum` variable.",
      "Inside `dfs(node)`:\n  1. Base case: `dfs(null)` returns 0.\n  2. Recursively get `leftMaxPath = dfs(node.left)` and `rightMaxPath = dfs(node.right)`.\n  3. Ignore negative paths from children: `leftMaxPath = max(0, leftMaxPath)` and `rightMaxPath = max(0, rightMaxPath)`.\n  4. Calculate the maximum path sum *passing through the current node* (potentially splitting): `currentPathSum = node.val + leftMaxPath + rightMaxPath`. Update `maxSum = max(maxSum, currentPathSum)`.",
      "5. Return the maximum path sum going *down* from this node: `node.val + max(leftMaxPath, rightMaxPath)`."
    ],
    "solutions": [
      {
        "language": "javascript",
        "code": "/**\n * Definition for a binary tree node.\n * function TreeNode(val, left, right) {\n * this.val = (val===undefined ? 0 : val)\n * this.left = (left===undefined ? null : left)\n * this.right = (right===undefined ? null : right)\n * }\n */\nvar maxPathSum = function(root) {\n    // Initialize with a very small number (or root.val if guaranteed non-empty)\n    let maxSum = -Infinity;\n\n    /**\n     * Helper DFS function.\n     * Returns the max path sum starting at 'node' and going downwards.\n     * Updates the global 'maxSum' if a path through 'node' is larger.\n     */\n    function dfs(node) {\n        if (node === null) {\n            return 0;\n        }\n\n        // 1. Recursively get max path sum from children\n        //    Ignore paths with negative sums by taking max(0, ...)\n        let leftMax = Math.max(0, dfs(node.left));\n        let rightMax = Math.max(0, dfs(node.right));\n\n        // 2. Update global maxSum: Check the path that includes the current node\n        //    and potentially *both* its left and right branches (the 'split')\n        maxSum = Math.max(maxSum, node.val + leftMax + rightMax);\n\n        // 3. Return the max path sum *going downwards* from this node\n        //    (cannot use both left and right branches for the return value)\n        return node.val + Math.max(leftMax, rightMax);\n    }\n\n    dfs(root);\n    return maxSum;\n};",
        "explanation": "This solution uses a DFS approach where the recursive helper `dfs(node)` returns the maximum path sum starting from `node` and going strictly downwards (into either the left or right subtree, but not both). It also maintains a global `maxSum`. Inside `dfs(node)`, it recursively gets the max downward paths from the left and right children (`leftMax`, `rightMax`), clamping them at 0 to ignore negative contributions. It then calculates the potential maximum path sum *passing through the current node* (`node.val + leftMax + rightMax`) and updates the global `maxSum`. Finally, it returns the maximum downward path from the current node, which is `node.val + Math.max(leftMax, rightMax)`. The final result is the global `maxSum` after the initial `dfs(root)` call.",
        "timeComplexity": "O(n)",
        "spaceComplexity": "O(h)"
      }
    ],
    "acceptanceRate": 36.9,
    "totalSubmissions": 10000,
    "correctSubmissions": 3690,
    "averageTime": 25
  },
  {
    "title": "Flatten Binary Tree to Linked List",
    "description": "Given the `root` of a binary tree, flatten the tree into a \"linked list\":\n\n- The \"linked list\" should use the same `TreeNode` class where the `right` child pointer points to the next node in the list and the `left` child pointer is always `null`.\n- The \"linked list\" should be in the same order as a **preorder** traversal of the binary tree.\n\nYou must do this in-place (modify the original tree).\n\n**Example 1:**\nInput: root = [1,2,5,3,4,null,6]\nOutput: [1,null,2,null,3,null,4,null,5,null,6]\n\n**Example 2:**\nInput: root = []\nOutput: []\n\n**Example 3:**\nInput: root = [0]\nOutput: [0]\n\n**Constraints:**\n- The number of nodes in the tree is in the range [0, 2000].\n- -100 <= Node.val <= 100",
    "difficulty": "medium",
    "topics": [
      "Tree",
      "Depth-First Search",
      "Linked List"
    ],
    "companies": [
      "Microsoft",
      "Amazon",
      "Facebook",
      "Google"
    ],
    "constraints": [
      "The number of nodes in the tree is in the range [0, 2000].",
      "-100 <= Node.val <= 100",
      "Must be in-place."
    ],
    "examples": [
      {
        "input": "root = [1,2,5,3,4,null,6]",
        "output": "[1,null,2,null,3,null,4,null,5,null,6]",
        "explanation": "The tree is flattened following a preorder traversal."
      }
    ],
    "testCases": [
      {
        "input": "[1,2,5,3,4,null,6]",
        "expectedOutput": "[1,null,2,null,3,null,4,null,5,null,6]",
        "isHidden": false
      },
      {
        "input": "[]",
        "expectedOutput": "[]",
        "isHidden": false
      }
    ],
    "hints": [
      "Think about the preorder traversal: Root, Left, Right.",
      "The flattened list should connect Root -> Flattened(Left) -> Flattened(Right).",
      "Use a recursive DFS approach. Define `flatten(node)`.",
      "Base case: `if (!node) return;`",
      "Recursively flatten the left and right subtrees first (postorder-like step).",
      "After flattening the children, store `node.right` (the original right subtree) in a temp variable.",
      "Set `node.right = node.left` (move flattened left subtree to the right).",
      "Set `node.left = null`.",
      "Find the *tail* of the newly attached right subtree (which was the flattened left subtree).",
      "Attach the original right subtree (from the temp variable) to this tail: `tail.right = originalRight`.",
      "Alternatively, a reverse preorder (Right, Left, Root) modification can work iteratively or recursively."
    ],
    "solutions": [
      {
        "language": "javascript",
        "code": "/**\n * Definition for a binary tree node.\n * function TreeNode(val, left, right) {\n * this.val = (val===undefined ? 0 : val)\n * this.left = (left===undefined ? null : left)\n * this.right = (right===undefined ? null : right)\n * }\n */\nvar flatten = function(root) {\n    if (!root) {\n        return;\n    }\n    \n    // Use a pointer to track the previously visited node in the 'flattened' part\n    let prev = null;\n\n    // Reverse Preorder Traversal (Right, Left, Root)\n    function dfs(node) {\n        if (!node) {\n            return;\n        }\n\n        // 1. Traverse Right subtree first\n        dfs(node.right);\n        // 2. Traverse Left subtree\n        dfs(node.left);\n\n        // 3. Process Root (make connections)\n        // Set the current node's right to the previously processed node\n        node.right = prev;\n        // Set the current node's left to null\n        node.left = null;\n        // Update prev to be the current node for the next iteration\n        prev = node;\n    }\n\n    dfs(root);\n};",
        "explanation": "This O(1) space solution uses a modified DFS traversal: Right, Left, Root (reverse preorder). It maintains a `prev` pointer, initially `null`, which points to the node processed *just before* the current one in this R-L-Root order. The `dfs` function recursively visits the right child, then the left child. When it processes the current `node` (after its children), it sets `node.right = prev` (linking it to the previously processed node which will be 'next' in the final flattened list), sets `node.left = null`, and updates `prev = node` to prepare for the next node up the recursion.",
        "timeComplexity": "O(n)",
        "spaceComplexity": "O(h)"
      }
    ],
    "acceptanceRate": 56.7,
    "totalSubmissions": 10000,
    "correctSubmissions": 5670,
    "averageTime": 15
  },
  {
    "title": "Construct Binary Tree from Inorder and Postorder Traversal",
    "description": "Given two integer arrays `inorder` and `postorder` where `inorder` is the inorder traversal of a binary tree and `postorder` is the postorder traversal of the same tree, construct and return the binary tree.\n\n**Example 1:**\nInput: inorder = [9,3,15,20,7], postorder = [9,15,7,20,3]\nOutput: [3,9,20,null,null,15,7]\n\n**Example 2:**\nInput: inorder = [-1], postorder = [-1]\nOutput: [-1]\n\n**Constraints:**\n- 1 <= inorder.length <= 3000\n- postorder.length == inorder.length\n- -3000 <= inorder[i], postorder[i] <= 3000\n- `inorder` and `postorder` consist of **unique** values.\n- Each value of `postorder` also appears in `inorder`.\n- `inorder` is guaranteed to be the inorder traversal of the tree.\n- `postorder` is guaranteed to be the postorder traversal of the tree.",
    "difficulty": "medium",
    "topics": [
      "Tree",
      "Recursion",
      "Hash Table"
    ],
    "companies": [
      "Amazon",
      "Microsoft",
      "Google"
    ],
    "constraints": [
      "1 <= inorder.length <= 3000",
      "postorder.length == inorder.length",
      "inorder and postorder consist of unique values."
    ],
    "examples": [
      {
        "input": "inorder = [9,3,15,20,7], postorder = [9,15,7,20,3]",
        "output": "[3,9,20,null,null,15,7]",
        "explanation": "Constructing the tree from the traversals."
      }
    ],
    "testCases": [
      {
        "input": "[9,3,15,20,7]\n[9,15,7,20,3]",
        "expectedOutput": "[3,9,20,null,null,15,7]",
        "isHidden": false
      },
      {
        "input": "[-1]\n[-1]",
        "expectedOutput": "[-1]",
        "isHidden": false
      }
    ],
    "hints": [
      "Similar to 'Construct from Preorder and Inorder', but use Postorder.",
      "The *last* element in `postorder` is always the root of the (sub)tree.",
      "Find this root value in the `inorder` array. This splits `inorder` into left and right subtrees.",
      "Use the size of the *right* subtree (from the `inorder` split) to know which elements in `postorder` belong to the right subtree.",
      "Use a recursive approach. Process `postorder` *backwards*.",
      "Crucially, build the *right* subtree first, then the *left* subtree, because you are consuming `postorder` from the end."
    ],
    "solutions": [
      {
        "language": "javascript",
        "code": "/**\n * Definition for a binary tree node.\n * function TreeNode(val, left, right) {\n * this.val = (val===undefined ? 0 : val)\n * this.left = (left===undefined ? null : left)\n * this.right = (right===undefined ? null : right)\n * }\n */\nvar buildTree = function(inorder, postorder) {\n    // 1. Create map for inorder indices\n    const inorderMap = new Map();\n    for (let i = 0; i < inorder.length; i++) {\n        inorderMap.set(inorder[i], i);\n    }\n\n    let postorderIndex = postorder.length - 1;\n\n    // 2. Recursive helper function\n    function build(inLeft, inRight) {\n        // Base case\n        if (inLeft > inRight) {\n            return null;\n        }\n\n        // a. Get root value from the *end* of postorder\n        const rootVal = postorder[postorderIndex];\n        postorderIndex--;\n        const root = new TreeNode(rootVal);\n\n        // b. Find root's index in inorder\n        const inIndex = inorderMap.get(rootVal);\n\n        // c. Recursively build subtrees\n        // MUST build right subtree first because we are consuming postorder from the end\n        root.right = build(inIndex + 1, inRight);\n        root.left = build(inLeft, inIndex - 1);\n\n        return root;\n    }\n\n    return build(0, inorder.length - 1);\n};",
        "explanation": "This solution is analogous to building from preorder and inorder. First, map inorder values to indices. We use a `postorderIndex` starting at the *end* of the `postorder` array, as the last element is the root. The `build(inLeft, inRight)` function defines the boundaries in the `inorder` array. It gets the `rootVal` by decrementing `postorderIndex`, finds its position `inIndex` in `inorder`, and then recursively builds the subtrees. Crucially, because `postorder` is Left-Right-Root, and we process it backwards (Root, Right, Left), we MUST build the `root.right` subtree *before* building the `root.left` subtree.",
        "timeComplexity": "O(n)",
        "spaceComplexity": "O(n)"
      }
    ],
    "acceptanceRate": 54.3,
    "totalSubmissions": 8000,
    "correctSubmissions": 4344,
    "averageTime": 24
  },
  {
    "title": "Count Primes",
    "description": "Given an integer `n`, return the number of prime numbers that are strictly less than `n`.\n\n**Example 1:**\nInput: n = 10\nOutput: 4\nExplanation: There are 4 prime numbers less than 10: 2, 3, 5, 7.\n\n**Example 2:**\nInput: n = 0\nOutput: 0\n\n**Example 3:**\nInput: n = 1\nOutput: 0\n\n**Constraints:**\n- 0 <= n <= 5 * 10^6",
    "difficulty": "easy",
    "topics": [
      "Math",
      "Number Theory",
      "Sieve of Eratosthenes"
    ],
    "companies": [
      "Amazon",
      "Microsoft",
      "Facebook"
    ],
    "constraints": [
      "0 <= n <= 5 * 10^6"
    ],
    "examples": [
      {
        "input": "n = 10",
        "output": "4",
        "explanation": "Primes < 10 are 2, 3, 5, 7."
      },
      {
        "input": "n = 0",
        "output": "0"
      },
      {
        "input": "n = 1",
        "output": "0"
      }
    ],
    "testCases": [
      {
        "input": "10",
        "expectedOutput": "4",
        "isHidden": false
      },
      {
        "input": "0",
        "expectedOutput": "0",
        "isHidden": false
      },
      {
        "input": "5000000",
        "expectedOutput": "348513",
        "isHidden": true
      }
    ],
    "hints": [
      "A simple approach is to iterate from 2 up to `n-1` and check if each number is prime. Checking primality naively takes O(sqrt(i)), leading to O(n * sqrt(n)). This might be too slow.",
      "Use the 'Sieve of Eratosthenes'.",
      "Create a boolean array `isPrime` of size `n`, initially all `true` (except 0 and 1).",
      "Iterate `p` from 2 up to `sqrt(n)`.",
      "If `isPrime[p]` is true, then `p` is prime.",
      "Mark all multiples of `p` (starting from `p*p`) as *not* prime (`isPrime[i] = false` for `i = p*p, p*p+p, ... < n`).",
      "Finally, count the number of `true` values in the `isPrime` array from index 2 upwards."
    ],
    "solutions": [
      {
        "language": "javascript",
        "code": "var countPrimes = function(n) {\n    if (n <= 2) {\n        return 0;\n    }\n\n    // isPrime[i] = true means 'i' is potentially prime\n    const isPrime = new Array(n).fill(true);\n    isPrime[0] = false;\n    isPrime[1] = false;\n\n    // Sieve of Eratosthenes\n    for (let p = 2; p * p < n; p++) {\n        // If p is prime (hasn't been marked false yet)\n        if (isPrime[p]) {\n            // Mark all multiples of p as not prime\n            // Start from p*p, as smaller multiples were already handled\n            for (let i = p * p; i < n; i += p) {\n                isPrime[i] = false;\n            }\n        }\n    }\n\n    // Count the primes\n    let count = 0;\n    for (let i = 2; i < n; i++) {\n        if (isPrime[i]) {\n            count++;\n        }\n    }\n\n    return count;\n};",
        "explanation": "This solution implements the Sieve of Eratosthenes. It creates a boolean array `isPrime` up to `n`, initialized to `true` (except for 0 and 1). It then iterates with `p` from 2 up to the square root of `n`. If `isPrime[p]` is still `true`, it means `p` is prime. We then mark all multiples of `p` (starting from `p*p` for optimization) as `false` in the `isPrime` array. After this process, the array correctly identifies all primes less than `n`. The final step is to iterate through the `isPrime` array (from 2 to `n-1`) and count how many entries are still `true`.",
        "timeComplexity": "O(n log log n)",
        "spaceComplexity": "O(n)"
      }
    ],
    "acceptanceRate": 32.5,
    "totalSubmissions": 10000,
    "correctSubmissions": 3250,
    "averageTime": 18
  },
  {
    "title": "Reconstruct Itinerary",
    "description": "You are given a list of airline `tickets` where `tickets[i] = [fromi, toi]` represent the departure and arrival airports of one flight. Reconstruct the itinerary in order and return it.\n\nAll of the tickets belong to a man who departs from `\"JFK\"`. Thus, the itinerary must begin with `\"JFK\"`.\n\nIf there are multiple valid itineraries, you should return the itinerary that has the smallest lexical order when read as a single string.\n\n**Example 1:**\nInput: tickets = [[\"MUC\",\"LHR\"],[\"JFK\",\"MUC\"],[\"SFO\",\"SJC\"],[\"LHR\",\"SFO\"]]\nOutput: [\"JFK\",\"MUC\",\"LHR\",\"SFO\",\"SJC\"]\n\n**Example 2:**\nInput: tickets = [[\"JFK\",\"SFO\"],[\"JFK\",\"ATL\"],[\"SFO\",\"ATL\"],[\"ATL\",\"JFK\"],[\"ATL\",\"SFO\"]]\nOutput: [\"JFK\",\"ATL\",\"JFK\",\"SFO\",\"ATL\",\"SFO\"]\nExplanation: Another possible reconstruction is [\"JFK\",\"SFO\",\"ATL\",\"JFK\",\"ATL\",\"SFO\"] but it is larger in lexical order.\n\n**Constraints:**\n- 1 <= tickets.length <= 300\n- `tickets[i].length == 2`\n- `fromi.length == 3`\n- `toi.length == 3`\n- `fromi` and `toi` consist of uppercase English letters.\n- `fromi != toi`",
    "difficulty": "medium",
    "topics": [
      "Graph",
      "Depth-First Search",
      "Eulerian Path"
    ],
    "companies": [
      "Google",
      "Facebook",
      "Amazon",
      "Microsoft"
    ],
    "constraints": [
      "1 <= tickets.length <= 300",
      "All airports are 3 letters.",
      "Itinerary starts at JFK.",
      "Return smallest lexical order if multiple paths."
    ],
    "examples": [
      {
        "input": "tickets = [[\"MUC\",\"LHR\"],[\"JFK\",\"MUC\"],[\"SFO\",\"SJC\"],[\"LHR\",\"SFO\"]]",
        "output": "[\"JFK\",\"MUC\",\"LHR\",\"SFO\",\"SJC\"]"
      },
      {
        "input": "tickets = [[\"JFK\",\"SFO\"],[\"JFK\",\"ATL\"],[\"SFO\",\"ATL\"],[\"ATL\",\"JFK\"],[\"ATL\",\"SFO\"]]",
        "output": "[\"JFK\",\"ATL\",\"JFK\",\"SFO\",\"ATL\",\"SFO\"]",
        "explanation": "Lexicographically smaller than the other path."
      }
    ],
    "testCases": [
      {
        "input": "[[\"MUC\",\"LHR\"],[\"JFK\",\"MUC\"],[\"SFO\",\"SJC\"],[\"LHR\",\"SFO\"]]",
        "expectedOutput": "[\"JFK\",\"MUC\",\"LHR\",\"SFO\",\"SJC\"]",
        "isHidden": false
      },
      {
        "input": "[[\"JFK\",\"SFO\"],[\"JFK\",\"ATL\"],[\"SFO\",\"ATL\"],[\"ATL\",\"JFK\"],[\"ATL\",\"SFO\"]]",
        "expectedOutput": "[\"JFK\",\"ATL\",\"JFK\",\"SFO\",\"ATL\",\"SFO\"]",
        "isHidden": false
      }
    ],
    "hints": [
      "This is finding an Eulerian Path in a directed graph.",
      "The airports are nodes, and tickets are directed edges.",
      "Since we need the lexicographically smallest path, when exploring neighbors, we should visit them in alphabetical order.",
      "Build an adjacency list (map `string -> list_of_strings`). **Sort** the lists of destinations alphabetically.",
      "Use Hierholzer's algorithm (a type of DFS).",
      "Start DFS from \"JFK\". Maintain the `result` path.",
      "When visiting a node `u`, iterate through its neighbors `v` (in sorted order). Recursively call `dfs(v)`. **Remove** the edge `u -> v` after visiting it (or mark it used).",
      "After visiting all neighbors of `u`, add `u` to the *front* of the `result` list (or add to end and reverse later)."
    ],
    "solutions": [
      {
        "language": "javascript",
        "code": "var findItinerary = function(tickets) {\n    // Build graph: Map<string, string[]> (adjacency list)\n    const graph = new Map();\n    for (const [from, to] of tickets) {\n        if (!graph.has(from)) {\n            graph.set(from, []);\n        }\n        graph.get(from).push(to);\n    }\n\n    // Sort destinations lexicographically\n    for (const destinations of graph.values()) {\n        destinations.sort();\n    }\n\n    const itinerary = [];\n\n    // Hierholzer's algorithm (DFS)\n    function dfs(airport) {\n        const destinations = graph.get(airport);\n        \n        // Visit neighbors in lexical order and 'remove' edge\n        while (destinations && destinations.length > 0) {\n            // Remove the first destination (smallest lexically)\n            const nextAirport = destinations.shift(); \n            dfs(nextAirport);\n        }\n        \n        // Add airport to the front after visiting all reachable nodes\n        itinerary.unshift(airport);\n    }\n\n    dfs(\"JFK\");\n    return itinerary;\n};",
        "explanation": "This solution finds the Eulerian path using Hierholzer's algorithm with DFS. First, it builds an adjacency list (`graph`) from the `tickets`, ensuring each list of destinations is sorted lexicographically. The `dfs` function starts at an `airport`. It retrieves the list of `destinations`. The `while` loop continues as long as there are unvisited destinations from the current airport. Inside the loop, it takes the *first* destination (`shift()`, which is the lexicographically smallest due to sorting), removes it from the list (effectively using the edge), and recursively calls `dfs` on that destination. Only *after* the loop finishes (meaning all paths from the current `airport` have been explored) is the `airport` added to the *front* of the `itinerary` using `unshift()`. Starting the DFS from \"JFK\" ensures the correct starting point.",
        "timeComplexity": "O(E log E + E)",
        "spaceComplexity": "O(V + E)"
      }
    ],
    "acceptanceRate": 40.1,
    "totalSubmissions": 6000,
    "correctSubmissions": 2406,
    "averageTime": 28
  },
  {
    "title": "Plus One",
    "description": "You are given a large integer represented as an integer array `digits`, where each `digits[i]` is the `i`-th digit of the integer. The digits are ordered from most significant to least significant in left-to-right order. The large integer does not contain any leading 0's.\n\nIncrement the large integer by one and return the resulting array of digits.\n\n**Example 1:**\nInput: digits = [1,2,3]\nOutput: [1,2,4]\nExplanation: The array represents 123. 123 + 1 = 124.\n\n**Example 2:**\nInput: digits = [4,3,2,1]\nOutput: [4,3,2,2]\n\n**Example 3:**\nInput: digits = [9]\nOutput: [1,0]\n\n**Constraints:**\n- 1 <= digits.length <= 100\n- 0 <= digits[i] <= 9\n- `digits` does not contain any leading 0's.",
    "difficulty": "easy",
    "topics": [
      "Array",
      "Math"
    ],
    "companies": [
      "Google",
      "Amazon",
      "Microsoft"
    ],
    "constraints": [
      "1 <= digits.length <= 100",
      "0 <= digits[i] <= 9",
      "No leading zeros."
    ],
    "examples": [
      {
        "input": "digits = [1,2,3]",
        "output": "[1,2,4]",
        "explanation": "123 + 1 = 124"
      },
      {
        "input": "digits = [9]",
        "output": "[1,0]",
        "explanation": "9 + 1 = 10"
      },
      {
        "input": "digits = [9,9]",
        "output": "[1,0,0]",
        "explanation": "99 + 1 = 100"
      }
    ],
    "testCases": [
      {
        "input": "[1,2,3]",
        "expectedOutput": "[1,2,4]",
        "isHidden": false
      },
      {
        "input": "[4,3,2,1]",
        "expectedOutput": "[4,3,2,2]",
        "isHidden": false
      },
      {
        "input": "[9]",
        "expectedOutput": "[1,0]",
        "isHidden": false
      },
      {
        "input": "[6,1,4,5,3,9,0,1,9,5,1,8,6,7,0,5,5,4,3]",
        "expectedOutput": "[6,1,4,5,3,9,0,1,9,5,1,8,6,7,0,5,5,4,4]",
        "isHidden": true
      }
    ],
    "hints": [
      "Simulate the addition process like you would do on paper.",
      "Start from the *least* significant digit (the end of the array).",
      "Add 1 to the last digit.",
      "If the digit becomes 10, set it to 0 and carry over 1 to the next digit to the left.",
      "Repeat this process, moving left.",
      "If you finish iterating and still have a carry, it means you need to insert a 1 at the beginning of the array."
    ],
    "solutions": [
      {
        "language": "javascript",
        "code": "var plusOne = function(digits) {\n    const n = digits.length;\n\n    // Iterate from right to left\n    for (let i = n - 1; i >= 0; i--) {\n        // Increment the current digit\n        digits[i]++;\n\n        // Check if there's a carry\n        if (digits[i] < 10) {\n            // No carry, we are done\n            return digits;\n        } else {\n            // Carry occurred, set digit to 0 and continue to the left\n            digits[i] = 0;\n        }\n    }\n\n    // If we reach here, it means the loop finished with a carry\n    // (e.g., input was [9] or [9,9])\n    // We need to add a '1' at the beginning.\n    digits.unshift(1);\n    return digits;\n};",
        "explanation": "This solution simulates grade-school addition. It iterates through the `digits` array from right to left (least significant to most significant). It increments the rightmost digit. If that digit becomes 10, it sets it to 0 and 'carries over' by letting the loop continue to the next digit to the left, which will then be incremented. If a digit is incremented and is *less* than 10, there's no carry, and the process is complete, so the modified `digits` array is returned. If the loop finishes (meaning all digits were 9s and became 0s), there is still a carry, so we insert a 1 at the beginning of the array using `unshift()`.",
        "timeComplexity": "O(n)",
        "spaceComplexity": "O(1)"
      }
    ],
    "acceptanceRate": 43.1,
    "totalSubmissions": 22000,
    "correctSubmissions": 9482,
    "averageTime": 9
  },
  {
    "title": "Excel Sheet Column Number",
    "description": "Given a string `columnTitle` that represents the column title as appear in an Excel sheet, return its corresponding column number.\n\nFor example:\nA -> 1\nB -> 2\nC -> 3\n...\nZ -> 26\nAA -> 27\nAB -> 28\n...\n\n**Example 1:**\nInput: columnTitle = \"A\"\nOutput: 1\n\n**Example 2:**\nInput: columnTitle = \"AB\"\nOutput: 28\n\n**Example 3:**\nInput: columnTitle = \"ZY\"\nOutput: 701\n\n**Constraints:**\n- 1 <= columnTitle.length <= 7\n- `columnTitle` consists only of uppercase English letters.\n- `columnTitle` is in the range [\"A\", \"FXSHRXW\"].",
    "difficulty": "easy",
    "topics": [
      "String",
      "Math"
    ],
    "companies": [
      "Microsoft",
      "Amazon",
      "Facebook"
    ],
    "constraints": [
      "1 <= columnTitle.length <= 7",
      "columnTitle consists only of uppercase English letters."
    ],
    "examples": [
      {
        "input": "columnTitle = \"A\"",
        "output": "1"
      },
      {
        "input": "columnTitle = \"AB\"",
        "output": "28",
        "explanation": "A=1, B=2. (1 * 26^1) + (2 * 26^0) = 26 + 2 = 28"
      },
      {
        "input": "columnTitle = \"ZY\"",
        "output": "701",
        "explanation": "Z=26, Y=25. (26 * 26^1) + (25 * 26^0) = 676 + 25 = 701"
      }
    ],
    "testCases": [
      {
        "input": "\"A\"",
        "expectedOutput": "1",
        "isHidden": false
      },
      {
        "input": "\"AB\"",
        "expectedOutput": "28",
        "isHidden": false
      },
      {
        "input": "\"ZY\"",
        "expectedOutput": "701",
        "isHidden": false
      }
    ],
    "hints": [
      "This is like converting a base-26 number system to base-10.",
      "The 'digits' are A=1, B=2, ..., Z=26.",
      "Iterate through the string from left to right.",
      "Maintain a `result`. In each step, multiply the `result` by 26 and add the value of the current character.",
      "The value of a character `char` is `char.charCodeAt(0) - 'A'.charCodeAt(0) + 1`."
    ],
    "solutions": [
      {
        "language": "javascript",
        "code": "var titleToNumber = function(columnTitle) {\n    let result = 0;\n    const baseCode = 'A'.charCodeAt(0);\n\n    for (let i = 0; i < columnTitle.length; i++) {\n        const char = columnTitle[i];\n        // Get the value of the character (A=1, B=2, ...)\n        const charValue = char.charCodeAt(0) - baseCode + 1;\n        \n        // Multiply previous result by 26 (shift left in base-26)\n        // and add the current character's value\n        result = result * 26 + charValue;\n    }\n\n    return result;\n};",
        "explanation": "This solution treats the Excel column title as a base-26 number system where 'A' is 1, 'B' is 2, ..., 'Z' is 26. It iterates through the `columnTitle` string from left to right. In each iteration, it calculates the numeric `charValue` (1-26) for the current character. It then updates the `result` by multiplying the existing `result` by 26 (effectively shifting digits left in base-26) and adding the `charValue`. This process correctly converts the base-26 representation to a base-10 integer.",
        "timeComplexity": "O(n)",
        "spaceComplexity": "O(1)"
      }
    ],
    "acceptanceRate": 57.8,
    "totalSubmissions": 9000,
    "correctSubmissions": 5202,
    "averageTime": 10
  },
  {
    "title": "Factorial Trailing Zeroes",
    "description": "Given an integer `n`, return the number of trailing zeroes in `n!`.\n\nNote that `n!` = n * (n - 1) * (n - 2) * ... * 3 * 2 * 1.\n\n**Example 1:**\nInput: n = 3\nOutput: 0\nExplanation: 3! = 6, no trailing zero.\n\n**Example 2:**\nInput: n = 5\nOutput: 1\nExplanation: 5! = 120, one trailing zero.\n\n**Constraints:**\n- 0 <= n <= 10^4\n\n**Follow up:** Could you write a solution that works in logarithmic time complexity?",
    "difficulty": "easy",
    "topics": [
      "Math"
    ],
    "companies": [
      "Amazon",
      "Microsoft",
      "Bloomberg"
    ],
    "constraints": [
      "0 <= n <= 10^4"
    ],
    "examples": [
      {
        "input": "n = 3",
        "output": "0",
        "explanation": "3! = 6"
      },
      {
        "input": "n = 5",
        "output": "1",
        "explanation": "5! = 120"
      },
      {
        "input": "n = 10",
        "output": "2",
        "explanation": "10! = 3628800"
      }
    ],
    "testCases": [
      {
        "input": "3",
        "expectedOutput": "0",
        "isHidden": false
      },
      {
        "input": "5",
        "expectedOutput": "1",
        "isHidden": false
      },
      {
        "input": "30",
        "expectedOutput": "7",
        "isHidden": true
      }
    ],
    "hints": [
      "Calculating `n!` directly will overflow very quickly.",
      "Trailing zeroes are formed by factors of 10 in the factorial.",
      "A factor of 10 comes from a pair of prime factors: 2 and 5.",
      "In any factorial `n!`, the number of factors of 2 will always be greater than or equal to the number of factors of 5.",
      "Therefore, the number of trailing zeroes is determined solely by the number of factors of 5 in the prime factorization of `n!`.",
      "How many factors of 5 are there in `n!`? It's `floor(n/5) + floor(n/25) + floor(n/125) + ...`."
    ],
    "solutions": [
      {
        "language": "javascript",
        "code": "var trailingZeroes = function(n) {\n    let count = 0;\n    // Count factors of 5, 25, 125, etc.\n    while (n >= 5) {\n        n = Math.floor(n / 5);\n        count += n;\n    }\n    return count;\n};",
        "explanation": "This solution directly calculates the number of factors of 5 in n! based on the hint. Trailing zeros in n! are created by pairs of prime factors 2 and 5. Since factors of 2 are always more abundant than factors of 5, the number of zeros is limited by the number of 5s. We count the multiples of 5 (n/5), then multiples of 25 (n/25) which contribute an extra factor of 5, then multiples of 125 (n/125), and so on. The loop `while (n >= 5)` efficiently sums these counts (`count += Math.floor(n / 5)`) by repeatedly dividing `n` by 5.",
        "timeComplexity": "O(log n)",
        "spaceComplexity": "O(1)"
      }
    ],
    "acceptanceRate": 39.7,
    "totalSubmissions": 8000,
    "correctSubmissions": 3176,
    "averageTime": 9
  },
  {
    "title": "Rectangle Area",
    "description": "Given the coordinates of two rectilinear rectangles in a 2D plane, return the total area covered by the two rectangles.\n\nThe first rectangle is defined by its bottom-left corner `(ax1, ay1)` and its top-right corner `(ax2, ay2)`.\n\nThe second rectangle is defined by its bottom-left corner `(bx1, by1)` and its top-right corner `(bx2, by2)`.\n\n**Example 1:**\nInput: ax1 = -3, ay1 = 0, ax2 = 3, ay2 = 4, bx1 = 0, by1 = -1, bx2 = 9, by2 = 2\nOutput: 45\n\n**Example 2:**\nInput: ax1 = -2, ay1 = -2, ax2 = 2, ay2 = 2, bx1 = -2, by1 = -2, bx2 = 2, by2 = 2\nOutput: 16\n\n**Constraints:**\n- -10^4 <= ax1, ay1, ax2, ay2, bx1, by1, bx2, by2 <= 10^4",
    "difficulty": "medium",
    "topics": [
      "Math",
      "Geometry"
    ],
    "companies": [
      "Microsoft",
      "Amazon"
    ],
    "constraints": [
      "-10^4 <= Coordinates <= 10^4"
    ],
    "examples": [
      {
        "input": "ax1 = -3, ay1 = 0, ax2 = 3, ay2 = 4, bx1 = 0, by1 = -1, bx2 = 9, by2 = 2",
        "output": "45",
        "explanation": "Area1 = (3 - (-3)) * (4 - 0) = 6 * 4 = 24. Area2 = (9 - 0) * (2 - (-1)) = 9 * 3 = 27. Overlap width = min(ax2, bx2) - max(ax1, bx1) = min(3, 9) - max(-3, 0) = 3 - 0 = 3. Overlap height = min(ay2, by2) - max(ay1, by1) = min(4, 2) - max(0, -1) = 2 - 0 = 2. Overlap area = 3 * 2 = 6. Total area = 24 + 27 - 6 = 45."
      },
      {
        "input": "ax1 = -2, ay1 = -2, ax2 = 2, ay2 = 2, bx1 = -2, by1 = -2, bx2 = 2, by2 = 2",
        "output": "16",
        "explanation": "Rectangles are identical. Area = 4 * 4 = 16. Overlap is 16. Total = 16 + 16 - 16 = 16."
      }
    ],
    "testCases": [
      {
        "input": "-3\n0\n3\n4\n0\n-1\n9\n2",
        "expectedOutput": "45",
        "isHidden": false
      },
      {
        "input": "-2\n-2\n2\n2\n-2\n-2\n2\n2",
        "expectedOutput": "16",
        "isHidden": false
      },
      {
        "input": "0\n0\n0\n0\n-1\n-1\n1\n1",
        "expectedOutput": "4",
        "isHidden": true
      }
    ],
    "hints": [
      "The total area is `Area1 + Area2 - OverlapArea`.",
      "Calculate `Area1` and `Area2` easily: `(x2 - x1) * (y2 - y1)`.",
      "How to find the `OverlapArea`?",
      "The overlap exists only if the rectangles intersect.",
      "The width of the overlap is `max(0, min(ax2, bx2) - max(ax1, bx1))`.",
      "The height of the overlap is `max(0, min(ay2, by2) - max(ay1, by1))`.",
      "Multiply the overlap width and height to get `OverlapArea`."
    ],
    "solutions": [
      {
        "language": "javascript",
        "code": "var computeArea = function(ax1, ay1, ax2, ay2, bx1, by1, bx2, by2) {\n    // Calculate individual areas\n    const area1 = (ax2 - ax1) * (ay2 - ay1);\n    const area2 = (bx2 - bx1) * (by2 - by1);\n\n    // Calculate overlap dimensions\n    const overlapX = Math.max(0, Math.min(ax2, bx2) - Math.max(ax1, bx1));\n    const overlapY = Math.max(0, Math.min(ay2, by2) - Math.max(ay1, by1));\n\n    // Calculate overlap area\n    const overlapArea = overlapX * overlapY;\n\n    // Total area is sum minus overlap\n    return area1 + area2 - overlapArea;\n};",
        "explanation": "This solution follows the principle of inclusion-exclusion. It first calculates the individual areas of the two rectangles (`area1`, `area2`). Then, it calculates the dimensions of the overlapping region. The width of the overlap (`overlapX`) is the difference between the minimum of the right edges (`min(ax2, bx2)`) and the maximum of the left edges (`max(ax1, bx1)`). If this difference is negative, there is no horizontal overlap, so we take `max(0, ...)` Similarly, the height (`overlapY`) is `max(0, min(ay2, by2) - max(ay1, by1))`. The overlap area is `overlapX * overlapY`. The final result is `area1 + area2 - overlapArea`.",
        "timeComplexity": "O(1)",
        "spaceComplexity": "O(1)"
      }
    ],
    "acceptanceRate": 43.1,
    "totalSubmissions": 5000,
    "correctSubmissions": 2155,
    "averageTime": 10
  },
  {
    "title": "Find Peak Element",
    "description": "A peak element is an element that is strictly greater than its neighbors.\n\nGiven an integer array `nums`, find a peak element, and return its index. If the array contains multiple peaks, return the index to any of the peaks.\n\nYou may imagine that `nums[-1] = nums[n] = -∞`.\n\nYou must write an algorithm that runs in O(log n) time.\n\n**Example 1:**\nInput: nums = [1,2,3,1]\nOutput: 2\nExplanation: 3 is a peak element and your function should return the index number 2.\n\n**Example 2:**\nInput: nums = [1,2,1,3,5,6,4]\nOutput: 5\nExplanation: Your function can return either index number 1 where the peak element is 2, or index number 5 where the peak element is 6.\n\n**Constraints:**\n- 1 <= nums.length <= 1000\n- -2^31 <= nums[i] <= 2^31 - 1\n- `nums[i] != nums[i + 1]` for all valid `i`.",
    "difficulty": "medium",
    "topics": [
      "Array",
      "Binary Search"
    ],
    "companies": [
      "Facebook",
      "Google",
      "Amazon",
      "Microsoft"
    ],
    "constraints": [
      "1 <= nums.length <= 1000",
      "-2^31 <= nums[i] <= 2^31 - 1",
      "nums[i] != nums[i + 1] for all valid i.",
      "Must run in O(log n) time."
    ],
    "examples": [
      {
        "input": "nums = [1,2,3,1]",
        "output": "2",
        "explanation": "3 at index 2 is a peak."
      },
      {
        "input": "nums = [1,2,1,3,5,6,4]",
        "output": "5",
        "explanation": "6 at index 5 is a peak. 2 at index 1 is also a peak."
      }
    ],
    "testCases": [
      {
        "input": "[1,2,3,1]",
        "expectedOutput": "2",
        "isHidden": false
      },
      {
        "input": "[1,2,1,3,5,6,4]",
        "expectedOutput": "5",
        "isHidden": false
      },
      {
        "input": "[1]",
        "expectedOutput": "0",
        "isHidden": true
      }
    ],
    "hints": [
      "The O(log n) requirement strongly suggests Binary Search.",
      "Consider the middle element `nums[mid]`. Compare it with its right neighbor `nums[mid + 1]`.",
      "If `nums[mid] < nums[mid + 1]`, it means a peak must exist to the *right* of `mid` (because the numbers are increasing). Search the right half.",
      "If `nums[mid] > nums[mid + 1]`, it means `mid` *could* be a peak, or a peak exists to the *left* of `mid`. Search the left half (including `mid`).",
      "Handle edge cases for the first and last elements."
    ],
    "solutions": [
      {
        "language": "javascript",
        "code": "var findPeakElement = function(nums) {\n    let left = 0;\n    let right = nums.length - 1;\n\n    while (left < right) {\n        let mid = left + Math.floor((right - left) / 2);\n\n        // Compare mid with its right neighbor\n        if (nums[mid] < nums[mid + 1]) {\n            // The peak must be to the right (uphill slope)\n            left = mid + 1;\n        } else {\n            // Mid is potentially a peak, or the peak is to the left\n            // (downhill slope or mid is the peak)\n            right = mid;\n        }\n    }\n    // When left === right, we've found a peak\n    return left;\n};",
        "explanation": "This solution uses binary search. We compare the middle element `nums[mid]` with its right neighbor `nums[mid + 1]`. If `nums[mid]` is smaller, we know the sequence is increasing at `mid`, so a peak *must* exist somewhere to the right. We update `left = mid + 1`. If `nums[mid]` is greater than or equal to `nums[mid + 1]` (since adjacent elements are distinct, it must be greater), it means `mid` is either a peak itself or is on the descending slope of a peak to its left. In this case, we narrow the search to the left half, *including* `mid` itself, by setting `right = mid`. The loop terminates when `left` and `right` converge, pointing to a peak index.",
        "timeComplexity": "O(log n)",
        "spaceComplexity": "O(1)"
      }
    ],
    "acceptanceRate": 44.5,
    "totalSubmissions": 10000,
    "correctSubmissions": 4450,
    "averageTime": 12
  },
  {
    "title": "Spiral Matrix II",
    "description": "Given a positive integer `n`, generate an `n x n` matrix filled with elements from 1 to `n^2` in spiral order.\n\n**Example 1:**\nInput: n = 3\nOutput: [[1,2,3],[8,9,4],[7,6,5]]\n\n**Example 2:**\nInput: n = 1\nOutput: [[1]]\n\n**Constraints:**\n- 1 <= n <= 20",
    "difficulty": "medium",
    "topics": [
      "Array",
      "Matrix",
      "Simulation"
    ],
    "companies": [
      "Amazon",
      "Microsoft",
      "Apple"
    ],
    "constraints": [
      "1 <= n <= 20"
    ],
    "examples": [
      {
        "input": "n = 3",
        "output": "[[1,2,3],[8,9,4],[7,6,5]]",
        "explanation": "Fills a 3x3 matrix spirally from 1 to 9."
      },
      {
        "input": "n = 1",
        "output": "[[1]]",
        "explanation": "A 1x1 matrix."
      }
    ],
    "testCases": [
      {
        "input": "3",
        "expectedOutput": "[[1,2,3],[8,9,4],[7,6,5]]",
        "isHidden": false
      },
      {
        "input": "1",
        "expectedOutput": "[[1]]",
        "isHidden": false
      },
      {
        "input": "4",
        "expectedOutput": "[[1,2,3,4],[12,13,14,5],[11,16,15,6],[10,9,8,7]]",
        "isHidden": true
      }
    ],
    "hints": [
      "This is the reverse of 'Spiral Matrix I'. You need to simulate the spiral path and fill numbers.",
      "Initialize an `n x n` matrix with zeros.",
      "Maintain boundary variables: `top`, `bottom`, `left`, `right`.",
      "Maintain a `currentNumber` counter, starting from 1.",
      "Loop while `left <= right` and `top <= bottom`.",
      "Inside the loop, perform the 4 passes (Right, Down, Left, Up), filling the matrix cells with `currentNumber` and incrementing it.",
      "Update the boundaries after each pass."
    ],
    "solutions": [
      {
        "language": "javascript",
        "code": "var generateMatrix = function(n) {\n    // Initialize nxn matrix with 0s\n    const matrix = new Array(n).fill(0).map(() => new Array(n).fill(0));\n    \n    let num = 1;\n    let top = 0, bottom = n - 1;\n    let left = 0, right = n - 1;\n\n    while (left <= right && top <= bottom) {\n        // 1. Traverse Right\n        for (let i = left; i <= right; i++) {\n            matrix[top][i] = num++;\n        }\n        top++;\n\n        // 2. Traverse Down\n        for (let i = top; i <= bottom; i++) {\n            matrix[i][right] = num++;\n        }\n        right--;\n\n        // Check boundary conditions before traversing back\n        if (top <= bottom) {\n            // 3. Traverse Left\n            for (let i = right; i >= left; i--) {\n                matrix[bottom][i] = num++;\n            }\n            bottom--;\n        }\n\n        if (left <= right) {\n            // 4. Traverse Up\n            for (let i = bottom; i >= top; i--) {\n                matrix[i][left] = num++;\n            }\n            left++;\n        }\n    }\n\n    return matrix;\n};",
        "explanation": "This solution simulates the spiral filling process. It initializes an `n x n` matrix with zeros and sets up boundary variables (`top`, `bottom`, `left`, `right`) and a counter `num = 1`. The `while` loop continues as long as the boundaries haven't crossed. Inside, it performs four `for` loops to fill one layer: first right, then down, then left, then up. In each loop, it assigns the current `num` to the matrix cell and increments `num`. After each traversal direction, the corresponding boundary is updated (e.g., `top++` after traversing right). Boundary checks (`top <= bottom` and `left <= right`) are included before the left and up traversals to handle cases where the spiral collapses to a single row or column.",
        "timeComplexity": "O(n^2)",
        "spaceComplexity": "O(n^2)"
      }
    ],
    "acceptanceRate": 61.2,
    "totalSubmissions": 7000,
    "correctSubmissions": 4284,
    "averageTime": 11
  },
  {
    "title": "Rotate List",
    "description": "Given the `head` of a linked list, rotate the list to the right by `k` places.\n\n**Example 1:**\nInput: head = [1,2,3,4,5], k = 2\nOutput: [4,5,1,2,3]\n\n**Example 2:**\nInput: head = [0,1,2], k = 4\nOutput: [2,0,1]\n\n**Constraints:**\n- The number of nodes in the list is in the range `[0, 500]`.\n- -100 <= Node.val <= 100\n- 0 <= k <= 2 * 10^9",
    "difficulty": "medium",
    "topics": [
      "Linked List",
      "Two Pointers"
    ],
    "companies": [
      "Amazon",
      "Microsoft",
      "Apple"
    ],
    "constraints": [
      "The number of nodes in the list is in the range [0, 500].",
      "-100 <= Node.val <= 100",
      "0 <= k <= 2 * 10^9"
    ],
    "examples": [
      {
        "input": "head = [1,2,3,4,5], k = 2",
        "output": "[4,5,1,2,3]",
        "explanation": "Rotate 1: [5,1,2,3,4], Rotate 2: [4,5,1,2,3]"
      },
      {
        "input": "head = [0,1,2], k = 4",
        "output": "[2,0,1]",
        "explanation": "Rotate 1: [2,0,1], Rotate 2: [1,2,0], Rotate 3: [0,1,2], Rotate 4: [2,0,1]"
      }
    ],
    "testCases": [
      {
        "input": "[1,2,3,4,5]\n2",
        "expectedOutput": "[4,5,1,2,3]",
        "isHidden": false
      },
      {
        "input": "[0,1,2]\n4",
        "expectedOutput": "[2,0,1]",
        "isHidden": false
      },
      {
        "input": "[]\n0",
        "expectedOutput": "[]",
        "isHidden": true
      }
    ],
    "hints": [
      "First, handle edge cases: empty list, list with one node, or k=0.",
      "Calculate the length `n` of the list.",
      "Normalize `k`: `k = k % n`. If `k` becomes 0, no rotation is needed.",
      "Connect the tail of the list to the head to form a cycle.",
      "Find the new tail: it's the node at position `n - k - 1` from the original head.",
      "The new head is the node *after* the new tail.",
      "Break the cycle by setting `newTail.next = null`.",
      "Return the `newHead`."
    ],
    "solutions": [
      {
        "language": "javascript",
        "code": "/**\n * Definition for singly-linked list.\n * function ListNode(val, next) {\n * this.val = (val===undefined ? 0 : val)\n * this.next = (next===undefined ? null : next)\n * }\n */\nvar rotateRight = function(head, k) {\n    if (!head || !head.next || k === 0) {\n        return head;\n    }\n\n    // 1. Calculate length and find the tail\n    let length = 1;\n    let tail = head;\n    while (tail.next) {\n        tail = tail.next;\n        length++;\n    }\n\n    // 2. Normalize k\n    k = k % length;\n    if (k === 0) {\n        return head; // No rotation needed\n    }\n\n    // 3. Find the new tail (node before the new head)\n    // The new head will be at index length - k.\n    // The new tail will be at index length - k - 1.\n    let newTail = head;\n    for (let i = 0; i < length - k - 1; i++) {\n        newTail = newTail.next;\n    }\n\n    // 4. Perform the rotation\n    const newHead = newTail.next;\n    newTail.next = null; // Break the list\n    tail.next = head;    // Connect original tail to original head\n\n    return newHead;\n};",
        "explanation": "This solution efficiently rotates the list. First, it handles edge cases. Then, it iterates once to find the `length` of the list and the `tail` node. It normalizes `k` using modulo `length`. If `k` is 0, no rotation is needed. Otherwise, it finds the `newTail`, which is the node at index `length - k - 1`. The node *after* `newTail` becomes the `newHead`. The list is rotated by setting `newTail.next = null` (breaking the list) and connecting the original `tail.next = head` (forming a temporary cycle before the break). Finally, `newHead` is returned.",
        "timeComplexity": "O(n)",
        "spaceComplexity": "O(1)"
      }
    ],
    "acceptanceRate": 35.1,
    "totalSubmissions": 10000,
    "correctSubmissions": 3510,
    "averageTime": 13
  },
  {
    "title": "Remove Duplicates from Sorted List",
    "description": "Given the `head` of a sorted linked list, delete all duplicates such that each element appears only once. Return the linked list sorted as well.\n\n**Example 1:**\nInput: head = [1,1,2]\nOutput: [1,2]\n\n**Example 2:**\nInput: head = [1,1,2,3,3]\nOutput: [1,2,3]\n\n**Constraints:**\n- The number of nodes in the list is in the range [0, 300].\n- -100 <= Node.val <= 100\n- The list is guaranteed to be sorted in ascending order.",
    "difficulty": "easy",
    "topics": [
      "Linked List"
    ],
    "companies": [
      "Amazon",
      "Microsoft",
      "Apple"
    ],
    "constraints": [
      "The number of nodes in the list is in the range [0, 300].",
      "-100 <= Node.val <= 100",
      "The list is guaranteed to be sorted."
    ],
    "examples": [
      {
        "input": "head = [1,1,2]",
        "output": "[1,2]",
        "explanation": "The duplicate 1 is removed."
      },
      {
        "input": "head = [1,1,2,3,3]",
        "output": "[1,2,3]",
        "explanation": "Duplicate 1 and 3 are removed."
      }
    ],
    "testCases": [
      {
        "input": "[1,1,2]",
        "expectedOutput": "[1,2]",
        "isHidden": false
      },
      {
        "input": "[1,1,2,3,3]",
        "expectedOutput": "[1,2,3]",
        "isHidden": false
      },
      {
        "input": "[]",
        "expectedOutput": "[]",
        "isHidden": true
      },
      {
        "input": "[1,1,1]",
        "expectedOutput": "[1]",
        "isHidden": true
      }
    ],
    "hints": [
      "Iterate through the linked list with a single pointer `current`.",
      "Check if `current.next` exists and if `current.val == current.next.val`.",
      "If they are equal, it's a duplicate. 'Skip' the next node by setting `current.next = current.next.next`.",
      "If they are not equal, move to the next node: `current = current.next`."
    ],
    "solutions": [
      {
        "language": "javascript",
        "code": "/**\n * Definition for singly-linked list.\n * function ListNode(val, next) {\n * this.val = (val===undefined ? 0 : val)\n * this.next = (next===undefined ? null : next)\n * }\n */\nvar deleteDuplicates = function(head) {\n    let current = head;\n    \n    while (current !== null && current.next !== null) {\n        if (current.val === current.next.val) {\n            // Duplicate found, skip the next node\n            current.next = current.next.next;\n            // Don't advance 'current' yet, \n            // check if the new 'current.next' is also a duplicate\n        } else {\n            // No duplicate, advance to the next node\n            current = current.next;\n        }\n    }\n    \n    return head;\n};",
        "explanation": "This solution iterates through the sorted list using a single pointer `current`. In each step of the `while` loop, it checks if the next node exists and has the same value as the current node. If a duplicate is found (`current.val === current.next.val`), it removes the duplicate by setting `current.next = current.next.next`. Crucially, it does *not* advance `current` in this case, because the *new* `current.next` might also be a duplicate (e.g., [1,1,1]). If the values are different, it means the current node is unique relative to the next, so it advances `current` to `current.next`.",
        "timeComplexity": "O(n)",
        "spaceComplexity": "O(1)"
      }
    ],
    "acceptanceRate": 48.3,
    "totalSubmissions": 12000,
    "correctSubmissions": 5796,
    "averageTime": 10
  },
  {
    "title": "Remove Duplicates from Sorted List II",
    "description": "Given the `head` of a sorted linked list, delete all nodes that have duplicate numbers, leaving only distinct numbers from the original list. Return the linked list sorted as well.\n\n**Example 1:**\nInput: head = [1,2,3,3,4,4,5]\nOutput: [1,2,5]\n\n**Example 2:**\nInput: head = [1,1,1,2,3]\nOutput: [2,3]\n\n**Constraints:**\n- The number of nodes in the list is in the range [0, 300].\n- -100 <= Node.val <= 100\n- The list is guaranteed to be sorted in ascending order.",
    "difficulty": "medium",
    "topics": [
      "Linked List",
      "Two Pointers"
    ],
    "companies": [
      "Amazon",
      "Microsoft",
      "Facebook"
    ],
    "constraints": [
      "The number of nodes in the list is in the range [0, 300].",
      "-100 <= Node.val <= 100",
      "The list is guaranteed to be sorted."
    ],
    "examples": [
      {
        "input": "head = [1,2,3,3,4,4,5]",
        "output": "[1,2,5]",
        "explanation": "Nodes with values 3 and 4 are completely removed."
      },
      {
        "input": "head = [1,1,1,2,3]",
        "output": "[2,3]",
        "explanation": "All nodes with value 1 are removed."
      }
    ],
    "testCases": [
      {
        "input": "[1,2,3,3,4,4,5]",
        "expectedOutput": "[1,2,5]",
        "isHidden": false
      },
      {
        "input": "[1,1,1,2,3]",
        "expectedOutput": "[2,3]",
        "isHidden": false
      },
      {
        "input": "[]",
        "expectedOutput": "[]",
        "isHidden": true
      },
      {
        "input": "[1,1]",
        "expectedOutput": "[]",
        "isHidden": true
      }
    ],
    "hints": [
      "This is harder than version I because you need to remove *all* nodes with duplicate values.",
      "Use a `dummy` head node to simplify handling cases where the original head needs to be removed.",
      "Use a `prev` pointer (starting at `dummy`) and a `curr` pointer (starting at `head`).",
      "Iterate `curr`. If `curr.next` exists and `curr.val == curr.next.val`, it means `curr` is part of a sequence of duplicates.",
      "Enter an inner loop: while `curr.next` exists and `curr.val == curr.next.val`, advance `curr` until you find the *last* node in the duplicate sequence.",
      "Now, `prev.next` needs to skip over this entire sequence: `prev.next = curr.next`.",
      "If `curr.val` was *not* equal to `curr.next.val` (or `curr.next` didn't exist), it means `curr` is unique. Simply advance `prev`: `prev = prev.next`.",
      "Always advance `curr = curr.next` in the outer loop."
    ],
    "solutions": [
      {
        "language": "javascript",
        "code": "/**\n * Definition for singly-linked list.\n * function ListNode(val, next) {\n * this.val = (val===undefined ? 0 : val)\n * this.next = (next===undefined ? null : next)\n * }\n */\nvar deleteDuplicates = function(head) {\n    // Dummy node to handle edge cases like removing the head\n    const dummy = new ListNode(0, head);\n    let prev = dummy;\n    let curr = head;\n\n    while (curr) {\n        // Check if it's the start of a duplicate sequence\n        if (curr.next && curr.val === curr.next.val) {\n            // Skip all nodes with the same value\n            while (curr.next && curr.val === curr.next.val) {\n                curr = curr.next;\n            }\n            // Link the previous node to the node *after* the duplicate sequence\n            prev.next = curr.next;\n        } else {\n            // No duplicate found, move 'prev' forward\n            prev = prev.next;\n        }\n        // Always move 'curr' forward\n        curr = curr.next;\n    }\n\n    return dummy.next;\n};",
        "explanation": "This solution uses a `dummy` head and two pointers, `prev` and `curr`. `prev` always points to the last node that is guaranteed to be unique and part of the final list. `curr` iterates through the list. If `curr` encounters the start of a duplicate sequence (`curr.next && curr.val === curr.next.val`), an inner loop advances `curr` until it points to the *last* node of that duplicate sequence. Then, `prev.next` is set to `curr.next`, effectively removing the entire sequence from the list being built. If `curr` is *not* part of a duplicate sequence, we simply advance `prev` to `curr`. `curr` is always advanced in the outer loop.",
        "timeComplexity": "O(n)",
        "spaceComplexity": "O(1)"
      }
    ],
    "acceptanceRate": 39.8,
    "totalSubmissions": 10000,
    "correctSubmissions": 3980,
    "averageTime": 14
  },
  {
    "title": "Partition List",
    "description": "Given the `head` of a linked list and a value `x`, partition it such that all nodes less than `x` come before nodes greater than or equal to `x`.\n\nYou should preserve the original relative order of the nodes in each of the two partitions.\n\n**Example 1:**\nInput: head = [1,4,3,2,5,2], x = 3\nOutput: [1,2,2,4,3,5]\n\n**Example 2:**\nInput: head = [2,1], x = 2\nOutput: [1,2]\n\n**Constraints:**\n- The number of nodes in the list is in the range [0, 200].\n- -100 <= Node.val <= 100\n- -200 <= x <= 200",
    "difficulty": "medium",
    "topics": [
      "Linked List",
      "Two Pointers"
    ],
    "companies": [
      "Microsoft",
      "Amazon",
      "Facebook"
    ],
    "constraints": [
      "The number of nodes in the list is in the range [0, 200].",
      "-100 <= Node.val <= 100",
      "-200 <= x <= 200"
    ],
    "examples": [
      {
        "input": "head = [1,4,3,2,5,2], x = 3",
        "output": "[1,2,2,4,3,5]",
        "explanation": "Nodes < 3 (1,2,2) come first, maintaining order. Nodes >= 3 (4,3,5) come after, maintaining order."
      },
      {
        "input": "head = [2,1], x = 2",
        "output": "[1,2]",
        "explanation": "Node < 2 (1) comes first. Node >= 2 (2) comes after."
      }
    ],
    "testCases": [
      {
        "input": "[1,4,3,2,5,2]\n3",
        "expectedOutput": "[1,2,2,4,3,5]",
        "isHidden": false
      },
      {
        "input": "[2,1]\n2",
        "expectedOutput": "[1,2]",
        "isHidden": false
      },
      {
        "input": "[1]\n0",
        "expectedOutput": "[1]",
        "isHidden": true
      }
    ],
    "hints": [
      "We need to create two separate linked lists.",
      "One list (`before`) will store nodes with values less than `x`.",
      "The other list (`after`) will store nodes with values greater than or equal to `x`.",
      "Use dummy heads for both lists (`beforeHead`, `afterHead`) and tail pointers (`beforeTail`, `afterTail`).",
      "Iterate through the original list. If `node.val < x`, append it to the `before` list. Otherwise, append it to the `after` list.",
      "After iterating, connect the end of the `before` list to the beginning of the `after` list (`beforeTail.next = afterHead.next`).",
      "Set the end of the `after` list to null (`afterTail.next = null`).",
      "Return `beforeHead.next`."
    ],
    "solutions": [
      {
        "language": "javascript",
        "code": "/**\n * Definition for singly-linked list.\n * function ListNode(val, next) {\n * this.val = (val===undefined ? 0 : val)\n * this.next = (next===undefined ? null : next)\n * }\n */\nvar partition = function(head, x) {\n    // Dummy heads for the two partitions\n    const beforeHead = new ListNode(0);\n    const afterHead = new ListNode(0);\n    \n    // Tail pointers for the two partitions\n    let beforeTail = beforeHead;\n    let afterTail = afterHead;\n    \n    let curr = head;\n    while (curr) {\n        if (curr.val < x) {\n            // Append to the 'before' list\n            beforeTail.next = curr;\n            beforeTail = beforeTail.next;\n        } else {\n            // Append to the 'after' list\n            afterTail.next = curr;\n            afterTail = afterTail.next;\n        }\n        curr = curr.next;\n    }\n    \n    // Connect the 'before' list to the 'after' list\n    beforeTail.next = afterHead.next;\n    \n    // Terminate the 'after' list\n    afterTail.next = null;\n    \n    return beforeHead.next;\n};",
        "explanation": "This solution creates two new linked lists using dummy heads (`beforeHead`, `afterHead`) and tail pointers (`beforeTail`, `afterTail`). It iterates through the original list using `curr`. If `curr.val < x`, the node is appended to the `before` list (by updating `beforeTail.next` and `beforeTail`). Otherwise, it's appended to the `after` list. After the loop, the `before` list contains all nodes less than `x` in their original order, and `after` contains all nodes greater than or equal to `x` in order. We then connect the end of the `before` list (`beforeTail.next`) to the start of the `after` list (`afterHead.next`). We must also set the end of the combined list to null (`afterTail.next = null`). The head of the new partitioned list is `beforeHead.next`.",
        "timeComplexity": "O(n)",
        "spaceComplexity": "O(1)"
      }
    ],
    "acceptanceRate": 47.1,
    "totalSubmissions": 7000,
    "correctSubmissions": 3297,
    "averageTime": 12
  },
  {
    "title": "Maximum Depth of N-ary Tree",
    "description": "Given an n-ary tree, find its maximum depth.\n\nThe maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.\n\nN-ary-Tree input serialization is represented in their level order traversal, each group of children is separated by the null value.\n\n**Example 1:**\nInput: root = [1,null,3,2,4,null,5,6]\nOutput: 3\n\n**Example 2:**\nInput: root = [1,null,2,3,4,5,null,null,6,7,null,8,null,9,10,null,null,11,null,12,null,13,null,null,14]\nOutput: 5\n\n**Constraints:**\n- The total number of nodes is in the range [0, 10^4].\n- The depth of the n-ary tree is less than or equal to 1000.\n- Node values are integers.",
    "difficulty": "easy",
    "topics": [
      "Tree",
      "Depth-First Search",
      "Breadth-First Search"
    ],
    "companies": [
      "Amazon",
      "Microsoft",
      "Facebook"
    ],
    "constraints": [
      "The total number of nodes is in the range [0, 10^4].",
      "The depth of the n-ary tree is less than or equal to 1000."
    ],
    "examples": [
      {
        "input": "root = [1,null,3,2,4,null,5,6]",
        "output": "3",
        "explanation": "Longest path is 1 -> 3 -> 5 (or 6)."
      },
      {
        "input": "root = [1,null,2,3,4,5,null,...,14]",
        "output": "5"
      }
    ],
    "testCases": [
      {
        "input": "[1,null,3,2,4,null,5,6]",
        "expectedOutput": "3",
        "isHidden": false
      },
      {
        "input": "[1,null,2,3,4,5,null,null,6,7,null,8,null,9,10,null,null,11,null,12,null,13,null,null,14]",
        "expectedOutput": "5",
        "isHidden": false
      },
      {
        "input": "[]",
        "expectedOutput": "0",
        "isHidden": true
      }
    ],
    "hints": [
      "This is very similar to 'Maximum Depth of Binary Tree'.",
      "Use recursion (DFS).",
      "Base case: If `root` is null, depth is 0.",
      "Recursive step: Find the depth of *all* children. The depth of the current node is `1 + max(depth_of_child1, depth_of_child2, ...)`."
    ],
    "solutions": [
      {
        "language": "javascript",
        "code": "/**\n * // Definition for a Node.\n * function Node(val, children) {\n * this.val = val;\n * this.children = children;\n * };\n */\n\nvar maxDepth = function(root) {\n    if (root === null) {\n        return 0;\n    }\n    \n    let maxChildDepth = 0;\n    if (root.children) {\n        for (const child of root.children) {\n            maxChildDepth = Math.max(maxChildDepth, maxDepth(child));\n        }\n    }\n    \n    // Depth is 1 (for the current node) + max depth of its children\n    return 1 + maxChildDepth;\n};",
        "explanation": "This solution uses a recursive Depth-First Search approach, analogous to the binary tree version. The base case is when `root` is null, returning 0. For a non-null node, it initializes `maxChildDepth` to 0. It then iterates through all `child` nodes in `root.children`, recursively calling `maxDepth(child)` for each and updating `maxChildDepth` with the maximum depth found among the children. Finally, it returns `1 + maxChildDepth`.",
        "timeComplexity": "O(n)",
        "spaceComplexity": "O(h)"
      }
    ],
    "acceptanceRate": 69.1,
    "totalSubmissions": 6000,
    "correctSubmissions": 4146,
    "averageTime": 10
  },
  {
    "title": "Binary Tree Paths",
    "description": "Given the `root` of a binary tree, return all root-to-leaf paths in any order.\n\nA leaf is a node with no children.\n\n**Example 1:**\nInput: root = [1,2,3,null,5]\nOutput: [\"1->2->5\", \"1->3\"]\n\n**Example 2:**\nInput: root = [1]\nOutput: [\"1\"]\n\n**Constraints:**\n- The number of nodes in the tree is in the range [1, 100].\n- -100 <= Node.val <= 100",
    "difficulty": "easy",
    "topics": [
      "Tree",
      "Depth-First Search",
      "Backtracking",
      "String"
    ],
    "companies": [
      "Facebook",
      "Google",
      "Amazon",
      "Apple"
    ],
    "constraints": [
      "The number of nodes in the tree is in the range [1, 100].",
      "-100 <= Node.val <= 100"
    ],
    "examples": [
      {
        "input": "root = [1,2,3,null,5]",
        "output": "[\"1->2->5\", \"1->3\"]",
        "explanation": "Paths are 1->2->5 and 1->3."
      },
      {
        "input": "root = [1]",
        "output": "[\"1\"]",
        "explanation": "Path is just the root."
      }
    ],
    "testCases": [
      {
        "input": "[1,2,3,null,5]",
        "expectedOutput": "[\"1->2->5\",\"1->3\"]",
        "isHidden": false
      },
      {
        "input": "[1]",
        "expectedOutput": "[\"1\"]",
        "isHidden": false
      }
    ],
    "hints": [
      "Use DFS (recursion) with backtracking.",
      "Maintain the `currentPath` (can be a string or an array).",
      "Define `dfs(node, currentPath)`.",
      "Base case: If `node` is null, return.",
      "Add `node.val` to `currentPath`.",
      "If `node` is a leaf (`!node.left && !node.right`), format `currentPath` into the required string format (e.g., join with '->') and add it to the results.",
      "Recursive step: Call `dfs(node.left, ...)` and `dfs(node.right, ...)`.",
      "Backtrack: If using an array for `currentPath`, remove the last element after the recursive calls return."
    ],
    "solutions": [
      {
        "language": "javascript",
        "code": "/**\n * Definition for a binary tree node.\n * function TreeNode(val, left, right) {\n * this.val = (val===undefined ? 0 : val)\n * this.left = (left===undefined ? null : left)\n * this.right = (right===undefined ? null : right)\n * }\n */\nvar binaryTreePaths = function(root) {\n    const results = [];\n\n    /**\n     * @param {TreeNode} node\n     * @param {string} currentPathString - Path built so far\n     */\n    function dfs(node, currentPathString) {\n        if (!node) {\n            return;\n        }\n\n        // Append current node value to path\n        const pathAddition = currentPathString ? `->${node.val}` : `${node.val}`;\n        const newPath = currentPathString + pathAddition;\n\n        // If it's a leaf node, add the completed path\n        if (!node.left && !node.right) {\n            results.push(newPath);\n            return;\n        }\n\n        // Recurse on children\n        if (node.left) {\n            dfs(node.left, newPath);\n        }\n        if (node.right) {\n            dfs(node.right, newPath);\n        }\n    }\n\n    dfs(root, \"\");\n    return results;\n};",
        "explanation": "This solution uses Depth-First Search (DFS) recursively. The `dfs` function takes the current `node` and the `currentPathString` built so far. If the node is null, it returns. Otherwise, it appends the current node's value to the path string (handling the '->' separator). If the current node is a leaf (no children), the complete path string is added to the `results`. If it's not a leaf, the `dfs` function is called recursively on the left and right children, passing the updated path string. No explicit backtracking step (like `pop()`) is needed because strings are immutable in JavaScript; new strings are created in each recursive call.",
        "timeComplexity": "O(n)",
        "spaceComplexity": "O(h)"
      }
    ],
    "acceptanceRate": 55.4,
    "totalSubmissions": 9000,
    "correctSubmissions": 4986,
    "averageTime": 11
  },
  {
    "title": "Sum Root to Leaf Numbers",
    "description": "You are given the `root` of a binary tree containing digits from 0 to 9 only.\n\nEach root-to-leaf path in the tree represents a number. For example, the root-to-leaf path `1 -> 2 -> 3` represents the number `123`.\n\nReturn the total sum of all root-to-leaf numbers.\n\nA leaf node is a node with no children.\n\n**Example 1:**\nInput: root = [1,2,3]\nOutput: 25\nExplanation: 1->2 represents 12. 1->3 represents 13. Sum = 12 + 13 = 25.\n\n**Example 2:**\nInput: root = [4,9,0,5,1]\nOutput: 1026\nExplanation: 4->9->5 represents 495. 4->9->1 represents 491. 4->0 represents 40. Sum = 495 + 491 + 40 = 1026.\n\n**Constraints:**\n- The number of nodes in the tree is in the range [1, 1000].\n- 0 <= Node.val <= 9\n- The depth of the tree will not exceed 10.",
    "difficulty": "medium",
    "topics": [
      "Tree",
      "Depth-First Search"
    ],
    "companies": [
      "Facebook",
      "Amazon",
      "Google",
      "Microsoft"
    ],
    "constraints": [
      "The number of nodes in the tree is in the range [1, 1000].",
      "0 <= Node.val <= 9",
      "Depth will not exceed 10."
    ],
    "examples": [
      {
        "input": "root = [1,2,3]",
        "output": "25",
        "explanation": "Paths 1->2 (12) and 1->3 (13). Sum = 12 + 13 = 25."
      },
      {
        "input": "root = [4,9,0,5,1]",
        "output": "1026",
        "explanation": "Paths 4->9->5 (495), 4->9->1 (491), 4->0 (40). Sum = 1026."
      }
    ],
    "testCases": [
      {
        "input": "[1,2,3]",
        "expectedOutput": "25",
        "isHidden": false
      },
      {
        "input": "[4,9,0,5,1]",
        "expectedOutput": "1026",
        "isHidden": false
      },
      {
        "input": "[0]",
        "expectedOutput": "0",
        "isHidden": true
      }
    ],
    "hints": [
      "Use DFS (recursion).",
      "Pass the `currentNumber` formed so far down the recursive calls.",
      "Define `dfs(node, currentNumber)`.",
      "Base case: If `node` is null, return 0.",
      "Calculate the `newNumber = currentNumber * 10 + node.val`.",
      "If `node` is a leaf (`!node.left && !node.right`), return `newNumber`.",
      "Recursive step: Return `dfs(node.left, newNumber) + dfs(node.right, newNumber)`."
    ],
    "solutions": [
      {
        "language": "javascript",
        "code": "/**\n * Definition for a binary tree node.\n * function TreeNode(val, left, right) {\n * this.val = (val===undefined ? 0 : val)\n * this.left = (left===undefined ? null : left)\n * this.right = (right===undefined ? null : right)\n * }\n */\nvar sumNumbers = function(root) {\n    \n    /**\n     * @param {TreeNode} node\n     * @param {number} currentNum - The number formed by the path so far\n     * @returns {number} - The sum of all root-to-leaf numbers in this subtree\n     */\n    function dfs(node, currentNum) {\n        if (node === null) {\n            return 0;\n        }\n\n        // Calculate the number represented by the path ending at this node\n        const newNum = currentNum * 10 + node.val;\n\n        // If it's a leaf node, this path is complete, return its number\n        if (node.left === null && node.right === null) {\n            return newNum;\n        }\n\n        // If not a leaf, recursively calculate sum from children\n        return dfs(node.left, newNum) + dfs(node.right, newNum);\n    }\n\n    return dfs(root, 0);\n};",
        "explanation": "This solution uses a recursive Depth-First Search approach. The `dfs` function takes the current `node` and the `currentNum` formed along the path from the root to the parent of `node`. If the `node` is null, it contributes 0 to the sum. Otherwise, it calculates the `newNum` by appending the current node's digit (`newNum = currentNum * 10 + node.val`). If the node is a leaf, this `newNum` represents a complete root-to-leaf number, so it's returned. If it's not a leaf, the function returns the sum of the results from recursively calling `dfs` on its left and right children, passing the `newNum` down.",
        "timeComplexity": "O(n)",
        "spaceComplexity": "O(h)"
      }
    ],
    "acceptanceRate": 49.9,
    "totalSubmissions": 8000,
    "correctSubmissions": 3992,
    "averageTime": 12
  },
  {
    "title": "Path Sum III",
    "description": "Given the `root` of a binary tree and an integer `targetSum`, return the number of paths where the sum of the values along the path equals `targetSum`.\n\nThe path does not need to start or end at the root or a leaf, but it must go downwards (traveling only from parent nodes to child nodes).\n\n**Example 1:**\nInput: root = [10,5,-3,3,2,null,11,3,-2,null,1], targetSum = 8\nOutput: 3\nExplanation: Paths: 5 -> 3, 5 -> 2 -> 1, -3 -> 11.\n\n**Example 2:**\nInput: root = [5,4,8,11,null,13,4,7,2,null,null,5,1], targetSum = 22\nOutput: 3\n\n**Constraints:**\n- The number of nodes in the tree is in the range [0, 1000].\n- -10^9 <= Node.val <= 10^9\n- -1000 <= targetSum <= 1000",
    "difficulty": "medium",
    "topics": [
      "Tree",
      "Depth-First Search",
      "Prefix Sum"
    ],
    "companies": [
      "Facebook",
      "Amazon",
      "Microsoft",
      "Google"
    ],
    "constraints": [
      "The number of nodes in the tree is in the range [0, 1000].",
      "-10^9 <= Node.val <= 10^9",
      "-1000 <= targetSum <= 1000"
    ],
    "examples": [
      {
        "input": "root = [10,5,-3,3,2,null,11,3,-2,null,1], targetSum = 8",
        "output": "3",
        "explanation": "Paths summing to 8: [5, 3], [5, 2, 1], [-3, 11]"
      },
      {
        "input": "root = [5,4,8,11,null,13,4,7,2,null,null,5,1], targetSum = 22",
        "output": "3",
        "explanation": "Paths summing to 22: [5, 4, 11, 2], [5, 8, 4, 5], [4, 11, 7]"
      }
    ],
    "testCases": [
      {
        "input": "[10,5,-3,3,2,null,11,3,-2,null,1]\n8",
        "expectedOutput": "3",
        "isHidden": false
      },
      {
        "input": "[5,4,8,11,null,13,4,7,2,null,null,5,1]\n22",
        "expectedOutput": "3",
        "isHidden": false
      },
      {
        "input": "[1,-2,-3]\n-1",
        "expectedOutput": "1",
        "isHidden": true
      }
    ],
    "hints": [
      "A naive DFS from every node would be O(n^2) or O(n log n).",
      "Think about prefix sums along paths from the root.",
      "Let `currentSum` be the sum from the root to the current node.",
      "If a path ending at the current node has a sum equal to `targetSum`, then `currentSum - previousSum = targetSum`, where `previousSum` is the sum from the root to some ancestor of the current node.",
      "This means `previousSum = currentSum - targetSum`.",
      "Use a DFS approach. Pass down the `currentSum`. Maintain a hash map `prefixSums` that stores `{sum -> count}` encountered on the path *from the root to the current node*.",
      "In `dfs(node, currentSum)`:\n  1. Update `currentSum += node.val`.\n  2. Check how many times `currentSum - targetSum` exists in `prefixSums`. Add this count to the global `result`.\n  3. Increment the count for `currentSum` in `prefixSums`.\n  4. Recurse on children: `dfs(node.left, currentSum)` and `dfs(node.right, currentSum)`.\n  5. **Backtrack**: Decrement the count for `currentSum` in `prefixSums` before returning."
    ],
    "solutions": [
      {
        "language": "javascript",
        "code": "/**\n * Definition for a binary tree node.\n * function TreeNode(val, left, right) {\n * this.val = (val===undefined ? 0 : val)\n * this.left = (left===undefined ? null : left)\n * this.right = (right===undefined ? null : right)\n * }\n */\nvar pathSum = function(root, targetSum) {\n    let count = 0;\n    // Map: prefixSum -> frequency\n    const prefixSums = new Map();\n    // Base case for paths starting at the root\n    prefixSums.set(0, 1);\n\n    /**\n     * @param {TreeNode} node\n     * @param {number} currentSum - Sum from root to current node\n     */\n    function dfs(node, currentSum) {\n        if (!node) {\n            return;\n        }\n\n        // 1. Update current path sum\n        currentSum += node.val;\n\n        // 2. Check if a path ending here sums to targetSum\n        // This means currentSum - (some previous sum) = targetSum\n        // or (some previous sum) = currentSum - targetSum\n        count += prefixSums.get(currentSum - targetSum) || 0;\n\n        // 3. Update prefix sum count for the current path\n        prefixSums.set(currentSum, (prefixSums.get(currentSum) || 0) + 1);\n\n        // 4. Recurse on children\n        dfs(node.left, currentSum);\n        dfs(node.right, currentSum);\n\n        // 5. Backtrack: Remove current sum from the map for this path\n        prefixSums.set(currentSum, prefixSums.get(currentSum) - 1);\n    }\n\n    dfs(root, 0);\n    return count;\n};",
        "explanation": "This O(n) solution uses the concept of prefix sums combined with DFS. A hash map `prefixSums` stores the frequency of all prefix sums encountered on the path from the root down to the current node. The `dfs` function calculates the `currentSum` for the path ending at `node`. The key insight is that if a path ending at `node` sums to `targetSum`, then `currentSum - previousSum = targetSum` for some ancestor's prefix sum `previousSum`. Therefore, we check how many times the value `currentSum - targetSum` exists in our `prefixSums` map and add that to our global `count`. We then update the count for `currentSum` in the map, recurse on the children, and finally backtrack by decrementing the count for `currentSum` as we return up the call stack.",
        "timeComplexity": "O(n)",
        "spaceComplexity": "O(h)"
      }
    ],
    "acceptanceRate": 47.1,
    "totalSubmissions": 9000,
    "correctSubmissions": 4239,
    "averageTime": 20
  },
  {
    "title": "Surrounded Regions",
    "description": "Given an `m x n` matrix `board` containing 'X' and 'O', capture all regions surrounded by 'X'.\n\nA region is captured by flipping all 'O's into 'X's in that surrounded region.\n\nA region is surrounded if all 'O's in it are completely surrounded by 'X's (i.e., none are on the border).\n\n**Example 1:**\nInput: board = [[\"X\",\"X\",\"X\",\"X\"],[\"X\",\"O\",\"O\",\"X\"],[\"X\",\"X\",\"O\",\"X\"],[\"X\",\"O\",\"X\",\"X\"]]\nOutput: [[\"X\",\"X\",\"X\",\"X\"],[\"X\",\"X\",\"X\",\"X\"],[\"X\",\"X\",\"X\",\"X\"],[\"X\",\"O\",\"X\",\"X\"]]\nExplanation: The 'O' at (3,1) is not surrounded because it's connected to an 'O' on the border (implicitly).\n\n**Constraints:**\n- m == board.length\n- n == board[i].length\n- 1 <= m, n <= 200\n- `board[i][j]` is 'X' or 'O'.",
    "difficulty": "medium",
    "topics": [
      "Matrix",
      "Depth-First Search",
      "Breadth-First Search",
      "Union Find"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Facebook",
      "Microsoft"
    ],
    "constraints": [
      "m == board.length",
      "n == board[i].length",
      "1 <= m, n <= 200",
      "board[i][j] is 'X' or 'O'."
    ],
    "examples": [
      {
        "input": "board = [[\"X\",\"X\",\"X\",\"X\"],[\"X\",\"O\",\"O\",\"X\"],[\"X\",\"X\",\"O\",\"X\"],[\"X\",\"O\",\"X\",\"X\"]]",
        "output": "[[\"X\",\"X\",\"X\",\"X\"],[\"X\",\"X\",\"X\",\"X\"],[\"X\",\"X\",\"X\",\"X\"],[\"X\",\"O\",\"X\",\"X\"]]",
        "explanation": "Only the bottom 'O' remains as it touches the border (implicitly)."
      }
    ],
    "testCases": [
      {
        "input": "[[\"X\",\"X\",\"X\",\"X\"],[\"X\",\"O\",\"O\",\"X\"],[\"X\",\"X\",\"O\",\"X\"],[\"X\",\"O\",\"X\",\"X\"]]",
        "expectedOutput": "[[\"X\",\"X\",\"X\",\"X\"],[\"X\",\"X\",\"X\",\"X\"],[\"X\",\"X\",\"X\",\"X\"],[\"X\",\"O\",\"X\",\"X\"]]",
        "isHidden": false
      },
      {
        "input": "[[\"X\"]]",
        "expectedOutput": "[[\"X\"]]",
        "isHidden": true
      }
    ],
    "hints": [
      "Instead of finding surrounded 'O's, find the 'O's that are *not* surrounded.",
      "An 'O' is *not* surrounded if it is on the border or if it is connected (via other 'O's) to an 'O' on the border.",
      "Start a DFS or BFS from *every* 'O' on the four borders of the grid.",
      "Mark all reachable 'O's from the borders with a temporary marker (e.g., 'T').",
      "After the traversal(s) are complete, iterate through the entire grid:",
      " - If a cell is 'O' (meaning it wasn't reached from the border), flip it to 'X'.",
      " - If a cell is 'T', flip it back to 'O'."
    ],
    "solutions": [
      {
        "language": "javascript",
        "code": "var solve = function(board) {\n    if (!board || board.length === 0) return;\n    const ROWS = board.length;\n    const COLS = board[0].length;\n\n    // DFS function to mark reachable 'O's from borders\n    function dfs(r, c) {\n        if (r < 0 || c < 0 || r >= ROWS || c >= COLS || board[r][c] !== 'O') {\n            return;\n        }\n        board[r][c] = 'T'; // Mark as temporary/visited\n        dfs(r + 1, c);\n        dfs(r - 1, c);\n        dfs(r, c + 1);\n        dfs(r, c - 1);\n    }\n\n    // 1. Run DFS from all 'O's on the borders\n    // Top and Bottom rows\n    for (let c = 0; c < COLS; c++) {\n        if (board[0][c] === 'O') dfs(0, c);\n        if (board[ROWS - 1][c] === 'O') dfs(ROWS - 1, c);\n    }\n    // Left and Right columns (avoid double-checking corners)\n    for (let r = 1; r < ROWS - 1; r++) {\n        if (board[r][0] === 'O') dfs(r, 0);\n        if (board[r][COLS - 1] === 'O') dfs(r, COLS - 1);\n    }\n\n    // 2. Flip remaining 'O's to 'X' and 'T's back to 'O'\n    for (let r = 0; r < ROWS; r++) {\n        for (let c = 0; c < COLS; c++) {\n            if (board[r][c] === 'O') {\n                board[r][c] = 'X'; // Captured\n            }\n            if (board[r][c] === 'T') {\n                board[r][c] = 'O'; // Uncaptured\n            }\n        }\n    }\n};",
        "explanation": "This solution cleverly avoids finding surrounded regions directly. Instead, it finds all 'O's connected to the border, as these are the ones that *should not* be flipped. It uses a DFS function. First, it iterates through all cells on the four borders. If a border cell is 'O', it calls DFS starting from there. The DFS marks the starting 'O' and all reachable 'O's connected to it with a temporary marker 'T'. After checking all borders, any cell that is still 'O' must be surrounded, so in a final pass, it flips these 'O's to 'X's. Simultaneously, it flips all the 'T's back to 'O's, restoring the non-surrounded regions.",
        "timeComplexity": "O(m * n)",
        "spaceComplexity": "O(m * n)"
      }
    ],
    "acceptanceRate": 33.1,
    "totalSubmissions": 10000,
    "correctSubmissions": 3310,
    "averageTime": 25
  },
  {
    "title": "Number of Provinces",
    "description": "There are `n` cities. Some of them are connected, while some are not. If city `a` is connected directly with city `b`, and city `b` is connected directly with city `c`, then city `a` is connected indirectly with city `c`.\n\nA **province** is a group of directly or indirectly connected cities and no other cities outside of the group.\n\nYou are given an `n x n` matrix `isConnected` where `isConnected[i][j] = 1` if the `i`-th city and the `j`-th city are directly connected, and `isConnected[i][j] = 0` otherwise.\n\nReturn the total number of **provinces**.\n\n**Example 1:**\nInput: isConnected = [[1,1,0],[1,1,0],[0,0,1]]\nOutput: 2\n\n**Example 2:**\nInput: isConnected = [[1,0,0],[0,1,0],[0,0,1]]\nOutput: 3\n\n**Constraints:**\n- 1 <= n <= 200\n- `isConnected.length == n`\n- `isConnected[i].length == n`\n- `isConnected[i][j]` is 1 or 0.\n- `isConnected[i][i] == 1`.\n- `isConnected[i][j] == isConnected[j][i]`.",
    "difficulty": "medium",
    "topics": [
      "Graph",
      "Union Find",
      "Depth-First Search",
      "Breadth-First Search"
    ],
    "companies": [
      "Amazon",
      "Facebook",
      "Google",
      "Microsoft"
    ],
    "constraints": [
      "1 <= n <= 200",
      "isConnected.length == n",
      "isConnected[i].length == n",
      "isConnected[i][j] is 1 or 0.",
      "isConnected[i][i] == 1.",
      "isConnected[i][j] == isConnected[j][i]."
    ],
    "examples": [
      {
        "input": "isConnected = [[1,1,0],[1,1,0],[0,0,1]]",
        "output": "2",
        "explanation": "Cities 0 and 1 are connected. City 2 is separate. Two provinces."
      },
      {
        "input": "isConnected = [[1,0,0],[0,1,0],[0,0,1]]",
        "output": "3",
        "explanation": "No cities are connected besides to themselves. Three provinces."
      }
    ],
    "testCases": [
      {
        "input": "[[1,1,0],[1,1,0],[0,0,1]]",
        "expectedOutput": "2",
        "isHidden": false
      },
      {
        "input": "[[1,0,0],[0,1,0],[0,0,1]]",
        "expectedOutput": "3",
        "isHidden": false
      }
    ],
    "hints": [
      "This is equivalent to finding the number of connected components in an undirected graph.",
      "You can use DFS, BFS, or Union-Find.",
      "DFS/BFS: Maintain a `visited` array. Iterate from city `i = 0` to `n-1`. If city `i` hasn't been visited, increment `provinceCount`, and start a DFS/BFS from `i` to mark all reachable cities as visited. The DFS/BFS explores neighbors based on the `isConnected` matrix.",
      "Union-Find: Initialize UF with `n` elements. Iterate through the upper (or lower) triangle of the `isConnected` matrix. If `isConnected[i][j] == 1`, call `union(i, j)`. The final number of provinces is the `count` maintained by the UF structure."
    ],
    "solutions": [
      {
        "language": "javascript",
        "code": "var findCircleNum = function(isConnected) {\n    const n = isConnected.length;\n    const visited = new Array(n).fill(false);\n    let provinceCount = 0;\n\n    function dfs(city) {\n        visited[city] = true;\n        // Check all potential neighbors\n        for (let neighbor = 0; neighbor < n; neighbor++) {\n            if (isConnected[city][neighbor] === 1 && !visited[neighbor]) {\n                dfs(neighbor);\n            }\n        }\n    }\n\n    // Iterate through all cities\n    for (let i = 0; i < n; i++) {\n        // If a city hasn't been visited, it's the start of a new province\n        if (!visited[i]) {\n            provinceCount++;\n            dfs(i); // Visit all cities connected to this one\n        }\n    }\n\n    return provinceCount;\n};",
        "explanation": "This solution uses Depth-First Search (DFS) to count the connected components (provinces). It maintains a `visited` array to keep track of cities already assigned to a province. It iterates through each city `i` from 0 to `n-1`. If city `i` has not been visited yet, it means we've found a new province. We increment `provinceCount` and start a `dfs` from city `i`. The `dfs` function marks the current `city` as visited and then recursively calls itself on all *unvisited* neighbors connected according to the `isConnected` matrix. This ensures all cities within a single province are visited before the main loop moves to find the next province.",
        "timeComplexity": "O(n^2)",
        "spaceComplexity": "O(n)"
      }
    ],
    "acceptanceRate": 63.4,
    "totalSubmissions": 7000,
    "correctSubmissions": 4438,
    "averageTime": 15
  },
  {
    "title": "Word Ladder II",
    "description": "Given `beginWord`, `endWord`, and `wordList`, return all the shortest transformation sequences from `beginWord` to `endWord`, or an empty list if no such sequence exists. Each sequence should be returned as a list of words.\n\n- Every adjacent pair of words differs by a single letter.\n- Every word in the sequence (except `beginWord`) is in `wordList`.\n\n**Example 1:**\nInput: beginWord = \"hit\", endWord = \"cog\", wordList = [\"hot\",\"dot\",\"dog\",\"lot\",\"log\",\"cog\"]\nOutput: [[\"hit\",\"hot\",\"dot\",\"dog\",\"cog\"],[\"hit\",\"hot\",\"lot\",\"log\",\"cog\"]]\n\n**Example 2:**\nInput: beginWord = \"hit\", endWord = \"cog\", wordList = [\"hot\",\"dot\",\"dog\",\"lot\",\"log\"]\nOutput: []\n\n**Constraints:**\n- 1 <= beginWord.length <= 5\n- `wordList[i].length == beginWord.length`\n- 1 <= wordList.length <= 1000\n- `beginWord`, `endWord`, `wordList[i]` consist of lowercase letters.\n- `beginWord != endWord`\n- All words in `wordList` are unique.",
    "difficulty": "hard",
    "topics": [
      "Graph",
      "Breadth-First Search (BFS)",
      "Backtracking",
      "String"
    ],
    "companies": [
      "Amazon",
      "Facebook",
      "Google",
      "Microsoft"
    ],
    "constraints": [
      "1 <= beginWord.length <= 5",
      "1 <= wordList.length <= 1000",
      "All words unique."
    ],
    "examples": [
      {
        "input": "beginWord = \"hit\", endWord = \"cog\", wordList = [\"hot\",\"dot\",\"dog\",\"lot\",\"log\",\"cog\"]",
        "output": "[[\"hit\",\"hot\",\"dot\",\"dog\",\"cog\"],[\"hit\",\"hot\",\"lot\",\"log\",\"cog\"]]",
        "explanation": "Two shortest paths exist."
      },
      {
        "input": "beginWord = \"hit\", endWord = \"cog\", wordList = [\"hot\",\"dot\",\"dog\",\"lot\",\"log\"]",
        "output": "[]",
        "explanation": "No path exists."
      }
    ],
    "testCases": [
      {
        "input": "\"hit\"\n\"cog\"\n[\"hot\",\"dot\",\"dog\",\"lot\",\"log\",\"cog\"]",
        "expectedOutput": "[[\"hit\",\"hot\",\"dot\",\"dog\",\"cog\"],[\"hit\",\"hot\",\"lot\",\"log\",\"cog\"]]",
        "isHidden": false
      },
      {
        "input": "\"hit\"\n\"cog\"\n[\"hot\",\"dot\",\"dog\",\"lot\",\"log\"]",
        "expectedOutput": "[]",
        "isHidden": false
      }
    ],
    "hints": [
      "This requires finding *all* shortest paths. A simple BFS finds the length, but not all paths.",
      "Combine BFS with DFS/Backtracking.",
      "Step 1 (BFS): Perform a BFS starting from `beginWord` to find the shortest distance (`level`) to `endWord`. During the BFS, also build a graph (or map) storing the `parent -> children` relationships *only* for edges that lead towards the shortest path (i.e., edge from level `L` to level `L+1`).",
      "Step 2 (DFS): Once the BFS is done and you know the shortest path level, start a DFS from `beginWord`. Use the graph/map built in Step 1 to explore only the valid shortest paths. Backtrack to find all possible paths."
    ],
    "solutions": [
      {
        "language": "javascript",
        "code": "var findLadders = function(beginWord, endWord, wordList) {\n    const wordSet = new Set(wordList);\n    if (!wordSet.has(endWord)) return [];\n\n    const results = [];\n    // Store paths: queue = [ [...path] ]\n    const queue = [[beginWord]]; \n    const visitedOnLevel = new Set([beginWord]); // Track visited on current level\n    let found = false;\n\n    while (queue.length > 0 && !found) {\n        const levelSize = queue.length;\n        const visitedThisLevel = new Set(); // Track visited *during* this level's expansion\n\n        for (let i = 0; i < levelSize; i++) {\n            const currentPath = queue.shift();\n            const currentWord = currentPath[currentPath.length - 1];\n\n            // Generate neighbors\n            for (let j = 0; j < currentWord.length; j++) {\n                const originalChar = currentWord[j];\n                for (let charCode = 97; charCode <= 122; charCode++) {\n                    const newChar = String.fromCharCode(charCode);\n                    if (newChar === originalChar) continue;\n\n                    const nextWord = currentWord.substring(0, j) + newChar + currentWord.substring(j + 1);\n\n                    if (wordSet.has(nextWord)) {\n                         // Check if we reached the end\n                        if (nextWord === endWord) {\n                            results.push([...currentPath, nextWord]);\n                            found = true; // Stop BFS after this level\n                        } \n                        // Only proceed if not visited on *previous* levels\n                        else if (!visitedOnLevel.has(nextWord)) {\n                            visitedThisLevel.add(nextWord);\n                            queue.push([...currentPath, nextWord]);\n                        }\n                    }\n                }\n            }\n        }\n        // Add all nodes visited in this level to the main visited set\n        visitedThisLevel.forEach(word => visitedOnLevel.add(word));\n    }\n\n    return results;\n};",
        "explanation": "This solution uses a modified BFS to find all shortest paths simultaneously. The queue stores entire paths `[...path]`. We also use a `visitedOnLevel` set to track words visited in *previous* levels to prevent cycles and longer paths. A temporary `visitedThisLevel` set is used within each level's processing. When generating neighbors, if a neighbor `nextWord` is the `endWord`, we add the complete path to `results` and set `found = true`. If it's a valid word in `wordSet` but *not* in `visitedOnLevel`, we add it to `visitedThisLevel` and enqueue the new path. Setting `found = true` ensures we only collect paths of the shortest length found in the first successful level. Adding `visitedThisLevel` to `visitedOnLevel` after processing a level prevents revisiting nodes at the same or later levels, which is crucial for finding only shortest paths.",
        "timeComplexity": "O(N * M^2 * 26)",
        "spaceComplexity": "O(N * M)"
      }
    ],
    "acceptanceRate": 25.1,
    "totalSubmissions": 4000,
    "correctSubmissions": 1004,
    "averageTime": 55
  },
  {
    "title": "Find All Anagrams in a String",
    "description": "Given two strings `s` and `p`, return an array of all the start indices of `p`'s anagrams in `s`. You may return the answer in any order.\n\nAn **Anagram** is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.\n\n**Example 1:**\nInput: s = \"cbaebabacd\", p = \"abc\"\nOutput: [0,6]\nExplanation: \"cba\" (index 0) and \"bac\" (index 6) are anagrams of \"abc\".\n\n**Example 2:**\nInput: s = \"abab\", p = \"ab\"\nOutput: [0,1,2]\n\n**Constraints:**\n- 1 <= s.length, p.length <= 3 * 10^4\n- `s` and `p` consist of lowercase English letters.",
    "difficulty": "medium",
    "topics": [
      "String",
      "Sliding Window",
      "Hash Table"
    ],
    "companies": [
      "Amazon",
      "Facebook",
      "Microsoft",
      "Google"
    ],
    "constraints": [
      "1 <= s.length, p.length <= 3 * 10^4",
      "s and p consist of lowercase English letters."
    ],
    "examples": [
      {
        "input": "s = \"cbaebabacd\", p = \"abc\"",
        "output": "[0,6]",
        "explanation": "Anagrams \"cba\" starts at 0, \"bac\" starts at 6."
      },
      {
        "input": "s = \"abab\", p = \"ab\"",
        "output": "[0,1,2]",
        "explanation": "Anagrams \"ab\" starts at 0, \"ba\" starts at 1, \"ab\" starts at 2."
      }
    ],
    "testCases": [
      {
        "input": "\"cbaebabacd\"\n\"abc\"",
        "expectedOutput": "[0,6]",
        "isHidden": false
      },
      {
        "input": "\"abab\"\n\"ab\"",
        "expectedOutput": "[0,1,2]",
        "isHidden": false
      },
      {
        "input": "\"a\"\n\"a\"",
        "expectedOutput": "[0]",
        "isHidden": true
      }
    ],
    "hints": [
      "This is very similar to 'Permutation in String'.",
      "Use a sliding window of size `p.length`.",
      "Maintain frequency maps (or arrays of size 26) for `p` (`pMap`) and the current window (`windowMap`).",
      "Initialize `pMap` and `windowMap` for the first window.",
      "Check if the maps are equal. If yes, add the starting index (0) to results.",
      "Slide the window one step at a time.",
      "In each step: Decrement the count for the character leaving the window, increment the count for the character entering the window.",
      "Compare the `windowMap` and `pMap`. If equal, add the *start index* of the current window to results."
    ],
    "solutions": [
      {
        "language": "javascript",
        "code": "var findAnagrams = function(s, p) {\n    const sLen = s.length, pLen = p.length;\n    if (pLen > sLen) return [];\n\n    const pCounts = new Array(26).fill(0);\n    const windowCounts = new Array(26).fill(0);\n    const baseCode = 'a'.charCodeAt(0);\n    const results = [];\n\n    // Initialize counts for p and the first window\n    for (let i = 0; i < pLen; i++) {\n        pCounts[p.charCodeAt(i) - baseCode]++;\n        windowCounts[s.charCodeAt(i) - baseCode]++;\n    }\n\n    // Check if the first window is an anagram\n    if (pCounts.join('') === windowCounts.join('')) {\n        results.push(0);\n    }\n\n    // Slide the window\n    for (let i = pLen; i < sLen; i++) {\n        // Add the new character (entering window)\n        windowCounts[s.charCodeAt(i) - baseCode]++;\n        // Remove the old character (leaving window)\n        const leftCharIndex = i - pLen;\n        windowCounts[s.charCodeAt(leftCharIndex) - baseCode]--;\n\n        // Check if the current window is an anagram\n        if (pCounts.join('') === windowCounts.join('')) {\n            // Add the start index of this window\n            results.push(i - pLen + 1);\n        }\n    }\n\n    return results;\n};",
        "explanation": "This solution uses a sliding window approach with frequency arrays (`pCounts`, `windowCounts`). It initializes the counts for string `p` and the first window of `s`. It checks if this initial window is an anagram. Then, it iterates from the end of the first window (`i = pLen`) to the end of `s`. In each step, it slides the window by incrementing the count for the new character entering (`s[i]`) and decrementing the count for the character leaving (`s[i - pLen]`). After each slide, it compares the `windowCounts` with `pCounts`. If they match, it means the current window is an anagram, and its starting index (`i - pLen + 1`) is added to the `results`.",
        "timeComplexity": "O(n)",
        "spaceComplexity": "O(1)"
      }
    ],
    "acceptanceRate": 46.7,
    "totalSubmissions": 10000,
    "correctSubmissions": 4670,
    "averageTime": 21
  },
  {
    "title": "Permutation Sequence",
    "description": "The set `[1, 2, 3, ..., n]` contains a total of `n!` unique permutations.\n\nBy listing and labeling all of the permutations in order, we get the following sequence for n = 3:\n1. \"123\"\n2. \"132\"\n3. \"213\"\n4. \"231\"\n5. \"312\"\n6. \"321\"\n\nGiven `n` and `k`, return the `k`-th permutation sequence.\n\n**Example 1:**\nInput: n = 3, k = 3\nOutput: \"213\"\n\n**Example 2:**\nInput: n = 4, k = 9\nOutput: \"2314\"\n\n**Constraints:**\n- 1 <= n <= 9\n- 1 <= k <= n!",
    "difficulty": "hard",
    "topics": [
      "Math",
      "Recursion"
    ],
    "companies": [
      "Amazon",
      "Microsoft",
      "Adobe"
    ],
    "constraints": [
      "1 <= n <= 9",
      "1 <= k <= n!"
    ],
    "examples": [
      {
        "input": "n = 3, k = 3",
        "output": "\"213\"",
        "explanation": "The 3rd permutation in order is \"213\"."
      },
      {
        "input": "n = 4, k = 9",
        "output": "\"2314\"",
        "explanation": "The 9th permutation for n=4."
      }
    ],
    "testCases": [
      {
        "input": "3\n3",
        "expectedOutput": "\"213\"",
        "isHidden": false
      },
      {
        "input": "4\n9",
        "expectedOutput": "\"2314\"",
        "isHidden": false
      },
      {
        "input": "3\n1",
        "expectedOutput": "\"123\"",
        "isHidden": true
      }
    ],
    "hints": [
      "Generating all permutations and sorting is too slow (O(n! * n)).",
      "Think mathematically. For `n` numbers, there are `(n-1)!` permutations starting with '1', `(n-1)!` starting with '2', etc.",
      "You can determine the *first* digit of the k-th permutation by calculating `index = (k-1) / (n-1)!`. The digit will be the `index`-th available number.",
      "Update `k` for the remaining subproblem: `k = (k-1) % (n-1)! + 1`.",
      "Remove the chosen digit from the available numbers.",
      "Repeat this process to find the second digit using `(n-2)!`, and so on.",
      "Precompute factorials."
    ],
    "solutions": [
      {
        "language": "javascript",
        "code": "var getPermutation = function(n, k) {\n    // Precompute factorials\n    const factorials = [1];\n    for (let i = 1; i <= n; i++) {\n        factorials[i] = factorials[i - 1] * i;\n    }\n\n    // List of available numbers (1 to n)\n    const numbers = [];\n    for (let i = 1; i <= n; i++) {\n        numbers.push(i);\n    }\n\n    // Adjust k to be 0-indexed\n    k--; \n\n    let result = \"\";\n\n    for (let i = n; i >= 1; i--) {\n        // Calculate the index of the digit to pick\n        const index = Math.floor(k / factorials[i - 1]);\n        \n        // Append the digit to the result\n        result += numbers[index];\n        \n        // Remove the digit from available numbers\n        numbers.splice(index, 1);\n        \n        // Update k for the next iteration\n        k %= factorials[i - 1];\n    }\n\n    return result;\n};",
        "explanation": "This solution calculates the k-th permutation directly using factorials. It precomputes factorials up to `n`. It maintains a list of available `numbers`. It adjusts `k` to be 0-indexed. Then, it iterates from `i = n` down to 1. In each iteration, it determines which digit to place next. There are `(i-1)!` permutations starting with each available digit. The correct digit's index in the `numbers` list is found by `index = floor(k / factorials[i - 1])`. This digit is appended to the `result`, removed from `numbers`, and `k` is updated using the modulo operator (`k %= factorials[i - 1]`) to find the relative index within the next smaller block of permutations.",
        "timeComplexity": "O(n^2)",
        "spaceComplexity": "O(n)"
      }
    ],
    "acceptanceRate": 41.2,
    "totalSubmissions": 6000,
    "correctSubmissions": 2472,
    "averageTime": 14
  },
  {
    "title": "Subarray Sum Equals K",
    "description": "Given an array of integers `nums` and an integer `k`, return the total number of continuous subarrays whose sum equals `k`.\n\n**Example 1:**\nInput: nums = [1,1,1], k = 2\nOutput: 2\nExplanation: [1,1] and [1,1] (starting at index 0 and 1).\n\n**Example 2:**\nInput: nums = [1,2,3], k = 3\nOutput: 2\nExplanation: [1,2] and [3].\n\n**Constraints:**\n- 1 <= nums.length <= 2 * 10^4\n- -1000 <= nums[i] <= 1000\n- -10^7 <= k <= 10^7",
    "difficulty": "medium",
    "topics": [
      "Array",
      "Prefix Sum",
      "Hash Table"
    ],
    "companies": [
      "Facebook",
      "Amazon",
      "Google",
      "Microsoft"
    ],
    "constraints": [
      "1 <= nums.length <= 2 * 10^4",
      "-1000 <= nums[i] <= 1000",
      "-10^7 <= k <= 10^7"
    ],
    "examples": [
      {
        "input": "nums = [1,1,1], k = 2",
        "output": "2",
        "explanation": "Two subarrays [1,1] sum to 2."
      },
      {
        "input": "nums = [1,2,3], k = 3",
        "output": "2",
        "explanation": "Subarrays [1,2] and [3] sum to 3."
      }
    ],
    "testCases": [
      {
        "input": "[1,1,1]\n2",
        "expectedOutput": "2",
        "isHidden": false
      },
      {
        "input": "[1,2,3]\n3",
        "expectedOutput": "2",
        "isHidden": false
      },
      {
        "input": "[1]\n0",
        "expectedOutput": "0",
        "isHidden": true
      },
      {
        "input": "[-1,-1,1]\n0",
        "expectedOutput": "1",
        "isHidden": true
      }
    ],
    "hints": [
      "A naive O(n^2) approach checks the sum of every possible subarray.",
      "Can we do better using prefix sums?",
      "Let `prefixSum[i]` be the sum of `nums[0...i-1]`.",
      "The sum of a subarray `nums[j...i]` is `prefixSum[i+1] - prefixSum[j]`.",
      "We want `prefixSum[i+1] - prefixSum[j] == k`.",
      "Rearranging, we want `prefixSum[j] == prefixSum[i+1] - k`.",
      "Use a hash map to store the frequencies of prefix sums encountered so far.",
      "Iterate through `nums`. Calculate the `currentSum`. Check if `currentSum - k` exists in the map. If yes, add its frequency to the total `count`. Update the frequency of `currentSum` in the map."
    ],
    "solutions": [
      {
        "language": "javascript",
        "code": "var subarraySum = function(nums, k) {\n    let count = 0;\n    let currentSum = 0;\n    // Map: prefixSum -> frequency\n    const prefixSumCounts = new Map();\n    // Base case: prefix sum of 0 exists once (empty prefix)\n    prefixSumCounts.set(0, 1);\n\n    for (const num of nums) {\n        currentSum += num;\n\n        // Check if (currentSum - k) exists in the map\n        // If yes, it means there's a subarray ending here whose sum is k\n        const complement = currentSum - k;\n        if (prefixSumCounts.has(complement)) {\n            count += prefixSumCounts.get(complement);\n        }\n\n        // Update the frequency of the current prefix sum\n        prefixSumCounts.set(currentSum, (prefixSumCounts.get(currentSum) || 0) + 1);\n    }\n\n    return count;\n};",
        "explanation": "This O(n) solution uses a hash map (`prefixSumCounts`) to store the frequencies of prefix sums encountered. We initialize the map with `{0: 1}` to handle subarrays that start from index 0. We iterate through the `nums` array, maintaining the `currentSum`. For each element, we update `currentSum`. Then, we check if `currentSum - k` exists as a key in our `prefixSumCounts` map. If it does, it means there exists a previous prefix sum such that the sum between that previous point and the current point is exactly `k`. The value `prefixSumCounts.get(currentSum - k)` tells us *how many* such previous points exist, so we add this count to our total `count`. Finally, we update the frequency count for the `currentSum` itself in the map.",
        "timeComplexity": "O(n)",
        "spaceComplexity": "O(n)"
      }
    ],
    "acceptanceRate": 43.9,
    "totalSubmissions": 15000,
    "correctSubmissions": 6585,
    "averageTime": 24
  },
  {
    "title": "Minimum Size Subarray Sum",
    "description": "Given an array of positive integers `nums` and a positive integer `target`, return the minimal length of a contiguous subarray `[numsl, numsl+1, ..., numsr-1, numsr]` of which the sum is greater than or equal to `target`. If there is no such subarray, return 0 instead.\n\n**Example 1:**\nInput: target = 7, nums = [2,3,1,2,4,3]\nOutput: 2\nExplanation: The subarray [4,3] has the minimal length under the problem constraint.\n\n**Example 2:**\nInput: target = 4, nums = [1,4,4]\nOutput: 1\n\n**Example 3:**\nInput: target = 11, nums = [1,1,1,1,1,1,1,1]\nOutput: 0\n\n**Constraints:**\n- 1 <= target <= 10^9\n- 1 <= nums.length <= 10^5\n- 1 <= nums[i] <= 10^4",
    "difficulty": "medium",
    "topics": [
      "Array",
      "Sliding Window",
      "Binary Search",
      "Prefix Sum"
    ],
    "companies": [
      "Amazon",
      "Facebook",
      "Google",
      "Microsoft"
    ],
    "constraints": [
      "1 <= target <= 10^9",
      "1 <= nums.length <= 10^5",
      "1 <= nums[i] <= 10^4"
    ],
    "examples": [
      {
        "input": "target = 7, nums = [2,3,1,2,4,3]",
        "output": "2",
        "explanation": "Subarray [4,3] has length 2 and sum 7."
      },
      {
        "input": "target = 4, nums = [1,4,4]",
        "output": "1",
        "explanation": "Subarray [4] has length 1 and sum 4."
      },
      {
        "input": "target = 11, nums = [1,1,1,1,1,1,1,1]",
        "output": "0",
        "explanation": "No subarray sums to >= 11."
      }
    ],
    "testCases": [
      {
        "input": "7\n[2,3,1,2,4,3]",
        "expectedOutput": "2",
        "isHidden": false
      },
      {
        "input": "4\n[1,4,4]",
        "expectedOutput": "1",
        "isHidden": false
      },
      {
        "input": "11\n[1,1,1,1,1,1,1,1]",
        "expectedOutput": "0",
        "isHidden": false
      }
    ],
    "hints": [
      "Use the Sliding Window technique.",
      "Maintain a `windowSum`, `minLength`, and a `left` pointer.",
      "Iterate through `nums` with a `right` pointer.",
      "Add `nums[right]` to `windowSum`.",
      "While `windowSum >= target`:\n  - Update `minLength = min(minLength, right - left + 1)`.\n  - Shrink the window: Subtract `nums[left]` from `windowSum` and increment `left`.",
      "Initialize `minLength` to infinity or `n + 1`."
    ],
    "solutions": [
      {
        "language": "javascript",
        "code": "var minSubArrayLen = function(target, nums) {\n    let left = 0;\n    let windowSum = 0;\n    let minLength = Infinity;\n\n    for (let right = 0; right < nums.length; right++) {\n        // Expand the window\n        windowSum += nums[right];\n\n        // Shrink the window while sum is >= target\n        while (windowSum >= target) {\n            // Update the minimum length found\n            minLength = Math.min(minLength, right - left + 1);\n            \n            // Shrink from the left\n            windowSum -= nums[left];\n            left++;\n        }\n    }\n\n    // If minLength was never updated, return 0\n    return minLength === Infinity ? 0 : minLength;\n};",
        "explanation": "This solution uses a sliding window approach. We use `left` and `right` pointers to define the window and `windowSum` to track the sum within it. We initialize `minLength` to `Infinity`. The `right` pointer iterates through the array, expanding the window and adding `nums[right]` to `windowSum`. Then, a `while` loop checks if `windowSum >= target`. As long as it is, we have a valid subarray. We update `minLength` with the current window size (`right - left + 1`) if it's smaller. We then shrink the window from the left by subtracting `nums[left]` from `windowSum` and incrementing `left`. This process continues until `right` reaches the end. Finally, we return `minLength` or 0 if no valid subarray was found.",
        "timeComplexity": "O(n)",
        "spaceComplexity": "O(1)"
      }
    ],
    "acceptanceRate": 40.8,
    "totalSubmissions": 10000,
    "correctSubmissions": 4080,
    "averageTime": 14
  },
  {
    "title": "Sort List",
    "description": "Given the `head` of a linked list, return the list after sorting it in ascending order.\n\n**Follow up:** Can you sort the linked list in O(n log n) time and O(1) memory (i.e. constant space)?\n\n**Example 1:**\nInput: head = [4,2,1,3]\nOutput: [1,2,3,4]\n\n**Example 2:**\nInput: head = [-1,5,3,4,0]\nOutput: [-1,0,3,4,5]\n\n**Constraints:**\n- The number of nodes in the list is in the range [0, 5 * 10^4].\n- -10^5 <= Node.val <= 10^5",
    "difficulty": "medium",
    "topics": [
      "Linked List",
      "Sorting",
      "Merge Sort",
      "Two Pointers"
    ],
    "companies": [
      "Amazon",
      "Microsoft",
      "Facebook",
      "Google"
    ],
    "constraints": [
      "The number of nodes in the list is in the range [0, 5 * 10^4].",
      "-10^5 <= Node.val <= 10^5"
    ],
    "examples": [
      {
        "input": "head = [4,2,1,3]",
        "output": "[1,2,3,4]"
      },
      {
        "input": "head = [-1,5,3,4,0]",
        "output": "[-1,0,3,4,5]"
      }
    ],
    "testCases": [
      {
        "input": "[4,2,1,3]",
        "expectedOutput": "[1,2,3,4]",
        "isHidden": false
      },
      {
        "input": "[-1,5,3,4,0]",
        "expectedOutput": "[-1,0,3,4,5]",
        "isHidden": false
      },
      {
        "input": "[]",
        "expectedOutput": "[]",
        "isHidden": true
      }
    ],
    "hints": [
      "The O(n log n) time and O(1) space constraints suggest Merge Sort.",
      "Merge sort on a linked list involves:\n  1. Splitting the list into two halves (use slow/fast pointers to find the middle).\n  2. Recursively sorting each half.\n  3. Merging the two sorted halves (use the 'Merge Two Sorted Lists' logic).",
      "The base case for the recursion is an empty list or a list with one node.",
      "Be careful when splitting the list to set the `next` of the node before the middle to `null`."
    ],
    "solutions": [
      {
        "language": "javascript",
        "code": "/**\n * Definition for singly-linked list.\n * function ListNode(val, next) {\n * this.val = (val===undefined ? 0 : val)\n * this.next = (next===undefined ? null : next)\n * }\n */\n\n// Helper: Merge two sorted lists\nfunction mergeTwoLists(l1, l2) {\n    let dummy = new ListNode();\n    let current = dummy;\n    while (l1 && l2) {\n        if (l1.val < l2.val) {\n            current.next = l1;\n            l1 = l1.next;\n        } else {\n            current.next = l2;\n            l2 = l2.next;\n        }\n        current = current.next;\n    }\n    current.next = l1 || l2;\n    return dummy.next;\n}\n\n// Helper: Find middle and split the list\nfunction getMidAndSplit(head) {\n    let slow = head;\n    let fast = head;\n    let prev = null; // To split the list\n    while (fast && fast.next) {\n        prev = slow;\n        slow = slow.next;\n        fast = fast.next.next;\n    }\n    // Split the list\n    if (prev) {\n        prev.next = null;\n    }\n    return slow; // 'slow' is the head of the second half\n}\n\nvar sortList = function(head) {\n    // Base case: empty or single node list\n    if (!head || !head.next) {\n        return head;\n    }\n\n    // 1. Split the list into two halves\n    const mid = getMidAndSplit(head);\n    const leftHalf = head;\n    const rightHalf = mid;\n\n    // 2. Recursively sort each half\n    const sortedLeft = sortList(leftHalf);\n    const sortedRight = sortList(rightHalf);\n\n    // 3. Merge the sorted halves\n    return mergeTwoLists(sortedLeft, sortedRight);\n};",
        "explanation": "This solution implements Merge Sort for a linked list. The `sortList` function is recursive. The base case is when the list is empty or has only one node. Otherwise, it finds the middle node using a helper function `getMidAndSplit` (which uses slow/fast pointers and also splits the list by setting the node before `mid`'s `next` to `null`). It then recursively calls `sortList` on the left half (`head`) and the right half (`mid`). Finally, it merges the two sorted halves returned by the recursive calls using the `mergeTwoLists` helper function.",
        "timeComplexity": "O(n log n)",
        "spaceComplexity": "O(log n)"
      }
    ],
    "acceptanceRate": 48.9,
    "totalSubmissions": 9000,
    "correctSubmissions": 4401,
    "averageTime": 26
  },
  {
    "title": "Convert Sorted Array to Binary Search Tree",
    "description": "Given an integer array `nums` where the elements are sorted in ascending order, convert it to a **height-balanced** binary search tree.\n\nA height-balanced binary tree is a binary tree in which the depth of the two subtrees of every node never differs by more than one.\n\n**Example 1:**\nInput: nums = [-10,-3,0,5,9]\nOutput: [0,-3,9,-10,null,5]\nExplanation: [0,-10,5,null,-3,null,9] is also accepted.\n\n**Example 2:**\nInput: nums = [1,3]\nOutput: [3,1] or [1,null,3]\n\n**Constraints:**\n- 1 <= nums.length <= 10^4\n- -10^4 <= nums[i] <= 10^4\n- `nums` is sorted in a **strictly increasing** order.",
    "difficulty": "easy",
    "topics": [
      "Tree",
      "Binary Search Tree",
      "Divide and Conquer",
      "Recursion"
    ],
    "companies": [
      "Amazon",
      "Microsoft",
      "Facebook",
      "Apple"
    ],
    "constraints": [
      "1 <= nums.length <= 10^4",
      "-10^4 <= nums[i] <= 10^4",
      "nums is sorted strictly increasing."
    ],
    "examples": [
      {
        "input": "nums = [-10,-3,0,5,9]",
        "output": "[0,-3,9,-10,null,5]",
        "explanation": "The middle element 0 becomes root. Left subtree from [-10, -3], right from [5, 9]."
      },
      {
        "input": "nums = [1,3]",
        "output": "[3,1]",
        "explanation": "3 is root, 1 is left child."
      }
    ],
    "testCases": [
      {
        "input": "[-10,-3,0,5,9]",
        "expectedOutput": "[0,-3,9,-10,null,5]",
        "isHidden": false
      },
      {
        "input": "[1,3]",
        "expectedOutput": "[1,null,3]",
        "isHidden": false
      }
    ],
    "hints": [
      "To create a height-balanced BST, the middle element should always be the root.",
      "Use recursion (Divide and Conquer).",
      "Define a helper function `build(left, right)` that builds a BST from `nums[left...right]`.",
      "Base case: If `left > right`, return `null`.",
      "Find the middle index: `mid = floor((left + right) / 2)`.",
      "Create the root node: `root = new TreeNode(nums[mid])`.",
      "Recursively build the left subtree: `root.left = build(left, mid - 1)`.",
      "Recursively build the right subtree: `root.right = build(mid + 1, right)`.",
      "Return the `root`."
    ],
    "solutions": [
      {
        "language": "javascript",
        "code": "/**\n * Definition for a binary tree node.\n * function TreeNode(val, left, right) {\n * this.val = (val===undefined ? 0 : val)\n * this.left = (left===undefined ? null : left)\n * this.right = (right===undefined ? null : right)\n * }\n */\nvar sortedArrayToBST = function(nums) {\n    \n    /**\n     * @param {number} left - Start index of subarray\n     * @param {number} right - End index of subarray\n     * @returns {TreeNode | null}\n     */\n    function build(left, right) {\n        // Base case: Invalid range\n        if (left > right) {\n            return null;\n        }\n\n        // Find the middle element to make it root\n        const mid = left + Math.floor((right - left) / 2);\n        const root = new TreeNode(nums[mid]);\n\n        // Recursively build left and right subtrees\n        root.left = build(left, mid - 1);\n        root.right = build(mid + 1, right);\n\n        return root;\n    }\n\n    return build(0, nums.length - 1);\n};",
        "explanation": "This solution uses a recursive Divide and Conquer approach. The `build` helper function takes the `left` and `right` indices of the current subarray in `nums`. The base case is when `left > right`, returning `null`. Otherwise, it finds the middle index `mid`. The element `nums[mid]` becomes the `root` of the current subtree. It then recursively calls `build` for the left part (`left` to `mid - 1`) to create the left child and for the right part (`mid + 1` to `right`) to create the right child. Choosing the middle element as the root at each step ensures the resulting BST is height-balanced.",
        "timeComplexity": "O(n)",
        "spaceComplexity": "O(log n)"
      }
    ],
    "acceptanceRate": 60.1,
    "totalSubmissions": 10000,
    "correctSubmissions": 6010,
    "averageTime": 13
  },
  {
    "title": "Validate IP Address",
    "description": "Given a string `queryIP`, return `\"IPv4\"` if IP is a valid IPv4 address, `\"IPv6\"` if IP is a valid IPv6 address, or `\"Neither\"` if IP is not a valid IP of any type.\n\nA valid IPv4 address has the form `\"x1.x2.x3.x4\"` where `0 <= xi <= 255` and `xi` cannot contain leading zeros. Example: `\"192.168.1.1\"`.\n\nA valid IPv6 address has the form `\"x1:x2:x3:x4:x5:x6:x7:x8\"` where `1 <= xi.length <= 4`, `xi` consists of hexadecimal digits (`0-9`, `a-f`, `A-F`), and `xi` cannot contain leading zeros (except for the single digit 0). Example: `\"2001:0db8:85a3:0000:0000:8a2e:0370:7334\"`.\n\n**Example 1:**\nInput: queryIP = \"172.16.254.1\"\nOutput: \"IPv4\"\n\n**Example 2:**\nInput: queryIP = \"2001:0db8:85a3:0:0:8A2E:0370:7334\"\nOutput: \"IPv6\"\n\n**Example 3:**\nInput: queryIP = \"256.256.256.256\"\nOutput: \"Neither\"\n\n**Constraints:**\n- `queryIP` consists only of English letters, digits, '.', and ':'.",
    "difficulty": "medium",
    "topics": [
      "String"
    ],
    "companies": [
      "Amazon",
      "Microsoft",
      "Uber"
    ],
    "constraints": [
      "queryIP consists only of English letters, digits, '.', and ':'."
    ],
    "examples": [
      {
        "input": "queryIP = \"172.16.254.1\"",
        "output": "\"IPv4\"",
        "explanation": "Valid IPv4 format."
      },
      {
        "input": "queryIP = \"2001:0db8:85a3:0:0:8A2E:0370:7334\"",
        "output": "\"IPv6\"",
        "explanation": "Valid IPv6 format."
      },
      {
        "input": "queryIP = \"256.256.256.256\"",
        "output": "\"Neither\"",
        "explanation": "Segments > 255."
      },
      {
        "input": "queryIP = \"1e1.4.5.6\"",
        "output": "\"Neither\"",
        "explanation": "Contains non-digit in IPv4 segment."
      }
    ],
    "testCases": [
      {
        "input": "\"172.16.254.1\"",
        "expectedOutput": "\"IPv4\"",
        "isHidden": false
      },
      {
        "input": "\"2001:0db8:85a3:0:0:8A2E:0370:7334\"",
        "expectedOutput": "\"IPv6\"",
        "isHidden": false
      },
      {
        "input": "\"256.256.256.256\"",
        "expectedOutput": "\"Neither\"",
        "isHidden": false
      },
      {
        "input": "\"192.168.1.00\"",
        "expectedOutput": "\"Neither\"",
        "isHidden": true
      },
      {
        "input": "\"2001:0db8:85a3::8A2E:037j:7334\"",
        "expectedOutput": "\"Neither\"",
        "isHidden": true
      }
    ],
    "hints": [
      "This is primarily a string parsing and validation problem.",
      "Check if the string contains '.' or ':' to determine the potential type.",
      "If '.', try validating as IPv4:\n  - Split by '.'. Should have exactly 4 parts.\n  - For each part: Check length > 0. Check for leading zeros (only '0' is allowed). Check if it contains only digits. Check if the value is between 0 and 255.",
      "If ':', try validating as IPv6:\n  - Split by ':'. Should have exactly 8 parts.\n  - For each part: Check length is between 1 and 4. Check if it contains only hex digits (0-9, a-f, A-F).",
      "If neither validation passes, return \"Neither\"."
    ],
    "solutions": [
      {
        "language": "javascript",
        "code": "var validIPAddress = function(queryIP) {\n    \n    function validateIPv4(ip) {\n        const parts = ip.split('.');\n        if (parts.length !== 4) return false;\n        \n        for (const part of parts) {\n            // Check length and leading zeros\n            if (part.length === 0 || part.length > 3 || (part.length > 1 && part[0] === '0')) {\n                return false;\n            }\n            // Check if all chars are digits and value is in range\n            for (const char of part) {\n                if (char < '0' || char > '9') return false;\n            }\n            const val = parseInt(part);\n            if (val < 0 || val > 255) {\n                return false;\n            }\n        }\n        return true;\n    }\n\n    function validateIPv6(ip) {\n        const parts = ip.split(':');\n        if (parts.length !== 8) return false;\n        const hexChars = '0123456789abcdefABCDEF';\n        \n        for (const part of parts) {\n            // Check length\n            if (part.length === 0 || part.length > 4) {\n                return false;\n            }\n            // Check if all chars are hex\n            for (const char of part) {\n                if (hexChars.indexOf(char) === -1) return false;\n            }\n        }\n        return true;\n    }\n\n    if (queryIP.includes('.')) {\n        return validateIPv4(queryIP) ? \"IPv4\" : \"Neither\";\n    } else if (queryIP.includes(':')) {\n        return validateIPv6(queryIP) ? \"IPv6\" : \"Neither\";\n    } else {\n        return \"Neither\";\n    }\n};",
        "explanation": "This solution defines two helper functions, `validateIPv4` and `validateIPv6`. `validateIPv4` splits the string by '.', checks for exactly 4 parts, and then validates each part for length (1-3), no leading zeros (unless it's just '0'), containing only digits, and having a value between 0 and 255. `validateIPv6` splits by ':', checks for exactly 8 parts, and validates each part for length (1-4) and containing only valid hexadecimal characters. The main function checks if the input contains '.' or ':'. If '.', it calls `validateIPv4`. If ':', it calls `validateIPv6`. If neither or if validation fails, it returns \"Neither\".",
        "timeComplexity": "O(N)",
        "spaceComplexity": "O(1)"
      }
    ],
    "acceptanceRate": 27.5,
    "totalSubmissions": 6000,
    "correctSubmissions": 1650,
    "averageTime": 15
  }
];

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ai-coding-platform');
    console.log('Connected to MongoDB');

    // Clear existing data
    await Question.deleteMany({});
    console.log('Cleared existing questions');

    // Insert sample questions
    await Question.insertMany(sampleQuestions);
    console.log('Inserted sample questions');

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

// Run the seeder
if (require.main === module) {
  require('dotenv').config();
  seedDatabase();
}

module.exports = { seedDatabase, sampleQuestions };
