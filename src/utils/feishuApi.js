/**
 * 飞书 API 工具函数
 * 处理与飞书多维表格的交互
 */

// 飞书 API 配置
const FEISHU_CONFIG = {
  appId: import.meta.env.VITE_FEISHU_APP_ID || 'cli_a90716a41df91bd7',
  appSecret: import.meta.env.VITE_FEISHU_APP_SECRET || '0Clk4zaqwHd3K46eT3HL3elGLq3rzGgL',
  appToken: import.meta.env.VITE_FEISHU_APP_TOKEN || 'KhV9bKFsHadmsysLgDccWs6enxh',
  tableId: import.meta.env.VITE_FEISHU_TABLE_ID || 'tblmIWN7ZXmVymZV'
}

// API 端点
const FEISHU_API_BASE = 'https://open.feishu.cn/open-apis'

/**
 * 获取飞书 tenant_access_token
 * @returns {Promise<string>} access token
 */
async function getTenantAccessToken() {
  try {
    const response = await fetch(`${FEISHU_API_BASE}/auth/v3/tenant_access_token/internal`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        app_id: FEISHU_CONFIG.appId,
        app_secret: FEISHU_CONFIG.appSecret
      })
    })

    const data = await response.json()

    if (data.code !== 0) {
      throw new Error(`获取 token 失败: ${data.msg}`)
    }

    return data.tenant_access_token
  } catch (error) {
    console.error('获取飞书 token 失败:', error)
    throw error
  }
}

/**
 * 提交回执数据到飞书多维表格
 * @param {Object} formData - 表单数据
 * @param {string} formData.name - 称呼
 * @param {number} formData.count - 人数
 * @returns {Promise<Object>} 提交结果
 */
export async function submitRSVP(formData) {
  try {
    // 获取 access token
    const token = await getTenantAccessToken()

    // 准备提交的数据
    const submitData = {
      fields: {
        '称呼': formData.name,
        '人数': formData.count,
        '提交时间': new Date().toISOString(),
        '设备信息': navigator.userAgent
      }
    }

    // 提交数据到飞书多维表格
    const response = await fetch(
      `${FEISHU_API_BASE}/bitable/v1/apps/${FEISHU_CONFIG.appToken}/tables/${FEISHU_CONFIG.tableId}/records`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(submitData)
      }
    )

    const result = await response.json()

    if (result.code !== 0) {
      throw new Error(`提交失败: ${result.msg}`)
    }

    console.log('回执提交成功:', result)
    return {
      success: true,
      data: result.data
    }

  } catch (error) {
    console.error('提交回执失败:', error)
    return {
      success: false,
      error: error.message
    }
  }
}

/**
 * 获取所有回执记录（用于调试）
 * @returns {Promise<Array>} 回执记录列表
 */
export async function getRSVPRecords() {
  try {
    const token = await getTenantAccessToken()

    const response = await fetch(
      `${FEISHU_API_BASE}/bitable/v1/apps/${FEISHU_CONFIG.appToken}/tables/${FEISHU_CONFIG.tableId}/records`,
      {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    )

    const result = await response.json()

    if (result.code !== 0) {
      throw new Error(`获取记录失败: ${result.msg}`)
    }

    return result.data.items || []

  } catch (error) {
    console.error('获取回执记录失败:', error)
    throw error
  }
}
