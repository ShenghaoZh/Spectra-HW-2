
//No.15 - 3SUM
                                                    //思路：brute the first digit, then two pointers.
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function(nums) {
    nums.sort(function(a, b) {return a - b});
    let temp = [];
    let ans = [];
    let sum = 0;
    let i = 0;
    while (i < nums.length - 2) {
        let j = i + 1;
        let k = nums.length - 1;
        while ((i < j) && (j < k)) {
            sum = nums[i] + nums[j] + nums[k];
            if (sum == 0)
                temp.push([nums[i], nums[j], nums[k]]);
            if (sum < 0)
                j++;
            else k--;
        }
        i++;
                                                    //利用hashMap去重，if则返还 0, 0, 0, 0, ...something wrong？
                                                    // 184 ms, faster than 42.47%, 52.1 MB, less than 16.13%
        while (nums[i] == nums[i - 1]){
            i++;
        }
    }
                                                    //(array1 == array2) 无论如何都是false，因为地址。
    let myMap = new Map();
    for ( let item of temp )
        {
            if (!myMap.has(item.toString()))
            {
                myMap.set(item.toString(), item);
            }
        }
    for (var [key, value] of myMap.entries())
        {
            ans.push(value);
        }

    return ans;
}
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function(nums) {
    nums.sort(function(a, b) {return a - b});
    let myMap = new Map();
    let temp = [];
    let ans = [];
    let sum = 0;
    let i = 0;
    while (i < nums.length - 2){
        let j = i + 1;
        let k = nums.length - 1;
        while ((i < j) && (j < k)) {
            sum = nums[i] + nums[j] + nums[k];
            let str = nums[i] + " " + nums[j] + " " + nums[k];
                                                    //hashMap去重复，例如nums=[0,0,0,0] 
                                                    //328 ms, faster than 16.57%, 64.5 MB, less than 5.08% 
            if (sum == 0) {
                if (!myMap.has(str)) 
                    {
                        myMap.set(str,0);
                        temp.push([nums[i], nums[j], nums[k]]);
                    }
            }
                
            if (sum < 0)
                j++;
            else k--;
        }
        i++;
        if (nums[i] == nums[i - 1]) {
            i++;
        }
    }
    return temp;
}



//NO.46 Permutation
                                                    //思路: DP - caculate through the very basic
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function(nums) {
    let ans = [];
    ans = dp(nums, nums.length);
    return ans;

    function dp(input, level) {
        if (input.length < level) return [[]];
        if (level == 1) return [[input[0]]];
        let output = [];
        let prev = dp(input, level - 1);
        for(let item of prev) {
            for (let i = 0; i <= item.length; i++){
                let temp = item.slice();
                temp.splice(i, 0, input[level - 1])
                output.push(temp);
            }
        }
        return output;
    }
};



//NO.56 Merge Intervals
                                                    //思路: Sort, then compare the [i]'s end with [i+1]'s start
/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */
var merge = function(intervals) {
    if (!intervals.length) return [];
    let ans=[];
    intervals.sort(function(a,b) {
        if (a[0] != b[0]) return a[0] - b[0];
        else return a[1] - b[1];
    })
    let prev = intervals[0];
    ans = [prev];
    for (let item of intervals){
        if (item[0] <= prev[1]) {
            prev[1] = Math.max(prev[1], item[1])
        }
        else {
            ans.push(item);
            prev = item;
        }
    }
    return ans;
}



//NO.525 Contiguous Array
                                                    //思路: (+1, -1) 画2D图，寻找到同一水平线的两个交点
/**
 * @param {number[]} nums
 * @return {number}
 */
var findMaxLength = function(nums) {
    let myMap = new Map();
                                                    //图的起始点需要画
    myMap.set(0, 0);
    let ans = 0, y = 0;
                                                    //因为起始点i从1开始，所以数组内要[i-1]
    for (let i = 1; i <= nums.length; i++) {
        if (nums[i-1] == 1) y++;
        else if (nums[i-1] == 0) y--;
        if (myMap.has(y)) {
            ans = Math.max(ans, i-myMap.get(y));
        }
        else {
            myMap.set(y, i)
        }
    }  e
    return ans;
};





//NO.6 ZigZag Conversion
                                                    //思路: 数字规律cycle
/**
 * @param {string} s
 * @param {number} numRows
 * @return {string}
 */
var convert = function(s, numRows) {
    let n = numRows;
    let c = 2 * n - 2; //Cycle
    if (n == 1) return s;
    let ans = "";
                                                    //为什么不可以用 ans.comcat(s.charAt(i+j)) ???
    for (let i = 0; i < n; i++) {
        for ( let j = 0; i + j < s.length; j+=c) {
            ans += s[i + j];
            if (i != 0 && (i != n - 1) && (j + c - i < s.length))
                ans += s[j + c - i];
        }
    }
    return ans;
};



//NO.456 132-Pattern
                                                    // 思路：定位每一个上升区间，然后搜寻区间后是否存在k值满足条件
                                                    // 定位区间O(n),寻k值O(n)，所以 O(n^2)

/**
 * @param {number[]} nums
 * @return {boolean}
 */
var find132pattern = function(nums) {
    let i=0; j=1; k=2; flag=0;ß
    for(let t=0; t<nums.length; t++) {
        if(nums[t]<nums[t+1]) {
            flag=1;
            if(nums[i]>nums[t]) i=t;
        }
        if(flag==1 && nums[t]>nums[t+1]) {
            j=t;
            for(k=j+1;k<nums.length;k++) {
                if(i<j && j<k && nums[i]<nums[k] && nums[k]<nums[j]) return true;
            }
        }
        if(nums[t]>nums[t+1]) {
            flag=0;
        }
    }
    return false;
};
























