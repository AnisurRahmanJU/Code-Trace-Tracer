import {
 addExercise, Code, Frame, Arr, Obj, Terminal
} from 'https://horstmann.com/codecheck/script/codecheck_tracer.js'


/* =========================
1. Swap Variables
========================= */
addExercise(function*(sim){

const code = sim.add(0,0,new Code(`
int a = 5;
int b = 8;
int temp = a;
a = b;
b = temp;
`))

const vars = sim.add(4,0,new Frame())
vars.a=5
vars.b=8
vars.temp=""

yield sim.start()

code.go(3)
yield sim.set(vars.temp,vars.a)

code.go()
yield sim.set(vars.a,vars.b)

code.go()
yield sim.set(vars.b,vars.temp)

})


/* =========================
2. Reverse String (Loop)
========================= */
addExercise(function*(sim){

const code = sim.add(0,0,new Code(`
String s="hello";
String result="";
for(int i=0;i<s.length;i++){
  result = s[i] + result;
}
`))

const vars = sim.add(5,0,new Frame())
vars.s="hello"
vars.result=""
vars.i=""

yield sim.start()

for(vars.i=0;vars.i<vars.s.length;vars.i++){
    yield sim.pause()
    let ch=vars.s[vars.i]
    vars.result = yield sim.ask(ch+vars.result)
}

})


/* =========================
3. Array Insert
========================= */
addExercise(function*(sim){

const code = sim.add(0,0,new Code(`
pos=2;
newVal=99;
size++;
for(i=size-1;i>pos;i--){
  a[i]=a[i-1];
}
a[pos]=newVal;
`))

const vars = sim.add(6,0,new Frame())
vars.a=new Arr()
vars.a.length=6

vars.a[0]=10
vars.a[1]=20
vars.a[2]=30
vars.a[3]=40

vars.size=4
vars.pos=2
vars.newVal=99
vars.i=""

yield sim.start()

vars.size++

for(vars.i=vars.size-1;vars.i>vars.pos;vars.i--){
    yield sim.set(vars.a[vars.i],vars.a[vars.i-1])
}

yield sim.set(vars.a[vars.pos],vars.newVal)

})


/* =========================
4. Linked List Pointer
========================= */
addExercise(function*(sim){

const node1 = sim.add(1,6,new Obj('Node'))
const node2 = sim.add(4,6,new Obj('Node'))

node1.data="A"
node2.data="B"

node1.next=node2
node2.next="null"

const list = sim.add(0,4,new Obj('List'))
list.first=node1

const vars = sim.add(0,10,new Frame())
vars.result=""

yield sim.start()

yield sim.set(vars.result,"A")

yield sim.set(list.first,node2)

})


/* =========================
5. Largest Number (Buttons)
========================= */
addExercise(function*(sim){

const vars = sim.add(0,0,new Frame())
vars.a = new Arr()
vars.a[0]=3
vars.a[1]=9
vars.a[2]=5
vars.a[3]=12

vars.i=""
vars.largest=""

sim.addButtons("update largest","i++")

yield sim.start()

yield sim.click("update largest")
vars.largest=vars.a[0]
vars.i=1

while(vars.i < 4){

if(vars.a[vars.i] > vars.largest){
    yield sim.click("update largest")
    vars.largest = vars.a[vars.i]
}

yield sim.click("i++")
vars.i++

}

})


/* =========================
6. Terminal Example
========================= */
addExercise(function*(sim){

const term = sim.add(0,0,new Terminal())

term.println("Enter your age:")

let age = parseInt(yield term.ask())

term.println("Next year age:")

yield term.ask(age+1)

})


/* =========================
7. Random Problem
========================= */
addExercise(function*(sim,state){

if(state===undefined){
    state={ num: sim.randInt(100,999) }
}

const vars = sim.add(0,0,new Frame())
vars.num = state.num
vars.sum = 0

yield sim.start(state)

while(vars.num > 0){

let digit = vars.num % 10

vars.sum = yield sim.ask(vars.sum + digit)

vars.num = Math.floor(vars.num/10)

}

})
