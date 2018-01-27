function fibo(n){
    if (n == 1 || n == 0){
        return 1;
    }
    else{
        return fibo(n-1) + fibo(n-2);
    }

    for(let i=0; i <1000; i++){
        console.log(fibo(i));
    }

