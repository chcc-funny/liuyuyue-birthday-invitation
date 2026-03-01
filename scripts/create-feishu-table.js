/**
 * 飞书多维表格创建脚本
 * 用于创建语悦周岁宴回执表单的多维表格
 */

const APP_ID = 'cli_a90716a41df91bd7';
const APP_SECRET = '0Clk4zaqwHd3K46eT3HL3elGLq3rzGgL';

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

// 步骤2: 创建多维表格应用
async function createBitableApp(token) {
  const response = await fetch('https://open.feishu.cn/open-apis/bitable/v1/apps', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: '语悦周岁宴回执表',
      folder_token: '' // 留空表示创建在根目录
    })
  });

  const data = await response.json();

  if (data.code !== 0) {
    throw new Error(`创建多维表格应用失败: ${data.msg}`);
  }

  console.log('✅ 成功创建多维表格应用');
  console.log('📋 App Token:', data.data.app.app_token);
  console.log('🔗 访问链接:', data.data.app.url);

  return data.data.app;
}

// 步骤3: 创建数据表
async function createTable(token, appToken) {
  const response = await fetch(`https://open.feishu.cn/open-apis/bitable/v1/apps/${appToken}/tables`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      table: {
        name: '来宾回执',
        default_view_name: '所有来宾',
        fields: [
          {
            field_name: '称呼',
            type: 1, // 文本类型
            property: {
              formatter: 'text'
            }
          },
          {
            field_name: '人数',
            type: 2, // 数字类型
            property: {
              formatter: '0'
            }
          },
          {
            field_name: '提交时间',
            type: 5, // 日期时间类型
            property: {
              formatter: 'yyyy-MM-dd HH:mm:ss',
              auto_fill: true
            }
          },
          {
            field_name: '设备信息',
            type: 1, // 文本类型
            property: {
              formatter: 'text'
            }
          },
          {
            field_name: 'IP地址',
            type: 1, // 文本类型
            property: {
              formatter: 'text'
            }
          }
        ]
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

// 主函数
async function main() {
  try {
    console.log('🚀 开始创建飞书多维表格...\n');

    // 1. 获取token
    const token = await getTenantAccessToken();

    // 2. 创建多维表格应用
    const app = await createBitableApp(token);

    // 3. 创建数据表
    const table = await createTable(token, app.app_token);

    console.log('\n🎉 多维表格创建成功！\n');
    console.log('=' .repeat(60));
    console.log('请将以下信息保存到 .env 文件：');
    console.log('=' .repeat(60));
    console.log(`FEISHU_APP_ID=${APP_ID}`);
    console.log(`FEISHU_APP_SECRET=${APP_SECRET}`);
    console.log(`FEISHU_APP_TOKEN=${app.app_token}`);
    console.log(`FEISHU_TABLE_ID=${table.table_id}`);
    console.log('=' .repeat(60));
    console.log('\n📱 在线访问链接：');
    console.log(app.url);
    console.log('\n');

  } catch (error) {
    console.error('❌ 错误:', error.message);
    process.exit(1);
  }
}

// 执行
main();
