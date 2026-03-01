/**
 * 飞书API测试脚本
 * 测试向多维表格插入数据是否正常
 */

const APP_ID = 'cli_a90716a41df91bd7';
const APP_SECRET = '0Clk4zaqwHd3K46eT3HL3elGLq3rzGgL';
const APP_TOKEN = 'KhV9bKFsHadmsysLgDccWs6enxh';
const TABLE_ID = 'tblmIWN7ZXmVymZV';

// 获取 tenant_access_token
async function getTenantAccessToken() {
  const response = await fetch('https://open.feishu.cn/open-apis/auth/v3/tenant_access_token/internal', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      app_id: APP_ID,
      app_secret: APP_SECRET
    })
  });

  const data = await response.json();

  if (data.code !== 0) {
    throw new Error(`获取token失败: ${data.msg}`);
  }

  return data.tenant_access_token;
}

// 获取表格的所有字段
async function getTableFields(token) {
  const response = await fetch(
    `https://open.feishu.cn/open-apis/bitable/v1/apps/${APP_TOKEN}/tables/${TABLE_ID}/fields`,
    {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }
  );

  const data = await response.json();

  if (data.code !== 0) {
    throw new Error(`获取字段失败: ${data.msg}`);
  }

  return data.data.items;
}

// 插入一条测试记录
async function insertTestRecord(token, fields) {
  // 根据实际字段构建记录
  const record = {
    fields: {}
  };

  // 找到对应的字段ID
  fields.forEach(field => {
    if (field.field_name === '称呼' || field.field_name.includes('文本') || field.field_name.includes('Text')) {
      record.fields[field.field_name] = '测试用户';
    }
  });

  // 如果没有找到字段,使用第一个文本字段
  if (Object.keys(record.fields).length === 0 && fields.length > 0) {
    record.fields[fields[0].field_name] = '测试数据 - ' + new Date().toLocaleString('zh-CN');
  }

  const response = await fetch(
    `https://open.feishu.cn/open-apis/bitable/v1/apps/${APP_TOKEN}/tables/${TABLE_ID}/records`,
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(record)
    }
  );

  const data = await response.json();

  if (data.code !== 0) {
    throw new Error(`插入记录失败: ${data.msg}`);
  }

  return data.data.record;
}

// 读取表格中的所有记录
async function getRecords(token) {
  const response = await fetch(
    `https://open.feishu.cn/open-apis/bitable/v1/apps/${APP_TOKEN}/tables/${TABLE_ID}/records?page_size=10`,
    {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }
  );

  const data = await response.json();

  if (data.code !== 0) {
    throw new Error(`读取记录失败: ${data.msg}`);
  }

  return data.data.items;
}

// 主函数
async function main() {
  try {
    console.log('🧪 开始测试飞书API...\n');

    // 1. 获取token
    console.log('1️⃣  获取 tenant_access_token...');
    const token = await getTenantAccessToken();
    console.log('✅ Token获取成功\n');

    // 2. 获取表格字段
    console.log('2️⃣  获取表格字段...');
    const fields = await getTableFields(token);
    console.log('✅ 字段获取成功');
    console.log('📋 当前字段列表:');
    fields.forEach(field => {
      console.log(`   - ${field.field_name} (类型: ${field.type})`);
    });
    console.log('');

    // 3. 插入测试记录
    console.log('3️⃣  插入测试记录...');
    const record = await insertTestRecord(token, fields);
    console.log('✅ 记录插入成功');
    console.log('📝 记录ID:', record.record_id);
    console.log('');

    // 4. 读取记录验证
    console.log('4️⃣  读取表格记录验证...');
    const records = await getRecords(token);
    console.log('✅ 记录读取成功');
    console.log(`📊 当前表格共有 ${records.length} 条记录\n`);

    console.log('=' .repeat(60));
    console.log('🎉 所有测试通过！飞书API工作正常！');
    console.log('=' .repeat(60));
    console.log('\n📱 打开飞书表格查看测试数据：');
    console.log(`https://ezdfwkuez6.feishu.cn/base/${APP_TOKEN}\n`);

  } catch (error) {
    console.error('❌ 测试失败:', error.message);
    console.error('\n💡 请检查:');
    console.error('   1. App ID 和 App Secret 是否正确');
    console.error('   2. App Token 和 Table ID 是否正确');
    console.error('   3. 网络连接是否正常');
    console.error('   4. 表格是否已在飞书后台手动添加字段\n');
    process.exit(1);
  }
}

// 执行
main();
