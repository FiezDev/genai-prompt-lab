#!/bin/bash
# gen_assignment_images.sh — 2 Higgsfield images for the prompt assignment (zero-shot + few-shot)
set -uo pipefail
mkdir -p ~/assignment-assets && cd ~/assignment-assets
HF=higgsfield

getjson() { printf '%s' "$1" | node -e 'let d="";process.stdin.on("data",c=>d+=c).on("end",()=>{try{console.log(eval("j="+d),(""))}catch{}})' ; }

jget() { # json key
  printf '%s' "$1" | node -e "let d='';process.stdin.on('data',c=>d+=c).on('end',()=>{try{const j=JSON.parse(d);console.log(j[process.argv[1]]??'')}catch{console.log('')}})" "$2"
}

create_job() { # name prompt res -> echoes jobid
  local out job
  out=$($HF generate create nano_banana_pro --prompt "$2" --aspect_ratio 16:9 --resolution "$3" --json 2>&1)
  job=$(printf '%s' "$out" | node -e 'let d="";process.stdin.on("data",c=>d+=c).on("end",()=>{try{console.log(JSON.parse(d)[0]||"")}catch{console.log("")}})')
  echo "$job"
}

poll_job() { # name jobid
  local name=$1 job=$2 st url ext
  for i in $(seq 1 60); do
    j=$($HF generate get "$job" --json 2>/dev/null || echo '{}')
    st=$(jget "$j" status)
    url=$(jget "$j" result_url)
    if [ "$st" = "completed" ] && [ -n "$url" ]; then
      ext="${url##*.}"; ext="${ext%%\?*}"
      curl -sL "$url" -o "$name.$ext"
      echo "$name DONE -> $name.$ext ($(du -h "$name.$ext" | cut -f1))"
      return 0
    fi
    if [ "$st" = "failed" ]; then echo "$name FAILED"; return 1; fi
    sleep 10
  done
  echo "$name TIMEOUT after 10min"; return 1
}

P1='นักเรียนกำลังเรียนหนังสือด้วย AI'
P2='Cinematic photorealistic scene of a Thai high school student studying at a wooden desk in a dark bedroom at night, warm amber desk lamp glow on the left side, a translucent glowing holographic AI assistant interface floating above the laptop showing charts and knowledge particles, deep indigo blue shadows, subtle film grain, wide 16:9 composition with generous negative space on the right side, no text, no watermark'

echo "=== creating jobs ==="
J1=$(create_job zeroshot "$P1" 1k)
J2=$(create_job fewshot "$P2" 2k)
echo "zeroshot job: $J1"
echo "fewshot  job: $J2"
[ -z "$J1" ] && exit 1
[ -z "$J2" ] && exit 1

poll_job zeroshot "$J1" &
poll_job fewshot "$J2" &
wait
echo "=== files ==="
ls -la ~/assignment-assets/
