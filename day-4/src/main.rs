use std::fs;

use std::collections::VecDeque;
use std::iter::FromIterator;
use std::collections::HashMap;


trait IParser {
    fn parse(line: &str) -> Self;
}

struct TimeStamp {
    year: i32,
    month: i32, 
    day: i32,
    hour: i32,
    minute: i32, 
    id: i32,
    sleep: bool,
    line: String,
}

impl TimeStamp {
    fn value(&self) -> f64 {
        let time = ( ( self.hour * 100) + self.minute   ) as f64 /10000.0; 

        let ret = ( (self.year * 10000) + (self.month * 100) + self.day ) as f64; 
        ret + time 
    } 
}

impl IParser for TimeStamp {
    fn parse(line: &str) -> TimeStamp {

        let bracket_removed = line.replace("[", "")
            .replace("]", "");

        let tokens =  bracket_removed.split(" ")
            .collect::<Vec<&str>>();

        let yy_mm_dd = tokens[0].split("-")
            .collect::<Vec<&str>>();

        let hh_mm = tokens[1].split(":")
            .collect::<Vec<&str>>();

        let mut id = 0; 
        let mut sleep = false; 

        if tokens[2] == "Guard" {
            id = tokens[3].replace("#", "").parse::<i32>().unwrap();
        }

        if tokens[2] == "falls" {
            sleep = true;
        }

        let ts = TimeStamp {
            year: yy_mm_dd [0].parse::<i32>().unwrap(),
            month: yy_mm_dd[1].parse::<i32>().unwrap(),
            day: yy_mm_dd[2].parse::<i32>().unwrap(),
            hour: hh_mm[0].parse::<i32>().unwrap(), 
            minute: hh_mm[1].parse::<i32>().unwrap(), 
            id: id,
            sleep: sleep,
            line: line.to_string(),
        };

        ts
    }
}

fn read_list<Parser>(file_name: &str) -> Vec<Parser> 
where Parser: IParser {
    let list = fs::read_to_string(file_name)
        .expect("file not found");

    list.lines()
        .map(|line| Parser::parse(line) )
        .collect::<Vec<Parser>>()
}

#[derive(Copy, Clone)]
struct Sleep {
    total: i32,
    end: i32,
    start: i32,
}

fn max(sleeps: &HashMap<i32, Vec<Sleep>>) -> i32 {
    let mut acc_sleeps: HashMap<i32, i32> = HashMap::new();

    for (key, vec_sleep) in sleeps {
        let total = vec_sleep.iter().fold(0, |acc, sleep_object| acc + sleep_object.total);
        let cache = acc_sleeps.entry(*key).or_insert(0);  
        *cache += total;
    }

    let (key, _value) = acc_sleeps.iter().max_by(|(_k1,v1), (_k2,v2)| v1.cmp(v2) ).unwrap();

    *key
} 

fn debug(key: i32, arr: &[i32; 60]) {
    print!("key: {} => ", key);
    arr.iter().enumerate().for_each(|(i, n)| print!(" {}=_{}_",i, n));

    println!("\n__");
}

fn best_hours_to_infiltrate(sleeps: &Vec<Sleep>) -> (i32, i32) {
    let mut hours: [i32; 60] = [0; 60];

    for sleep in sleeps {
       // println!("start {}, end {}", sleep.start, sleep.end);
        for i in sleep.start..sleep.end+1 {
            let index = i as usize;
            hours[index] += 1; 
        }
    }

//    debug(1, &hours);

    let (hh, value)  = hours
        .iter()
        .enumerate()
        .max_by(| (_i1,v1), (_i2,v2) | {
            v1.cmp(v2)
        }).unwrap(); 

    (hh as i32, *value)
}

struct Freq {
    key: i32,
    freq: i32, 
    hour: i32
}

fn extract_hours(n: f64) -> i32{
    (n * 10000_f64).round() as i32
}

fn main() {
    let mut tss = read_list::<TimeStamp>("./input.txt");

    tss.sort_by(|a,b| a.value().partial_cmp(&b.value()).unwrap());

    let mut queue = VecDeque::from_iter(&tss);
    let mut sleeps: HashMap<i32, Vec<Sleep>> = HashMap::new();
    let mut sleep_tracker = Vec::new();
    let mut wakeup = 0_f64;

    while let Some(ts) = queue.pop_back() {

        if ts.id != 0 {
            let tracker = sleeps.entry(ts.id)
                  .or_insert(sleep_tracker.as_slice().to_vec());  

            tracker.extend_from_slice(&sleep_tracker); 
            
            sleep_tracker.clear();
            wakeup = 0_f64;
            continue;
        }

        if ts.sleep {
            let sleep_total = wakeup - ts.value(); 
            let total = extract_hours(sleep_total);
            let end = extract_hours(wakeup - wakeup.round()) - 1;
            let start = extract_hours(ts.value() - ts.value().round());

            sleep_tracker.push(Sleep { total, start, end });
        } else {
            wakeup = ts.value();
        }
    }
    let max_sleep_key = max(&sleeps);

    let hours_interval = sleeps.get_mut(&max_sleep_key).unwrap(); 

    let (besthh,_value) = best_hours_to_infiltrate(hours_interval);

    println!("answer !! {}", max_sleep_key * besthh);
    assert_eq!(max_sleep_key * besthh, 39698);

    let freq = sleeps
        .iter()
        .map(|(key, freq)| { 
            let (besthh, value) = best_hours_to_infiltrate(freq);
            Freq { key:*key, hour: besthh, freq:value  }
        })
    .max_by(|value1, value2| value1.freq.cmp(&value2.freq)).unwrap();

    assert_eq!(freq.key * freq.hour, 14920);
    println!("answer puzzle 2!! id {}#  hour:{} => {}", freq.key, freq.hour, freq.key * freq.hour);

}
