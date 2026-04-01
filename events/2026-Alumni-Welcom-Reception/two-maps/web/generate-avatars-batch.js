const { execSync } = require('child_process');
const { readFileSync, mkdirSync } = require('fs');
const { dirname } = require('path');

const tasks = JSON.parse(readFileSync('./prompts/avatar-generation-tasks.json', 'utf8'));

async function generateAvatar(task, index) {
  console.log(`\n[${index + 1}/${tasks.length}] Generating: ${task.profileId} step-${task.stageIndex + 1}`);
  
  const prompt = JSON.stringify(task.prompt);
  const cmd = `qwenimage_modelstudio_wanx26_image_generation prompt="${prompt.replace(/"/g, '\\"')}" size=1024*1024 watermark=false prompt_extend=false`;
  
  try {
    const result = execSync(cmd, { encoding: 'utf8', timeout: 60000 });
    const match = result.match(/https:\/\/[^\s"]+/);
    if (!match) {
      console.log('  ❌ No URL found in response');
      return false;
    }
    
    let url = match[0];
    url = url.replace(/%2F/g, '/').replace(/%3D/g, '=');
    
    mkdirSync(dirname(task.outputPath), { recursive: true });
    execSync(`curl -sL "${url}" -o "${task.outputPath}"`, { timeout: 30000 });
    
    const stats = execSync(`ls -la "${task.outputPath}"`, { encoding: 'utf8' });
    const size = parseInt(stats.split(/\s+/)[4]);
    
    if (size < 1000) {
      console.log(`  ⚠️  File too small (${size} bytes), may be error`);
      return false;
    }
    
    console.log(`  ✅ Downloaded (${Math.round(size/1024)} KB)`);
    return true;
  } catch (err) {
    console.log(`  ❌ Error: ${err.message}`);
    return false;
  }
}

async function main() {
  console.log(`Starting avatar generation for ${tasks.length} images...`);
  
  for (let i = 0; i < tasks.length; i++) {
    await generateAvatar(tasks[i], i);
    await new Promise(r => setTimeout(r, 500));
  }
  
  console.log('\n✨ Done!');
}

main();
