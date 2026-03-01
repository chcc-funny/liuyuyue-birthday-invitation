/**
 * 在已有的多维表格应用中创建数据表
 */

const APP_ID = 'cli_a90716a41df91bd7';
const APP_SECRET = '0Clk4zaqwHd3K46eT3HL3elGLq3rzGgL';
const APP_TOKEN = 'KhV9bKFsHadmsysLgDccWs6enxh'; // 已创建的应用token

// 步骤1: 获取 tenant_access_token
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

  console.log('✅ 成功获取 tenant_access_token');
  return data.tenant_access_token;
}

// 步骤2: 创建数据表（简化版，只包含基本字段）
async function createTable(token, appToken) {
  const response = await fetch(`https://open.feishu.cn/open-apis/bitable/v1/apps/${appToken}/tables`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      table: {
        name: '来宾回执'
      }
    })
  });

  const data = await response.json();

  if (data.code !== 0) {
    throw new Error(`创建数据表失败: ${data.msg}`);
  }

  console.log('✅ 成功创建数据表');
  console.log('📋 Table ID:', data.data.table_id);

  return data.data;
}

// 步骤3: 添加字段
async function addFields(token, appToken, tableId) {
  const fields = [
    {
      field_name: '称呼',
      type: 1 // 文本类型
    },
    {
      field_name: '人数',
      type: 2 // 数字类型
    },
    {
      field_name: '提交时间',
      type: 5 // 日期类型
    },
    {
      field_name: '设备信息',
      type: 1 // 文本类型
    }
  ];

  console.log('\n正在添加字段...');

  for (const field of fields) {
    const response = await fetch(
      `https://open.feishu.cn/open-apis/bitable/v1/apps/${appToken}/tables/${tableId}/fields`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ field })
      }
    );

    const data = await response.json();

    if (data.code !== 0) {
      console.error(`⚠️  添加字段 "${field.field_name}" 失败: ${data.msg}`);
    } else {
      console.log(`✅ 成功添加字段: ${field.field_name}`);
    }
  }
}

// 主函数
async function main() {
  try {
    console.log('🚀 开始创建数据表...\n');

    // 1. 获取token
    const token = await getTenantAccessToken();

    // 2. 创建数据表
    const table = await createTable(token, APP_TOKEN);

    // 3. 添加字段
    await addFields(token, APP_TOKEN, table.table_id);

    console.log('\n🎉 数据表创建成功！\n');
    console.log('=' .repeat(60));
    console.log('请将以下信息保存到 .env 文件：');
    console.log('=' .repeat(60));
    console.log(`FEISHU_APP_ID=${APP_ID}`);
    console.log(`FEISHU_APP_SECRET=${APP_SECRET}`);
    console.log(`FEISHU_APP_TOKEN=${APP_TOKEN}`);
    console.log(`FEISHU_TABLE_ID=${table.table_id}`);
    console.log('=' .repeat(60));
    console.log('\n📱 在线访问链接：');
    console.log(`https://ezdfwkuez6.feishu.cn/base/${APP_TOKEN}`);
    console.log('\n');

  } catch (error) {
    console.error('❌ 错误:', error.message);
    process.exit(1);
  }
}

// 执行
main();
