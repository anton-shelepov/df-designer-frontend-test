function swapElementsInArray(source: any[], elIndex1: number, elIndex2: number): [] {
    const sourceCopy = Array.from(source);
    const temp = sourceCopy[elIndex1];
    sourceCopy[elIndex1] = sourceCopy[elIndex2];
    sourceCopy[elIndex2] = temp;
    return sourceCopy as [];
}

export default swapElementsInArray;
